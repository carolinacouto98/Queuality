'use strict'

const error = require('../common/error.js')
const { Entity } = require('../common/siren.js')
const authSiren = require('./siren/auth-siren.js')
const service = require('../services/employee-services.js')
const passport = require('passport')
const nodemailer = require('nodemailer')
const { Issuer, generators, Strategy } = require('openid-client')
const Router = require('express').Router
const router = Router()

module.exports = router

const issuers = process.env.ISSUERS.split(';').map(issuer => issuer.toLowerCase())

const strategies = {}

const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secureConnection: false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        ciphers:'SSLv3'
    }
})

async function createStrategy(issuer, signup) {
    if (strategies[issuer]) strategies[issuer]
    const nonce = generators.nonce();
    const iss = await Issuer.discover(process.env[`${issuer}_ISSUER_BASE_URL`]) // eslint-disable-line no-undef
    const client = new iss.Client({ 
        client_id: process.env[`${issuer}_CLIENT_ID`],                          // eslint-disable-line no-undef
        client_secret: process.env[`${issuer}_CLIENT_SECRET`],                  // eslint-disable-line no-undef
        redirect_uris: [process.env[`${issuer}_CALLBACK`]],
        response_types: ['code'],
    })
    const strategy = new Strategy({
        client,
        params: {
            scope: 'openid email profile',
            response_mode: 'form_post',
            nonce,
        }
    }, async (tokenset, userinfo, done) => {
        const employees = await service.getEmployees()
        const claims = tokenset.claims()
        const employee = employees.find(employee => employee._id === userinfo.email)
        if (!employee && signup) {
            const managers = employees.filter(employee => employee.roles.includes('Manage Employees'))
            managers.forEach(async employee =>
                await transporter.sendMail({
                    from: `No Reply <${process.env.SMTP_EMAIL}>`,
                    to: `${employee._id}`,
                    html:`<>
                        <h1>Insert a new employee</h1>
                        <div>
                            <p>The employee with the email ${userinfo.email} is trying to signing to Queuality 
                                to accept it press the button below, to deny it ignore this email</p>
                            <form method="POST" action="http://localhost:5000/queuality/api/employees">
                                <input type="hidden" name="_id" value="${userinfo.email}">
                                <input type="hidden" name="name" value="${claims.name}">
                                <input type="hidden" name="picture" value="${userinfo.picture}">
                                <input type="submit" value="Accept" />
                            </form>
                        </div>
                        </>
                    `
                })
            )
            return done()
        }
        else {
            if (employee.name !== claims.name || employee.picture !== claims.picture) {
                employee.name = claims.name
                employee.picture = claims.picture
                await service.updateEmployee(employee)
            }
            return done(null, claims)
        }
    })
    strategies[issuer] = strategy
    return strategy
}

router.get('/login', (req, res, next) => {
    res.send(
        new Entity(
            'Login',
            ['Login'],
            authSiren.loginLinks(issuers)
        )
    )
})

router.get('/signup', (req, res, next) => {
    res.send(
        new Entity(
            'Sign Up',
            ['Sign Up'],
            authSiren.signUpLinks(issuers)
        )
    )
})

router.post('/logout', (req, res, next) => {
    req.logOut()
    req.session.destroy(res.end)
})

issuers.forEach(issuer => {
    let nextURL
    router.get(`/${issuer.toLowerCase()}/login`, async (req, res, next) => {
        try {
            const ok = await transporter.verify()
            if (!ok) throw new Error()
        } catch(err) {
            return next(error.CustomException('Error with transporter email, please try again later', error.SERVER_ERROR))
        }
        
        const strategy = await createStrategy(issuer.toUpperCase())
        nextURL = req.query.nextURL
        passport.authenticate(strategy, {
            successRedirect: nextURL ? nextURL : '/queuality/api',
            failureRedirect: `/${issuer.toLowerCase()}/signup`
        }) (req, res, next)
    })

    router.get(`/${issuer.toLowerCase()}/signup`, async (req, res, next) => {
        try {
            const ok = await transporter.verify()
            if (!ok) throw new Error()
        } catch(err) {
            return next(error.CustomException('Error with transporter email, please try again later', error.SERVER_ERROR))
        }
        
        const strategy = await createStrategy(issuer.toUpperCase(), true)
        nextURL = req.query.nextURL
        passport.authenticate(strategy, {
            successRedirect: nextURL ? nextURL : '/queuality/api',
            failureRedirect: `/${issuer.toLowerCase()}/signup`
        }) (req, res, next)
        
    })

    router.post(`/${issuer.toLowerCase()}/callback`, async (req, res, next) => {
        const strategy = await createStrategy(issuer.toUpperCase())
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return next(err)
            if (!user) return next(error.CustomException('No such user', error.SERVER_ERROR))
            req.logIn(user, err => {
                if (err) return next(err)
                req.session.user = user
                res.redirect(nextURL ? nextURL : '/queuality/api')
            })

        }) (req, res, next)
    })
})

