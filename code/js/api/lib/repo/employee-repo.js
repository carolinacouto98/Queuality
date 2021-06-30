'use strict'

const db = require('./queuality-db.js').methods
const Error = require('../common/error.js')
const { Employee, EmployeeInputModel, EmployeeUpdateInputModel } = require('../common/model.js')  // eslint-disable-line no-unused-vars

const collection = 'employee'

/**
 * Gets all the Employees in the database.
 * @returns {Promise<Array<Employee>>}
 */
const getEmployees = () => db.getAll(collection)

/**
 * Gets an Employee given its id.
 * @param {String} id Employee id
 * @returns {Promise<Employee>}
 */
const getEmployee = (id) => db.get(collection, id)
    .then(employee => {
        if(!employee) throw Error.CustomException('The given employee does not exist', Error.NOT_FOUND)
        return employee
    })

/**
 * Inserts an employee into the database.
 * @param {EmployeeInputModel} employee Employee to be inserted
 * @returns {Promise<Employee>}
 */
const insertEmployee = (employee) => 
    db.insert(collection, employee)

/**
 * Updates an existing employee in the database.
 * @param {EmployeeUpdateInputModel} employee New employee to replace the one with the same id 
 * @returns {Promise<Employee>}
 */
const updateEmployee = (employee) => getEmployee(employee._id)
    .then(() => db.update(collection, employee._id, employee))

/**
 * Deletes an employee from the database given its id.
 * @param {String} id Employee id
 * @returns {Promise<Employee>}
 */
const deleteEmployee = (id) => getEmployee(id)
    .then(() => db.del(collection, id))

module.exports = {
    getEmployees, 
    getEmployee, 
    insertEmployee, 
    updateEmployee, 
    deleteEmployee
}
