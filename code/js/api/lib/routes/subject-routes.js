'use strict'

const service = require('../services/subject-services.js')
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
//check
router.post('/sections/:sectionId/subjects', (req, res, next) => {
    const sectionId = req.params.sectionId
    const _id = req.body._id
    const priority = req.body.priority
    const subject = req.body.subject
    if(!_id|| priority  == undefined || !subject)
        throw error.CustomException('Missing required parameters', error.BAD_REQUEST)
    model.subjectInputModel.validateAsync({ _id, priority, subject})
        .then(subject => 
            service.addSubject(sectionId, subject)
                .then(subject => res.status(201).send(
                    new Entity(
                        'Add a Subject',
                        ['Subject'], 
                        subjectSiren.addSubjectLinks(sectionId.replace(' ', '-'), subject._id),
                        subject
                    ))))
        .catch(next)
})

router.patch('/sections/:sectionId/subjects/:subjectId', (req, res, next) => {
    const sectionId = req.params.sectionId
    const _id = req.params.subjectId
    const priority = req.body.priority
    const subject = req.body.subject
    const desks = req.body.desks
    if(!priority && !subject)
        throw error.CustomException('Missing Parameters', error.BAD_REQUEST)
    model.subjectUpdateInputModel.validateAsync({_id, priority, subject, desks})
        .then(subject => 
            service.updateSubject(subject)
                .then(subject => res.send(
                    new Entity(
                        'Update a Subject',
                        ['Subject'],
                        subjectSiren.updateSubjectLinks(sectionId.replace(' ', '-'), subjectId),
                        subject
                    )))
                .catch(next)
        )})

router.delete('/sections/:sectionId/subjects/:subjectId', (req, res, next) => {
    const sectionId = req.params.sectionId
    const _id = req.params.subjectId
    service.removeSubject(sectionId, _id)
        .then(() => res.send(
            new Entity(
                'Delete a Subject',
                ['Subject'], 
                subjectSiren.deleteSubjectLinks(sectionId)
            )))
        .catch(next)
})

router.put('/sections/:sectionId/subjects/:subjectId', (req, res, next) => {
    const sectionId = req.params.sectionId
    const _id = req.params.subjectId
    const ticket = req.body.ticket

    service.removeTicket(sectionId, _id, ticket)
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

