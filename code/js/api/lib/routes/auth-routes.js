'use strict'

const Router = require('express').Router
const router = Router()

router.get('/callback', (req, res, next) => {
    console.log(req.oidc)
    res.redirect('/')
})