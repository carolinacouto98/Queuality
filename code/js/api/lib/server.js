'use strict'

const express = require('express')
const error = require('./common/error.js')
const database = require('./repo/queuality-db.js')
const { auth } = require('express-openid-connect')
require('dotenv').config()

const app = express()
const cors = require('cors')




function run(port, url, dbName) {
    
    const allowedOrigins = [
        'capacitor://localhost',
        'ionic://localhost',
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:8100'
    ]
    

    app.use(
        auth({
            issuerBaseURL: process.env.ISSUER_BASE_URL, // eslint-disable-line no-undef
            baseURL: process.env.BASE_URL,              // eslint-disable-line no-undef
            clientID: process.env.CLIENT_ID,            // eslint-disable-line no-undef
            clientSecret: process.env.CLIENT_SECRET,                 // eslint-disable-line no-undef
            secret: process.env.SECRET,                 // eslint-disable-line no-undef
            // idpLogout: true, // logout from issuer provider too
            authorizationParams: {
                response_type: 'code',
                scope: 'openid',
            }
        })
    )

    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', ['*'])
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
        res.append('Access-Control-Allow-Headers', 'Content-Type')
        next()
    })
    
    const corsOptions = {
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Origin not allowed by CORS'))
            }
        }
    }
    app.use(cors())

    // Enable preflight requests for all routes
    app.options('*', cors(corsOptions));

    app.get('/', cors(corsOptions), (req, res, next) => {
        res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
    })

    app.use(express.json())
    app.use(express.urlencoded({extended: false}))

    app.use([
        require('./routes/appointment-routes.js'),
        require('./routes/employee-routes.js'),
        require('./routes/queue-routes.js'),
        require('./routes/ticket-routes.js')
    ])
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