'use strict'

const express = require('express')
const database = require('./lib/repo/queuality-db.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use([
    require('./lib/routes/appointment-routes.js'),
    require('./lib/routes/employee-routes.js'),
    require('./lib/routes/queue-routes.js'),
    require('./lib/routes/ticket-routes.js')
])
app.use((err, req, res, next) => {
    if (!err.status) err.status = 500
    res.status(err.status)
    res.json({
        error: {
            status: err.status,
            message: err.message,
            stack: err.stack
        }
    })
})

app.listen(3000, () => {
    console.log('Server listen on port 3000')
    database.connection('mongodb://localhost:27017', 'queuality', (err) => {
        if(err) return console.error(err)
    })
})

function shutdown() {
    server.close()
}
