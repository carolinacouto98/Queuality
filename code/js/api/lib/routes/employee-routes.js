'use strict'

const service = require('../services/employee-services.js')
const model = require('../common/model.js')
const { Entity } = require('../common/siren.js')
const employeeSiren = require('./siren/employee-siren.js')
const Router = require('express').Router
const error = require('../common/error.js')
const router = Router()
module.exports = router

//check
router.get('/employees', (req, res, next) => { 
    service.getEmployees()
        .then(employees => res.send(
            new Entity(
                'Get Employees',
                ['Employees'],
                employeeSiren.getEmployeesLinks,
                employees,
                [employeeSiren.addEmployeeAction()],
                employeeSiren.setSubEntities(employees)
            )))
        .catch(next)
})

router.post('/employees', auth('Manage Employees'), (req, res, next) => {
    const name = req.body.name
    const _id = req.body._id
    if(!name || !_id)
        throw error.CustomException('Missing required parameters', error.BAD_REQUEST)
    model.employeeInputModel.validateAsync({_id, name})
        .then(employee => service.addEmployee(employee)
            .then(employee => res.status(201).send(
                new Entity(
                    'Add an Employee',
                    ['Employee'],
                    employeeSiren.addEmployeeLinks(employee._id), 
                    employee 
                ))))
        .catch(next)
})

router.patch('/employees/:employeeId', (req, res, next) => {
    const _id = req.params.employeeId
    const name = req.body.name
    const roles = req.body.roles
    const sections = req.body.sections
    const desk = req.body.desk
    if(!name && !roles && !sections && !desk)
        throw error.CustomException('Missing Parameters', error.BAD_REQUEST)
    model.employeeUpdateInputModel.validateAsync({_id, name, roles, sections, desk})
        .then(employee =>
            service.updateEmployee(employee)
                .then(employee => res.send(
                    new Entity(
                        'Update an Employee',
                        ['Employee'], 
                        employeeSiren.updateEmployeeLinks(_id),
                        employee
                    )))
                .catch(next)
        )
})
    
router.delete('/employees/:employeeId', (req, res, next) => {
    const id = req.params.employeeId
    service.removeEmployee(id)
        .then(() => res.send(
            new Entity(
                'Delete an Employee',
                ['Employee'], 
                employeeSiren.deleteEmployeeLinks
            )))
        .catch(next)
})