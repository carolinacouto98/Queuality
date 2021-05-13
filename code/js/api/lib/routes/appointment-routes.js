'use strict'

const service = require('../services/appointment-services.js')
const model = require('../common/model.js')
const siren = require('../common/siren.js')
const appointmentSiren = require('./siren/appointment-siren.js')

const Router = require('express').Router
const Joi = require('joi')
const router = Router()

module.exports = router

router.get('/api/subject-manager', (req, res, next) =>
    service.getSubjectsInfo()
        .then(infos => res.send(
            siren.toSirenObject(
                'SubjectsInfo',
                JSON.stringify(infos),
                JSON.stringify(appointmentSiren.setSubjectsInfoEntity()),
                JSON.stringify(appointmentSiren.getSubjectsInfoLinks),
                '[]'
            )
            
            ))
        .catch(next)
)
//mobile-app
router.get('/api/subject-manager/subjects', (req, res, next) => 
    service.getSubjects()
        .then(subjects => res.send(
            siren.toSirenObject(
                'Subjects',
                JSON.stringify(subjects),
                JSON.stringify(appointmentSiren.setSubjectsSubEntities(subjects)),
                JSON.stringify(appointmentSiren.getSubjectsLinks),
                JSON.stringify([appointmentSiren.addSubjectAction()])
            )
        ))
        .catch(next)
)
//mobile-app
router.get('/api/subject-manager/subjects/:subject/desks', (req, res, next) => {
    const subject = req.params.subject
    model.id.validateAsync(subject)
        .then(subject => service.getDesks(subject)
            .then(desks => res.send(
                siren.toSirenObject(
                    'Desks',
                    JSON.stringify(desks),
                    '[]',
                    JSON.stringify(appointmentSiren.getDeskLinks(subject)),
                    '[]'
                )
            )))
        .catch(next)
})

router.get('/api/subject-manager/subjects/:subject/appointments', (req, res, next) => {
    const _id = req.params.subject
    model.id.validateAsync(_id)
        .then(id => service.getAppointments(id)
        .then(appointments => res.send(
            siren.toSirenObject(
                'Appointments',
                JSON.stringify(appointments),
                JSON.stringify(appointmentSiren.setAppointmentsSubEntities(_id,appointments)),
                JSON.stringify(appointmentSiren.getAppointmentsLinks(_id)),
                JSON.stringify([appointmentSiren.addAppointmentAction(_id)])
            )

        )))
        .catch(next)
})
//mobile-app
router.get('/api/subject-manager/subjects/:subject/appointments/:id', (req, res, next) => {
    const id = req.params.id
    const subject = req.params.subject
    model.id.validateAsync(subject)
        .then(_id => model.id.validateAsync(id)
            .then(id => service.getAppointment(_id, id)
                .then(appointment => res.send(
                    siren.toSirenObject(
                        'Appointment',
                        JSON.stringify(appointment),
                        '[]',
                        JSON.stringify(appointmentSiren.getAppointmentLinks(subject, id)),
                        JSON.stringify([appointmentSiren.deleteAppointmentAction(subject,id), appointmentSiren.updateAppointmentAction(subject,id)])
                    )
                ))))
        .catch(next)
})
//mobile-app
router.patch('/api/subject-manager/subjects/:subject/appointments/:id', (req, res, next) => {
    const id = req.params.id
    const subject = req.params.subject
    const appointment = req.body
    model.id.validateAsync(subject)
        .then(async _id => { return { _id: _id, id: await model.id.validateAsync(id) } })
        .then(async ({_id, id}) => { return {
            _id: _id,
            id: id,
            appointment: await model.AppointmentInputModel.validateAsync(appointment)
        }})
        .then(({_id, id, appointment}) => service.updateAppointment(_id, id, appointment.date))
        .then(() => res.send(
            siren.toSirenObject(
                'Appointment',
                '{}',
                '[]',
                JSON.stringify(appointmentSiren.updateAppointmentLinks(subject, id)),
                '[]'
            )
        ))
        .catch(next)
})
//mobile-app
router.post('/api/subject-manager/subjects/:subject/appointments', (req, res, next) => {
    const subject = req.params.subject
    const appointment = req.body
    model.id.validateAsync(subject)
        .then(_id => { return {
            _id: _id,
            appointment: model.AppointmentInputModel.validateAsync(appointment)
        }})
        .then(({_id, appointment}) => service.addAppointment(_id, appointment.date))
        .then(id => res.status(201).send(
            siren.toSirenObject(
                'Appointments',
                '{}',
                '[]',
                JSON.stringify(appointmentSiren.addAppointmentLinks(subject, id)),
                '[]'
            )
        ))
        .catch(next)
})

router.post('/api/subject-manager', (req, res, next) => {
    const subject = req.body
     model.SubjectInputModel.validateAsync(subject)
        .then(subject => service.addSubject(subject))
        .then(() => res.status(201).send(
            siren.toSirenObject(
                'Subjects',
                '{}',
                '[]',
                JSON.stringify(appointmentSiren.addSubjectLinks),
                '[]'
            )
        ))
        .catch(next)
})
//mobile-app
router.delete('/api/subject-manager/subjects/:subject/appointments/:id', (req, res, next) => {
    const id = req.params.id
    const subject = req.params.subject
    model.id.validateAsync(subject)
        .then(async _id => { return { _id: _id, id: await model.id.validateAsync(id) } })
        .then(({_id, id}) => service.removeAppointment(_id, id))
        .then(() => res.send(
            siren.toSirenObject(
                'Appointment',
                '{}',
                '[]',
                JSON.stringify(appointmentSiren.deleteAppointmentLinks(subject)),
                '[]'
            )
        ))
        .catch(next)
})

router.delete('/api/subject-manager/subjects/:subject', (req, res, next) => {
    const subject = req.params.subject
    model.id.validateAsync(subject)
        .then(_id => service.removeSubject(_id))
        .then(() => res.send(
            siren.toSirenObject(
                'Subject',
                '{}',
                '[]',
                JSON.stringify(appointmentSiren.deleteSubjectLinks),
                '[]'
            )
        ))
        .catch(next)
})