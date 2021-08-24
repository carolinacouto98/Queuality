'use strict'

const service = require('../services/subject-services.js')
const ticketService = require('../services/ticket-services.js')
const model = require('../common/model.js')
const { Entity } = require('../common/siren.js')
const subjectSiren = require('./siren/subject-siren.js')
const auth = require('../common/auth.js')


const Router = require('express').Router
const error = require('../common/error.js')
const router = Router()

module.exports = router

router.get('/sections/:sectionId/subjects', (req, res, next) => {
    const sectionId = req.params.sectionId
    service.getSubjects(sectionId)
        .then(subjects => 
            res.send(
                new Entity(
                    'Get Subjects',
                    ['Subjects'], 
                    subjectSiren.getSubjectsLinks(sectionId),
                    sectionId,
                    [subjectSiren.addSubjectAction(sectionId)], 
                    subjectSiren.setSubEntities(sectionId, subjects)
                )))
        .catch(next)
})

router.post('/sections/:sectionId/subjects', auth.requested(), (req, res, next) => {
    const sectionId = req.params.sectionId
    const name = req.body.name
    const priority = req.body.priority
    const description = req.body.description
    /*if (!req.employee.roles?.includes('Manage Section') || !req.employee?.sections.includes(sectionId))
        next(new error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
    if(!name|| priority  == undefined || !description)
        throw error.CustomException('Missing required parameters', error.BAD_REQUEST)*/
    const desks = req.body.desks
    model.subjectInputModel.validateAsync({ name, priority, description, desks })
        .then(subject => 
            service.addSubject(sectionId, subject)
                .then(subject => res.status(201).send(
                    new Entity(
                        'Add a Subject',
                        ['Subject'], 
                        subjectSiren.addSubjectLinks(sectionId, subject.name),
                        subject
                    ))))
        .catch(next)
})

router.patch('/sections/:sectionId/subjects/:subjectName', auth.requested(), (req, res, next) => {
    const sectionId = req.params.sectionId
    const name = req.params.subjectName
    const priority = req.body.priority
    const description = req.body.description
    const desks = req.body.desks
    /*if (!req.employee?.roles.includes('Manage Section') || !req.employee?.sections.includes(sectionId))
        next(new error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
    if(priority == undefined && !subject && !desks)
        throw error.CustomException('Missing Parameters', error.BAD_REQUEST)*/
    model.subjectUpdateInputModel.validateAsync({name, priority, description, desks})
        .then(subject => 
            service.updateSubject(sectionId, subject)
                .then(subject => res.send(
                    new Entity(
                        'Update a Subject',
                        ['Subject'],
                        subjectSiren.updateSubjectLinks(sectionId, name),
                        subject
                    )))
                .catch(next)
        )})

router.delete('/sections/:sectionId/subjects/:subjectName', auth.requested(), (req, res, next) => {
    const sectionId = req.params.sectionId
    const name = req.params.subjectName
    /*if (!req.employee?.roles.includes('Manage Section') || !req.employee?.sections.includes(sectionId))
        next(new error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))*/
    service.deleteSubject(sectionId, name)
        .then(() => res.send(
            new Entity(
                'Delete a Subject',
                ['Subject'], 
                subjectSiren.deleteSubjectLinks(sectionId)
            )))
        .catch(next)
})

router.put('/sections/:sectionId/subjects/:subjectName', (req, res, next) => {
    const sectionId = req.params.sectionId
    const name = req.params.subjectName
    const ticket = req.body.ticket
    if(ticket[0] !== name) //??
        throw error.CustomException('Ticket id and Subject Id dont match', error.BAD_REQUEST)
    ticketService.removeTicket(sectionId, name, ticket)
        .then(removedTicket => 
            res.send(
                new Entity(
                    'Remove a Ticket',
                    ['Ticket'],
                    subjectSiren.removeTicketLinks(sectionId, name),
                    removedTicket
                )))
        .catch(next)
})

