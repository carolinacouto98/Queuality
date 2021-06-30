'use strict'

const service = require('../services/subject-services.js')
const ticketService = require('../services/ticket-services.js')
const model = require('../common/model.js')
const {Entity} = require('../common/siren.js')
const subjectSiren = require('./siren/subject-siren.js')

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
                    subjectSiren.getSubjectsLinks(sectionId.replace(' ', '-')),
                    subjects,
                    [subjectSiren.addSubjectAction(sectionId.replace(' ', '-'))], 
                    subjectSiren.setSubEntities(sectionId.replace(' ', '-'),subjects)
                )))
        .catch(next)
})

router.post('/sections/:sectionId/subjects', (req, res, next) => {
    const sectionId = req.params.sectionId
    const name = req.body.name
    const priority = req.body.priority
    const subject = req.body.subject
    if(!name|| priority  == undefined || !subject)
        throw error.CustomException('Missing required parameters', error.BAD_REQUEST)
    model.subjectInputModel.validateAsync({ name, priority, subject})
        .then(subject => 
            service.addSubject(sectionId, subject)
                .then(subject => res.status(201).send(
                    new Entity(
                        'Add a Subject',
                        ['Subject'], 
                        subjectSiren.addSubjectLinks(sectionId.replace(' ', '-'), subject.name),
                        subject
                    ))))
        .catch(next)
})

router.patch('/sections/:sectionId/subjects/:subjectName', (req, res, next) => {
    const sectionId = req.params.sectionId
    const name = req.params.subjectName
    const priority = req.body.priority
    const subject = req.body.subject
    const desks = req.body.desks
    if(priority == undefined && !subject && !desks)
        throw error.CustomException('Missing Parameters', error.BAD_REQUEST)
    model.subjectUpdateInputModel.validateAsync({name, priority, subject, desks})
        .then(subject => 
            service.updateSubject(sectionId, subject)
                .then(subject => res.send(
                    new Entity(
                        'Update a Subject',
                        ['Subject'],
                        subjectSiren.updateSubjectLinks(sectionId.replace(' ', '-'), name),
                        subject
                    )))
                .catch(next)
        )})

router.delete('/sections/:sectionId/subjects/:subjectId', (req, res, next) => {
    const sectionId = req.params.sectionId
    const _id = req.params.subjectId
    service.deleteSubject(sectionId, _id)
        .then(() => res.send(
            new Entity(
                'Delete a Subject',
                ['Subject'], 
                subjectSiren.deleteSubjectLinks(sectionId.replace(' ','-'))
            )))
        .catch(next)
})

router.put('/sections/:sectionId/subjects/:subjectId', (req, res, next) => {
    const sectionId = req.params.sectionId
    const _id = req.params.subjectId
    const ticket = req.body.ticket
    if(ticket[0]!== _id)
        throw error.CustomException('Ticket id and Subject Id dont match', error.BAD_REQUEST)
    ticketService.removeTicket(sectionId, _id, ticket)
        .then(removedTicket => 
            res.send(
                new Entity(
                    'Remove a Ticket',
                    ['Ticket'],
                    subjectSiren.removeTicketLinks(sectionId.replace(' ', '-'), _id),
                    removedTicket
                )))
        .catch(next)
})

