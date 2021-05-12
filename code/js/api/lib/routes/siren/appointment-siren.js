'use strict'
const siren = require('../../common/siren.js')

const getSubjectsInfoLinks = [siren.selfLink('/api/subject-manager')]
const getSubjectsLinks = [siren.selfLink('/api/subject-manager/subjects')]
const getDeskLinks = (subject) => [siren.selfLink(`/api/subject-manager/subjects/${subject}/desks`)]
const getAppointmentsLinks = (subject) => [siren.selfLink(`/api/subject-manager/subjects/${subject}/appointments`)]
const getAppointmentLinks = (subject, id) => [siren.selfLink(`/api/subject-manager/subjects/${subject}/appointments/${id}`)]
const updateAppointmentLinks = (subject, id) => [siren.selfLink(`/api/subject-manager/subjects/${subject}/appointments/${id}`), siren.SirenLink(['/rel/appointments'],`api/subject-manager/subjects/${subject}/appointments`)]
const addAppointmentLinks = (subject, id) => [siren.selfLink(`/api/subject-manager/subjects/${subject}/appointments`), siren.SirenLink('rel/appointment',`/api/subject-manager/subjects/${subject}/appointments/${id}`)]
const addSubjectLinks = [siren.selfLink('/api/subject-manager'), siren.SirenLink('rel/subject')]
const deleteAppointmentLinks = (subject) => [siren.SirenLink('rel/appointments', `/api/subject-manager/subjects/${subject}/appointments`)]
const deleteSubjectLinks = [siren.SirenLink('rel/subjects','/api/subject-manager/subjects')]

function addAppointmentAction(subject){
    return siren.SirenAction(
        'add-appointment',
        'Add an Appointment',
        'POST',
        `/api/subject-manager/subjects/${subject}/appointments`,
        JSON.stringify([
            siren.addField('date', 'datetime'),
        ])
    )
}

function addSubjectAction(){
    return siren.SirenAction(
        'add-subject',
        'Add a Subject',
        'POST',
        '/api/subject-manager',
        JSON.stringify([
            siren.addField('desk', 'text'),
            siren.addField('subject', 'text'),
            siren.addField('duration', 'text')
        ])
    )
}

function updateAppointmentAction (subject, id) {
    return siren.SirenAction(
        'update-appointment',
         'Update an Appointment',
         'PATCH',
         `/api/subject-manager/subjects/${subject}/appointments/${id}`,
        JSON.stringify([
            siren.addField('date', 'datetime')
        ])
    )
} 

function deleteAppointmentAction (subject, id) {
   return siren.SirenAction(
        'delete-appointment',
        'Delete an Appointment',
        'DELETE',
        `/api/subject-manager/subjects/${subject}/appointments/${id}`
    )
} 

function deleteSubjectAction (subject, id) {
    return siren.SirenAction(
         'delete-subject',
         'Delete a Subject',
         'DELETE',
         `/api/subject-manager/subjects/${subject}`
     )
 } 

function setSubjectsInfoEntity() {
    return [
        siren.addSubEntity(
            'Subjects',
            '/rel/subjects',
            '{}',  
            JSON.stringify([siren.selfLink(`/api/subject-manager/subjects`)]),
            '[]',
            ''
        )
    ]
}

function setSubjectsSubEntities(subjects){
    const subEntities = []
    subjects.forEach(element => {
        subEntities.push(
            siren.addSubEntity(
                'Subject',
                '/rel/subject',
                JSON.stringify(element),  
                JSON.stringify([siren.selfLink(`/api/subject-manager/subjects/${element.subject}`),
                 siren.SirenLink('rel/desks',`/api/subject-manager/subjects/${element.subject}/desks`),
                 siren.SirenLink('rel/appointments',`/api/subject-manager/subjects/${element.subject}/appointments` )
                ]),
                JSON.stringify([deleteSubjectAction(element._id)]),
                'Get Subject'
            )        
        )
    })
    return subEntities
}

function setAppointmentsSubEntities(subject, appointments){
    const subEntities = []
    appointments.forEach(element => {
        subEntities.push(
            siren.addSubEntity(
                'Appointment',
                '/rel/appointment',
                '{}',  
                JSON.stringify([siren.selfLink(`/api/subject-manager/subjects/${subject}/appointments/${element._id}`)]),
                '[]',
                ''
            )        
        )
    })
    return subEntities
}

module.exports = {
    getAppointmentLinks,
    getAppointmentsLinks,
    getDeskLinks,
    getSubjectsInfoLinks,
    getSubjectsLinks,
    updateAppointmentLinks,
    updateAppointmentAction,
    addAppointmentAction,
    addAppointmentLinks,
    addSubjectAction,
    addSubjectLinks,
    deleteAppointmentAction,
    deleteAppointmentLinks,
    deleteSubjectAction,
    deleteSubjectLinks,
    setAppointmentsSubEntities,
    setSubjectsInfoEntity,
    setSubjectsSubEntities
}