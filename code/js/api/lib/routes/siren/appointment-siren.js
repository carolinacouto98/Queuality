'use strict'
const siren = require('../../common/siren.js')

const getAvailableHoursLinks = (section, subject, day) => [siren.selfLink(`${siren.BASENAME}/sections/${section}/availableHours?subject=${subject}&day=${day}`)]
const getNextDayAvailableLinks = (section, subject) => [siren.selfLink(`${siren.BASENAME}/sections/${section}/nextAvailableDay?subject=${subject}`)]
const getAppointmentsLinks = (section,subject, desk) => [siren.selfLink(`${siren.BASENAME}/sections/${section}/appointments?subject=${subject}&desk=${desk}`)]
const getAppointmentLinks = (section, id) => [siren.selfLink(`${siren.BASENAME}/sections/${section}/appointments/${id}`)]
const updateAppointmentLinks = (id, section, subject, desk) => [
    siren.selfLink(`${siren.BASENAME}/sections/${section}/appointments/${id}`),
    new siren.SirenLink(['/rel/appointments'],`${siren.BASENAME}/sections/${section}/appointments?subject=${subject}&desk=${desk}`)
]
const addAppointmentLinks = (section, id) => {id? [
    siren.selfLink(`${siren.BASENAME}/sections/${section}/appointments`),
    new siren.SirenLink(['/rel/appointment'],`${siren.BASENAME}/sections/${section}/appointments/${id}`)
] :
[siren.selfLink(`${siren.BASENAME}/sections/${section}/appointments`)]
}
const deleteAppointmentLinks = (section,subject, desk) => [ new siren.SirenLink(['/rel/appointments'], `${siren.BASENAME}/sections/${section}/appointments?subject=${subject}&desk=${desk}`)]

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
    getNextDayAvailableLinks,
    getAppointmentsLinks,
    updateAppointmentLinks,
    updateAppointmentAction,
    addAppointmentAction,
    addAppointmentLinks,
    deleteAppointmentAction,
    deleteAppointmentLinks,
    setSubEntities
}