'use strict'

const express = require('express')

const app = express()

app.use((err, req, res) => {
    if (!err.status) err.status = 500
    res
        .status(err.status)
        .json({
            error: {
                status: err.status,
                message: err.message,
                stack: err.stack
            }
        })
})

app.listen(3000, () => console.log('Server listen on port 3000'))