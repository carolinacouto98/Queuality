'use strict'

const repo = require('../repo/employee-repo.js')
const error = require('../common/error.js')
// eslint-disable-next-line no-unused-vars
const model = require('../common/model.js')

/**
 * @returns {Promise<Array<model.Employee>>}
 */
const getEmployees = () => repo.getEmployees()

/**
 * 
 * @param {String} employeeId 
 * @returns 
 */
const getEmployee = (employeeId) => repo.getEmployee(employeeId)
/**
 * 
 * @param {model.EmployeeInputModel} employee 
 * @returns {Promise<Object>}
 */
const addEmployee = (employee) => 
    getEmployees()
        .then(employees => {
            if(employees.find(employeeInfo => employeeInfo._id === employee._id))
                throw error.CustomException('That employee already exists', error.ALREADY_EXISTS)
            return repo.insertEmployee(employee)
        })

/**
 * 
 * @param {model.EmployeeUpdateInputModel} employee
 * @returns {Promise<Object>}
 */

const updateEmployee = (employee) => 
    getEmployee(employee._id)
        .then(employeeInfo => {
            if(!employee.name) employee.name = employeeInfo.name
            if(!employee.sections) employee.sections = employeeInfo.sections
            if(!employee.roles) employee.roles = employeeInfo.roles
            if(!employee.desk) employee.desk = employeeInfo.desk
            if(!employee.picture) employee.desk = employeeInfo.picture
            return repo.updateEmployee(employee) 
        })

/**
 * 
 * @param {String} id 
 * @returns {Promise<Void>}
 */
const removeEmployee = (id) => 
    repo.deleteEmployee(id)

module.exports = {
    getEmployees,
    getEmployee,
    updateEmployee,
    addEmployee,
    removeEmployee
}