'use strict'
const siren = require('../../common/siren')

const getEmployeesLinks = [siren.selfLink(`${siren.BASENAME}/employees`)]
const addEmployeeLinks = (id) => [siren.selfLink(`${siren.BASENAME}/employees`), new siren.SirenLink(['/rel/employee'], `${siren.BASENAME}/employees/${id}`)]
const updateEmployeeLinks = (id) => [siren.selfLink(`${siren.BASENAME}/employees/${id}`), new siren.SirenLink(['/rel/employees'],`${siren.BASENAME}/employees`)]
const deleteEmployeeLinks = [new siren.SirenLink(['/rel/employees'],`${siren.BASENAME}/employees`)]

function addEmployeeAction(){
    return new siren.SirenAction(
        'add-employee',
        'Add a Employee',
        'POST',
        `${siren.BASENAME}/employees`,
        [
            new siren.Field('name', 'text'),
            new siren.Field('roles', 'object'),
            new siren.Field('sections', 'object'),
            new siren.Field('desk', 'string')
        ]
    )
}

function updateEmployeeAction (id) {
    return new siren.SirenAction(
        'update-employee',
        'Update an Employee',
        'PATCH',
        `${siren.BASENAME}/employees/${id}`,
        [
            new siren.Field('name', 'string'),
            new siren.Field('roles', 'object'),
            new siren.Field('sections', 'object'),
            new siren.Field('desk', 'string')
        ]
    )
} 

function deleteEmployeeAction (id) {
    return new siren.SirenAction(
        'delete-employee',
        'Delete an Employee',
        'DELETE',
        `${siren.BASENAME}/employees/${id}`
    )
} 

function setSubEntities(employees){
    const subEntities = []
    employees.forEach(element => {
        subEntities.push(
            new siren.EmbeddedEntity( 
                ['/rel/employee'],
                [siren.selfLink(`/api/queues/${element._id}`)],
                element,
                ['Employee']
            )        
        )
    })
    return subEntities
}

module.exports = {
    getEmployeesLinks,
    addEmployeeLinks,
    updateEmployeeLinks,
    deleteEmployeeLinks,
    addEmployeeAction,
    updateEmployeeAction,
    deleteEmployeeAction,
    setSubEntities
}
