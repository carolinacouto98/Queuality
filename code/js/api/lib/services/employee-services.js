'use strict'

const repo = require('../repo/employee-repo.js')
// eslint-disable-next-line no-unused-vars
const model = require('../common/model.js')

/**
 * @returns {Promise<Array<model.Employee>>}
 */
const getEmployees = () => repo.getEmployees()

/**
 * 
 * @param {String} id 
 * @returns {Promise<model.Employee>}
 */
const getEmployee = (id) => repo.getEmployee(id)

/**
 * 
 * @param {model.EmployeeInputModel} employee 
 * @returns {Promise<Object>}
 */
const addEmployee = (employee) => 
    repo.insertEmployee(employee)
    

const changeEmployeeRoles = (id, roles) => repo.updateRole(id, roles)

/**
 * 
 * @param {String} id 
 * @returns {Promise<Void>}
 */
const removeEmployee = (id) => repo.deleteEmployee(id)

module.exports = {
    getEmployees,
    getEmployee,
    addEmployee,
    changeEmployeeRoles,
    removeEmployee
}