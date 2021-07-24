'use strict'

const { Entity } = require('../common/siren.js')
const authSiren = require('./siren/auth-siren.js')
const service = require('../services/employee-services.js')
const Router = require('express').Router
const router = Router()

module.exports = router

const issuers = process.env.ISSUERS.split(';').map(issuer => issuer.toLowerCase())

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

issuers.forEach(issuer =>
    router.get(`/${issuer.toLowerCase()}/login`, (req, res, next) => {
        const nextURL = req.query.nextURL
        res.oidc.login({
            returnTo: nextURL ? nextURL : '/queuality/api' 
        })
    })
)

issuers.forEach(issuer =>
    router.get(`/${issuer.toLowerCase()}/signup`, async (req, res, next) => {
        const employees = (await service.getEmployees())
            .filter(employee => employee.roles.includes('Manage Employees'))

            
        const nextURL = req.query.nextURL
        res.oidc.login({
            returnTo: nextURL ? nextURL : '/queuality/api' 
        })
    })
)

