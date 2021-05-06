'use strict'

const service = require('../services/appointment-services.js')
const model = require('../common/model.js')

const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/api/subject-manager', (req, res, next) =>
    service.getSubjectsInfo()
        .then(res.json)
        .catch(next)
)

router.get('/api/subject-manager/subjects', (req, res, next) => 
    service.getSubjects()
        .then(res.json)
        .catch(next)
)

router.get('/api/subject-manager/:subject/desks', (req, res, next) => {
    const _id = req.params.subject
    model.id.validateAsync(_id)
        .then(id => service.getDesk(id).then(res.json))
        .catch(next)
})

router.get('/api/subject-manager/:subject/appointments', (req, res, next) => {
    const _id = req.params.subject
    model.id.validateAsync(_id)
        .then(id => service.getAppointments(id).then(res.json))
        .catch(next)
})

router.get('/api/subject-manager/:subject/appointments/:id', (req, res, next) => {
    const id = req.params.id
    const subject = req.params.subject
    model.id.validateAsync(subject)
        .then(_id => model.id.validateAsync(id).then(id => service.getAppointment(_id, id).then(res.json)))
        .catch(next)
})

router.patch('/api/subject-manager/:subject/appointments/:id', (req, res, next) => {
    const id = req.params.id
    const subject = req.params.subject
    const appointment = req.body
    model.id.validateAsync(subject)
        .then(_id => { return { _id: _id, id: model.id.validateAsync(id) } })
        .then(({_id, id}) => { return {
            _id: _id,
            id: id,
            appointment: model.AppointmentInputModel.validateAppointmentInputModel.validateAsync(appointment)
        }})
        .then(({_id, id, appointment}) => service.updateAppointment(_id, id, appointment.date))
        .then(() => res.json({message: 'Appointment updated successfully'}))
        .catch(next)
})

router.post('/api/subject-manager/:subject/appointments', (req, res, next) => {
    const subject = req.params.subject
    const appointment = req.body
    model.id.validateAsync(subject)
        .then(_id => { return {
            _id: _id,
            appointment: model.AppointmentInputModel.validateAppointmentInputModel.validateAsync(appointment)
        }})
        .then(({_id, appointment}) => service.addAppointment(_id, appointment.date))
        .then(() => res.status(201).json({message: 'Appointment added successfully'}))
        .catch(next)
})

router.delete('/api/subject-manager/:subject/appointments/:id', (req, res, next) => {
    const id = req.params.id
    const subject = req.params.subject
    model.id.validateAsync(subject)
        .then(_id => { return { _id: _id, id: model.id.validateAsync(id) } })
        .then(({_id, id}) => service.removeAppointment(_id, id))
        .then(() => res.json({message: 'Appointment deleted successfully'}))
        .catch(next)
})

router.delete('/api/subject-manager/:subject', (req, res, next) => {
    const subject = req.params.subject
    model.id.validateAsync(subject)
        .then(_id => service.removeSubject(_id))
        .then(() => res.json({message: 'Subject deleted successfully'}))
        .catch(next)
})