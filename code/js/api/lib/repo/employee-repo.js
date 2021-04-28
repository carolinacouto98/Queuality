'use strict'

const db = require('queuality-db.js')(database, 'employee')

const getEmployees = () => db.getAll()

const getEmployee = (id) => db.get('_id', id, { projection: { name: 1 } })
    .then(result => {
        if(!result) throw Error('The given employee does not exist')
        return result
    })
        
const insertEmployee = (employee) => db.insert(employee)

const updatePassword = (id, password) => db.update({_id : id}, {password : password})
    .then(result => {
        if(!result) throw Error('The given employee does not exist')
    })

const updateRole = (id, roles) => db.update({_id : id}, {roles : roles})
    .then(result => {
        if(!result) throw Error('The given employee does not exist')
    })

const deleteEmployee = (id) => db.delete(id)
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
