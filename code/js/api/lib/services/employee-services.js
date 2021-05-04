'use strict'
const bcrypt = require('bcrypt')

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
 * @param {String} id 
 * @returns {Promise<model.Employee>}
 */
const getEmployee = (id) => repo.getEmployee(id)

/**
 * 
 * @param {model.EmployeeInputModel} employee 
 * @returns {Promise<Void>}
 */
const addEmployee = (employee) => encryptPassword(employee.password)
    .then(pass => {
        employee.password = pass
        repo.insertEmployee(employee)
    })

const changeEmployeePassword = (id, oldPassword, newPassword) => confirmPassword(id, oldPassword)
    .then(isValid => {
        if(!isValid) throw error.CustomException('Old password is wrong', error.UNAUTHORIZED)
        return encryptPassword(newPassword)
            .then(pass => repo.updatePassword(id, pass))
    })

const changeEmployeeRoles = (id, roles) => repo.updateRole(id, roles)

/**
 * 
 * @param {String} id 
 * @returns {Promise<Void>}
 */
const removeEmployee = (id) => repo.deleteEmployee(id)

const encryptPassword = (password) =>  bcrypt.hash(password,10)

const confirmPassword = (id, password) => getEmployee(id)
    .then(employee => bcrypt.compare(password, employee.password))

module.exports = {
    getEmployees,
    getEmployee,
    addEmployee,
    changeEmployeePassword,
    changeEmployeeRoles,
    removeEmployee
}