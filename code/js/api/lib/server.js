'use strict'

const express = require('express')
const error = require('./common/error.js')
const database = require('./repo/queuality-db.js')

const app = express()


function run(port, url, dbName) {
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

    return app.listen(port, () => {
        console.log(`Server listen on port ${port}`)
        database.connection(url, dbName, (err) => {
            if(err) return console.error(err)
        })
    })
}

function shutdown(server) {
    server.close()
}

module.exports = { run, shutdown }