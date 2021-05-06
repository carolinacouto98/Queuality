'use strict'

const service = require('../services/employee-services.js')
const model = require('../common/model.js')

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

router.post('/api/employees', (req, res, next) => {
    const name = req.body.name
    const password = req.body.password
    const roles = req.body.roles
    model.EmployeeInputModel.validateAsync({name, password, roles})
        .then(employee => service.addEmployee(employee)
            .then(res.status(201).json({message : 'User added'})))
        .catch(next)
})

router.patch('/api/employees/:id', (req, res, next) => {
    const id = req.params.id
    const roles = req.body.roles
    const newPassword = req.body.newPassword
    const oldPassword = req.body.oldPassword
    if(newPassword && oldPassword)
        return service.changeEmployeePassword(id, oldPassword, newPassword)
            .then(res.json({message : `Password for user with the Id ${id} updated`}))
            .catch(next)
    service.changeEmployeeRoles(id, roles)
        .then(res.json({message : `Roles for user with the Id ${id} updated`}))
        .catch(next)
})
    
router.delete('/api/employees/:id', (req, res, next) => {
    const id = req.params.id
    model.id.validateAsync(id)
        .then(id => {
            service.removeEmployee(id)
                .then(res.json({ message : `User with the Id ${id} deleted` }))
        })
        .catch(next)
})