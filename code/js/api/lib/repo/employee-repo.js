'use strict'

const ObjectId = require('mongodb').ObjectId

const db = require('./queuality-db.js').methods
const error = require('../common/error.js')

const collection = 'employee'

const getEmployees = () => db.getAll(collection)

const getEmployee = (id) => db.get(collection, ObjectId(id), { projection : { name : 1, roles : 1 } })
    .then(result => {
        if(!result) throw error.CustomException('The given employee does not exist', error.NOT_FOUND)
        return result
    })
        
const insertEmployee = (employee) => db.insert(collection, employee)

const updateRole = (id, roles) => db.update(collection, ObjectId(id), {roles : roles})
    .then(result => {
        if(!result) throw error.CustomException('The given employee does not exist', error.NOT_FOUND)
    })

const deleteEmployee = (id) => db.del(collection, ObjectId(id))
    .then(result => {
        if(!result) throw error.CustomException('The given employee does not exist', error.NOT_FOUND)
    })

module.exports = {
    getEmployees, 
    getEmployee, 
    insertEmployee, 
    updateRole, 
    deleteEmployee
}
