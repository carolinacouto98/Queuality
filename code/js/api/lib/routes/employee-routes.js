'use strict'

const service = require('../repo/services.js')

const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/api/employees', (req, res, next) => {
    service.getEmployees()
        .then(users => res.json(users))
        .catch(next)
})

router.get('/api/employees/:id', (req, res, next) => {
    const id = req.params.id
    service.getEmployee(id)
        .then(users => res.json(users))
        .catch(next)
})

router.put('/api/employees', (req, res, next) => {
    const name = req.body.name
    const password = req.body.password
    const roles = req.body.roles
    service.addEmployee(name, password, roles)
        .then(res.json({"message" : "User added"}))
        .catch(next)
})

router.put('/api/employees/:id', (req, res, next) => {
    const id = req.params.id
    const roles =req.body.roles
    service.changeEmployeeRoles(id, roles)
        .then(res.json({"message" : `User with the Id ${id} updated`}))
        .catch(next)
})

router.delete('/api/employees/:id', (req, res, next) => {
    const id = req.params.id
    service.removeEmployee(id)
        .then(res.json({"message" : `User with the Id ${id} updated`}))
        .catch(next)
})