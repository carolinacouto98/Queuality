'use strict'
const bcrypt = require('bcrypt')

const repo = require('employee-repo.js')

function getEmployee(id) {
    return repo.getEmployee(id)
        .catch(err => {
            if (err.message === 'The given employee does not exist') err.status = 404
            throw err
        })
}
function getEmployees() {
    return repo.getEmployees()
}
function addEmployee(id, name, password, roles) {
    return encryptPassword(password)
        .then(pass => repo.insertEmployee(
            {
                id: id,
                name: name,
                password: pass,
                roles: roles
            }
        ))
}
function removeEmployee(id) {
    return repo.deleteEmployee(id)
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
function changeEmployeePassword(id, oldPassword, newPassword) {
    confirmPassword(id, oldPassword)
        .then(isValid => {
            if(isValid)
                return repo.updatePassword(id, newPassword)
            const err = new Error(`The given password is not valid to the user ${id}`)
            err.status = 401
            throw err
        })
        .catch(err => {
            if (err.message === 'The given employee does not exist') err.status = 404
            throw err
        })
}

function encryptPassword(password) {
    return bcrypt.hash(password,10)
}

function confirmPassword(id, password) {
    getEmployee(id)
        .then(employee => bcrypt.compare(password, employee.password))
}