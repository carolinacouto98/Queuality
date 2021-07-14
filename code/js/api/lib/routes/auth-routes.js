'use strict'

const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/login', (req, res, next) => {
    res.json({ message: 'hello' })
})