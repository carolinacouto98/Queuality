'use strict'

const service = require('../services/appointment-services.js')
const model = require('../common/model.js')
const { Entity } = require('../common/siren.js')
const appointmentSiren = require('./siren/appointment-siren.js')

const Router = require('express').Router
const error = require('../common/error.js')
const router = Router()

module.exports = router

router.get('/sections/:sectionId/appointments', (req, res, next) => {
    const section = req.params.sectionId
    const subject = req.query.subject
    const desk = req.query.desk
    // if (!req.employee?.roles.includes('Manage Section\'s Appointments') || !req.employee.sections.includes(section))
    //     next(error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
    
    if(subject && desk) 
        service.getAppointments(section, subject, desk)
            .then(appointments => res.send(
                new Entity(
                    'Get Appointments',
                    ['Appointments'],
                    appointmentSiren.getAppointmentsLinks(section, subject, desk),
                    undefined,
                    [appointmentSiren.addAppointmentAction()],
                    appointmentSiren.setSubEntities(appointments)
                    
                )))
            .catch(next)
    else
        throw error.CustomException('Invalid Query Parameters', error.BAD_REQUEST)
    
})

router.get('/sections/:sectionId/appointments/:appointmentId', (req, res, next) => {
    const id = req.params.appointmentId
    const section = req.params.sectionId
    service.getAppointment(id)
        .then(appointment => res.send(
            new Entity(
                'Get an Appointment',
                ['Appointment'],
                appointmentSiren.getAppointmentLinks(section, id),
                appointment,
                [
                    appointmentSiren.deleteAppointmentAction(id), 
                    appointmentSiren.updateAppointmentAction(id)
                ]
            )
        ))
        .catch(next)
})

router.get('/sections/:sectionId/availableHours', (req, res, next) => {
    const id = req.params.sectionId
    const subject = req.query.subject
    const day = req.query.day
    if(subject && day)
        service.getAvailableHoursByDay(id, subject, day)
            .then(hours => res.send(
                new Entity(
                    'Get Available Hours',
                    ['Appointment'],
                    appointmentSiren.getAvailableHoursLinks(id, subject, day),
                    hours
                )
            ))
            .catch(next)
        else
            throw error.CustomException('Invalid Query Parameters', error.BAD_REQUEST)
        
})

router.get('/sections/:sectionId/nextAvailableDay', (req, res, next) => {
    const id = req.params.sectionId
    const subject = req.query.subject
    if(subject)
        service.getNextDayAvailable(id, subject)
            .then(day => res.send(
                new Entity(
                    'Get Available Day',
                    ['Appointment'],
                    appointmentSiren.getNextDayAvailableLinks(id, subject),
                    day
                )
            ))
            .catch(next)
        else
            throw error.CustomException('Invalid Query Parameters', error.BAD_REQUEST)
        
})
//mobile-app
router.patch('/appointments/:appointmentId', (req, res, next) => {
    const id = req.params.appointmentId
    const date = req.body.date
    if(!date)
        throw error.CustomException('Missing Parameters', error.BAD_REQUEST)
    service.updateAppointment(id, new Date(date))
        .then(appointment => res.send(
            new Entity(
                'Update an Appointment',
                ['Appointment'],
                appointmentSiren.updateAppointmentLinks(id, appointment.section,appointment.subject, appointment.desk),
                appointment
            )
        ))
        .catch(next)
    
})
//mobile-app
router.post('/sections/:sectionId/appointments', (req, res, next) => {
    const section = req.params.sectionId
    const date = req.body.date
    const subject = req.body.subject
    if(!date && !subject)
        throw error.CustomException('Missing required Parameters', error.BAD_REQUEST)
    else    
        model.appointmentInputModel.validateAsync({subject, date, section})
            .then(appointment =>
                service.addAppointment(appointment)
                    .then(appointment => res.status(201).send(
                        new Entity(
                            'Add an Appointment',
                            ['Appointments'],
                            appointmentSiren.addAppointmentLinks(section ,appointment? appointment._id: undefined),
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
                appointmentSiren.deleteAppointmentLinks(appointment.section, appointment.subject, appointment.desk)
            )))
        .catch(next)
})