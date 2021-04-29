'use strict'

const db = require('./queuality-db.js').methods
const collection = 'employee'

const getEmployees = () => db.getAll(collection)

const getEmployee = (id) => db.get(collection, id, { projection : { name : 1, roles : 1, password: 1 } })
    .then(result => {
        if(!result) throw Error('The given employee does not exist')
        return result
    })
        
const insertEmployee = (employee) => db.insert(collection, employee)

const updatePassword = (id, password) => db.update(collection, id, {password : password})
    .then(result => {
        if(!result) throw Error('The given employee does not exist')
    })

const updateRole = (id, roles) => db.update(collection, id, {roles : roles})
    .then(result => {
        if(!result) throw Error('The given employee does not exist')
    })

const deleteEmployee = (id) => db.del(collection, id)
    .then(result => {
        if(!result) throw Error('The given employee does not exist')
    })

module.exports = {
    getEmployees, 
    getEmployee, 
    insertEmployee, 
    updatePassword, 
    updateRole, 
    deleteEmployee
}
