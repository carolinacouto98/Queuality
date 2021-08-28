'use strict'
const siren = require('../../common/siren.js')

const getAvailableHoursLinks = (subject, day) => [siren.selfLink(`${siren.BASENAME}/appointments?subject=${subject}&day=${day}`)]
const getAppointmentsLinks = (section, desk) => [siren.selfLink(`${siren.BASENAME}/appointments?section=${section}&desk=${desk}`)]
const getAppointmentLinks = (id) => [siren.selfLink(`${siren.BASENAME}/appointments/${id}`)]
const updateAppointmentLinks = (id, section, desk) => [
    siren.selfLink(`${siren.BASENAME}/appointments/${id}`),
    new siren.SirenLink(['/rel/appointments'],`${siren.BASENAME}/appointments?section=${section}&desk=${desk}`)
]
const addAppointmentLinks = (id) => {id? [
    siren.selfLink(`${siren.BASENAME}/appointments`),
    new siren.SirenLink(['/rel/appointment'],`${siren.BASENAME}/appointments/${id}`)
] :
[siren.selfLink(`${siren.BASENAME}/appointments`)]
}
const deleteAppointmentLinks = (section, desk) => [ new siren.SirenLink(['/rel/appointments'], `${siren.BASENAME}/appointments?section=${section}&desk=${desk}`)]

function addAppointmentAction(){
    return new siren.SirenAction(
        'add-appointment',
        'Add an Appointment',
        siren.HttpMethod.POST,
        `${siren.BASENAME}/appointments`,
        [
            new siren.Field('date', 'datetime'),
            new siren.Field('desk', 'string'),
            new siren.Field('subject', 'string'),
            new siren.Field('section', 'string')
        ]
    )
}

function updateAppointmentAction(id) {
    return new siren.SirenAction(
        'update-appointment',
        'Update an Appointment',
        siren.HttpMethod.PATCH,
        `${siren.BASENAME}/appointments/${id}`,
        [
            new siren.Field('date', 'datetime')
        ]
    )
} 

function deleteAppointmentAction(id) {
    return new siren.SirenAction(
        'delete-appointment',
        'Delete an Appointment',
        siren.HttpMethod.DELETE,
        `${siren.BASENAME}/appointments/${id}`
    )
} 

function setSubEntities(appointments){
    const subEntities = []
    appointments.forEach(element => {
        subEntities.push(
            new siren.EmbeddedEntity(
                ['/rel/appointment'],
                [siren.selfLink(`${siren.BASENAME}/appointments/${element._id}`)],
                element,
                ['Appointment'],
                [updateAppointmentAction(element._id),
                deleteAppointmentAction(element._id)]
            )        
        )
    })
    return subEntities
}

module.exports = {
    getAvailableHoursLinks,
    getAppointmentLinks,
    getAppointmentsLinks,
    updateAppointmentLinks,
    updateAppointmentAction,
    addAppointmentAction,
    addAppointmentLinks,
    deleteAppointmentAction,
    deleteAppointmentLinks,
    setSubEntities
}