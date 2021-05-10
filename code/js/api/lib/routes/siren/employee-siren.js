'use strict'
const siren = require('../../common/siren.js')

const getEmployeesLinks = [siren.selfLink('/api/employees')]
const getEmployeeLinks = (id) => [siren.selfLink(`/api/employees/${id}`)]
const addEmployeeLinks = (id) => [siren.selfLink('/api/employees'), siren.SirenLink(['/rel/employee'], `/api/employees/${id}`)]
const updateEmployeeLinks = (id) => [siren.selfLink(`/api/employees/${id}`), siren.SirenLink(['/rel/employees'],'/api/employees')]
const deleteEmployeeLinks = [siren.SirenLink(['/rel/employees'],'/api/employees')]

function addEmployeeAction(){
    return siren.SirenAction(
        'add-employee',
        'Add a Employee',
        'POST',
        '/api/employees',
        JSON.stringify([
            siren.addField('name', 'text'),
            siren.addField('roles', 'object')
        ])
    )
}

function updateEmployeeAction (id) {
    return siren.SirenAction(
        'update-employee',
         'Update an Employee',
         'PATCH',
        `/api/employees/${id}`,
        JSON.stringify([
            siren.addField('roles', 'object')
        ])
    )
} 

function deleteEmployeeAction (id) {
   return siren.SirenAction(
        'delete-employee',
        'Delete an Employee',
        'DELETE',
        `/api/employees/${id}`
    )
} 

function setSubEntities(employees){
    const subEntities = []
    employees.forEach(element => {
        subEntities.push(
            siren.addSubEntity(
                'Employee',
                '/rel/employee',
                '{}',  
                JSON.stringify([siren.selfLink(`/api/queues/${element._id}`)]),
                '[]',
                ''
            )        
        )
    })
    return subEntities
}

module.exports = {
    getEmployeeLinks,
    getEmployeesLinks,
    addEmployeeLinks,
    updateEmployeeLinks,
    deleteEmployeeLinks,
    addEmployeeAction,
    updateEmployeeAction,
    deleteEmployeeAction,
    setSubEntities
}
