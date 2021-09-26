'use strict'

const express = require('express')
const error = require('./common/error.js')
const database = require('./repo/queuality-db.js')
const { auth } = require('express-openid-connect')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const cors = require('cors')


function run(port, url, dbName) {
    
    const allowedOrigins = [
        'capacitor://localhost',
        'ionic://localhost',
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:5000',
        'http://localhost:8100'
    ]

    const issuersOrigins = process.env.ISSUERS.split(';').map(issuer => process.env[`${issuer}_BASE_URL`])
    
    
     // handles serialization and deserialization of authenticated user
    passport.serializeUser(function(user, done) {
        done(null, user)
    })
    passport.deserializeUser(function(userId, done) {
        database.methods.get('employee', userId)
            .then(employee => {
                done(null, userId)
            })
            .catch(error => done(error))
    })

    
    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', ['*'])
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
        res.append('Access-Control-Allow-Headers', 'Content-Type')
        next()
    })
    
    const corsOptions = {
        origin: (origin, callback) => {
            if (!origin || origin === 'null') callback(null, '*')
            else if (allowedOrigins.includes(origin) || issuersOrigins.includes(origin)) callback(null, origin || true)
            else callback(new Error('Origin not allowed by CORS'))
        },
        credentials: true
    }
    app.use(cors(corsOptions))
    
    // Enable preflight requests for all routes
    app.options('*', cors(corsOptions))
    
    app.get('/', cors(corsOptions), (req, res, next) => {
        res.json({ message: 'This route is CORS-enabled for an allowed origin.' })
    })
    
    app.use(express.json())
    app.use(cookieParser())
    app.use(express.urlencoded({extended: false}))
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    
    app.use('/queuality/api', require('./routes/appointment-routes.js'))
    app.use('/queuality/api', require('./routes/employee-routes.js'))
    app.use('/queuality/api', require('./routes/subject-routes.js'))
    app.use('/queuality/api', require('./routes/section-routes.js'))
    app.use('/queuality/api/auth', require('./routes/auth-routes.js'))

    app.options('*', (req, res, next) => {
        const origin = req.header('Origin')
        if (origin) res.header('Origin', origin)
        next()
    })

    app.use((err, req, res, next) => {
        if (!err.status) err = error.CustomError(err, error.SERVER_ERROR)
        if (err.isJoi) err = error.CustomException(err.details[0].message, error.BAD_REQUEST)
        res.status(err.status)
            .json({
                error: {
                    name: err.name,
                    status: err.status,
                    message: err.message,
                    stack: err.stack
                }
            })
    })

    return database.connection(url, dbName)
        .then(client => {
            const server = app.listen(port, () => { console.log(`Server listen on port ${port}`) })
            return [server, client]
        })
        .catch(console.error)
}

/**
 * 
 * @param {import('http').Server} server 
 */
function shutdown(server, client) {
    server.close((err) => {
        if (err) return console.error(err)
        client.close()
    })
}

module.exports = { run, shutdown }