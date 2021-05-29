'use strict'

const service = require('../services/employee-services.js')
const model = require('../common/model.js')
const siren = require('../common/siren.js')
const employeeSiren = require('./siren/employee-siren.js')
const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/api/employees', (req, res, next) => {
    service.getEmployees()
        .then(employees => res.send(
            siren.toSirenObject(
                'Employees',
                JSON.stringify(employees),
                JSON.stringify(employeeSiren.setSubEntities(employees)),
                JSON.stringify(employeeSiren.getEmployeesLinks),
                JSON.stringify([employeeSiren.addEmployeeAction()])
            )
        ))
        .catch(next)
})

router.get('/api/employees/:id', (req, res, next) => {
    const id = req.params.id
    service.getEmployee(id)
        .then(employee => res.send(siren.toSirenObject(
            'Employee',
            JSON.stringify(employee),
            '[]',
            JSON.stringify(employeeSiren.getEmployeeLinks(id)),
            JSON.stringify([employeeSiren.updateEmployeeAction(id), employeeSiren.deleteEmployeeAction()])
        )))
        .catch(next)
})

router.post('/api/employees', (req, res, next) => {
    const name = req.body.name
    const roles = req.body.roles
    model.EmployeeInputModel.validateAsync({name, roles})
        .then(employee => service.addEmployee(employee)
            .then(employee => res.status(201).send(
                siren.toSirenObject(
                    'Employee', 
                    JSON.stringify(employee), 
                    '',
                    JSON.stringify(employeeSiren.addEmployeeLinks(employee._id)),
                    ''
                )
            )))
        .catch(next)
})

router.patch('/api/employees/:id', (req, res, next) => {
    const id = req.params.id
    const roles = req.body.roles
    service.changeEmployeeRoles(id, roles)
        .then(res.send(
            siren.toSirenObject(
                'Employee', 
                '{}', 
                '[]',
                JSON.stringify(employeeSiren.updateEmployeeLinks(id)),
                '[]'
            )
        ))
        .catch(next)
})
    
router.delete('/api/employees/:id', (req, res, next) => {
    const id = req.params.id
    model.id.validateAsync(id)
        .then(id => {
            service.removeEmployee(id)
                .then(res.send(
                    siren.toSirenObject(
                        'Employee', 
                        '{}', 
                        '[]',
                        JSON.stringify(employeeSiren.deleteEmployeeLinks),
                        '[]'
                    )
                ))
        })
        .catch(next)
})