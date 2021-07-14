'use strict'

const service = require('../services/appointment-services.js')
const model = require('../common/model.js')
const { Entity } = require('../common/siren.js')
const appointmentSiren = require('./siren/appointment-siren.js')

const Router = require('express').Router
const error = require('../common/error.js')
const router = Router()

module.exports = router

router.get('/appointments', (req, res, next) => {
    const section = req.query.section
    const desk = req.query.desk
    if (!req.employee?.roles.includes('Manage Section\'s Appointments') || !req.employee.sections.includes(section))
        next(new error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
    
    if(section && desk) 
        service.getAppointments(section, desk)
            .then(appointments => res.send(
                new Entity(
                    'Get Appointments',
                    ['Appointments'],
                    appointmentSiren.getAppointmentsLinks(section, desk),
                    appointments,
                    [appointmentSiren.addAppointmentAction()],
                    appointmentSiren.setSubEntities(appointments)
                    
                )))
            .catch(next)
    else
        throw error.CustomException('Invalid Query Parameters', error.BAD_REQUEST)
    
})

router.get('/appointments/:appointmentId', (req, res, next) => {
    const id = req.params.appointmentId
    service.getAppointment(id)
        .then(appointment => res.send(
            new Entity(
                'Get an Appointment',
                ['Appointment'],
                appointmentSiren.getAppointmentLinks(id),
                appointment,
                [
                    appointmentSiren.deleteAppointmentAction(id), 
                    appointmentSiren.updateAppointmentAction(id)
                ]
            )
        ))
        .catch(next)
})
//mobile-app
router.patch('/appointments/:appointmentId', (req, res, next) => {
    const id = req.params.appointmentId
    const date = req.body.date
    if(!date)
        throw error.CustomException('Missing Parameters', error.BAD_REQUEST)
    service.updateAppointment(id, date)
        .then(appointment => res.send(
            new Entity(
                'Update an Appointment',
                ['Appointment'],
                appointmentSiren.updateAppointmentLinks(id, appointment.section, appointment.desk),
                appointment
            )
        ))
        .catch(next)
})
//mobile-app
router.post('/appointments', (req, res, next) => {
    const section = req.body.section
    const date = req.body.date
    const subject = req.body.subject
    if(!section && !date && !desk && !subject)
        throw error.CustomException('Missing required Parameters', error.BAD_REQUEST)
    else    
        model.appointmentInputModel.validateAsync({subject, date, section})
            .then(appointment =>
                service.addAppointment(appointment)
                    .then(appointment => res.status(201).send(
                        new Entity(
                            'Add an Appointment',
                            ['Appointments'],
                            appointmentSiren.addAppointmentLinks(appointment? appointment._id: undefined),
                            appointment
                        )))
                    .catch(next)
            )
})

//mobile-app
router.delete('/appointments/:appointmentId', (req, res, next) => {
    const id = req.params.appointmentId
    service.removeAppointment(id)
        .then(appointment => res.send(
            new Entity(
                'Delete an Appointment',
                ['Appointment'],
                appointmentSiren.deleteAppointmentLinks(appointment.section, appointment.desk)
            )))
        .catch(next)
})