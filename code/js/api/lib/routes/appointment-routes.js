'use strict'

const service = require('../repo/services.js')

const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/api/appointments', (req, res, next) => {
    service.getAppointments()
        .then(appointments => res.json(appointments))
        .catch(next)
})

router.get('/api/appointments/:id', (req, res, next) => {
    const id = req.params.id
    service.getAppointment(id)
        .then(appointment => res.json(appointment))
        .catch(next)
})

router.patch('/api/appointments/:id', (req, res, next) => {
    const time = req.body.time
    const id = req.params.id
    const description = req.body.description
    service.updateAppointment(id, time, description)
        .then(res.json({"message" : "Appointment added"}))
        .catch(next)
})

router.post('/api/appointments', (req, res, next) => {
    const time = req.body.time
    const subject = req.body.subject
    const description = req.body.description
    service.addAppointment(time, subject, description)
        .then(res.json({"message" : "Appointment added"}))
        .catch(next)
})

router.delete('/api/appointments/:id', (req, res, next) => {
    const id = req.params.id
    service.removeAppointment(id)
        .then(res.json({"message" : "Appointment removed"}))
        .catch(next)
})