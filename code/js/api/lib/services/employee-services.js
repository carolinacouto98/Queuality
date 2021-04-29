'use strict'
const bcrypt = require('bcrypt')

const repo = require('../repo/employee-repo.js')


function getEmployees() {
    return repo.getEmployees()
}

function getEmployee(id) {
    return repo.getEmployee(id)
        .catch(err => {
            if (err.message === 'The given employee does not exist') err.status = 404
            throw err
        })
}

function addEmployee(name, password, roles) {
    return encryptPassword(password)
        .then(pass => repo.insertEmployee(
            {
                name: name,
                password: pass,
                roles: roles
            }
        ))
}

function changeEmployeePassword(id, oldPassword, newPassword) {
    return confirmPassword(id, oldPassword)
        .then(isValid => {
            if(isValid)
                return encryptPassword(newPassword)
                    .then(pass => repo.updatePassword(id, pass))
            const err = new Error(`The given password is not valid to the user ${id}`)
            err.status = 401
            throw err
        })
        .catch(err => {
            if (err.message === 'The given employee does not exist') err.status = 404
            throw err
        })
}

function changeEmployeeRoles(id, roles) {
    return repo.updateRole(id, roles)
        .catch(err => {
            if (err.message === 'The given employee does not exist') err.status = 404
            throw err
        })
}

function removeEmployee(id) {
    return repo.deleteEmployee(id)
        .catch(err => {
            if (err.message === 'The given employee does not exist') err.status = 404
            throw err
        })
}

function encryptPassword(password) {
    return bcrypt.hash(password,10)
}

function confirmPassword(id, password) {
    return getEmployee(id)
        .then(employee => bcrypt.compare(password, employee.password))
}

module.exports = {
    getEmployees,
    getEmployee,
    addEmployee,
    changeEmployeePassword,
    changeEmployeeRoles,
    removeEmployee
}