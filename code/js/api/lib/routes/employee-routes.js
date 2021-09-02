'use strict'

const service = require('../services/employee-services.js')
const model = require('../common/model.js')
const { Entity } = require('../common/siren.js')
const employeeSiren = require('./siren/employee-siren.js')
const Router = require('express').Router
const error = require('../common/error.js')
const auth = require('../common/auth.js')
const router = Router()
module.exports = router

router.get('/employees/logged', auth.optional(), (req, res, next) => {
    console.log(req.employee)
    res.send(
        new Entity(
            'Get Employee Logged in',
            ['Employee'],
            undefined,
            req.employee,
            []
    ))
})

router.get('/employees', auth.requested(), (req, res, next) => {
    //if (!req.employee?.roles.includes('Manage Employees'))
    //    next(new error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
    service.getEmployees()
        .then(employees => res.send(
            new Entity(
                'Get Employees',
                ['Employees'],
                employeeSiren.getEmployeesLinks,
                undefined,
                [employeeSiren.addEmployeeAction(),
                employeeSiren.updateEmployeeAction(),
                employeeSiren.deleteEmployeeAction()],
                employeeSiren.setSubEntities(employees)
            )))
        .catch(next)
})

router.post('/employees', auth.requested(), (req, res, next) => {
    //if (!req.employee?.roles.includes('Manage Employees'))
    //    next(new error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
    const name = req.body.name
    const _id = req.body._id
    if(!name || !_id)
        throw error.CustomException('Missing required parameters', error.BAD_REQUEST)
    const roles = req.body.roles
    const sections = req.body.sections
    const desk = req.body.desk
    const picture = req.body.picture
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

router.patch('/employees/:employeeId', auth.requested(), (req, res, next) => {
    //if (!req.employee?.roles.includes('Manage Employees'))
    //    next(new error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
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
    
router.delete('/employees/:employeeId', auth.requested(), (req, res, next) => {
    //if (!req.employee?.roles.includes('Manage Employees'))
    //    next(new error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
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