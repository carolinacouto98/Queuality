'use strict'

const service = require('../services/subject-services.js')
const model = require('../common/model.js')
const {Entity} = require('../common/siren')
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
                    subjectSiren.getSubjectsLinks(sectionId),
                    subjects,
                    [subjectSiren.addSubjectAction(sectionId)], 
                    subjectSiren.setSubEntities(subjects)
                )))
        .catch(next)
})

router.post('/sections/:sectionId/subjects', (req, res, next) => {
    const sectionId = req.params.sectionId
    const name = req.body.name
    const priority = req.body.priority
    const subject = req.body.subject
    if(!name || !priority || !subject)
        throw error.CustomException('Missing required parameters', error.BAD_REQUEST)
    model.SubjectInputModel.validateAsync({ sectionId, name, priority, subject})
        .then(subject => 
            service.addSubject(subject)
                .then(subject => res.status(201).send(
                    new Entity(
                        'Add a Subject',
                        ['Subject'], 
                        subjectSiren.addSubjectLinks(sectionId, subject._id),
                        subject
                    ))))
        .catch(next)
})

router.patch('/sections/:sectionId/subjects/:subjectId', (req, res, next) => {
    const sectionId = req.params.sectionId
    const subjectId = req.params.subjectId
    const priority = req.body.priority
    const subject = req.body.subject
    if(!priority && !subject)
        throw error.CustomException('Missing Parameters', error.BAD_REQUEST)
    model.SubjectUpdateInputModel.validateAsync({sectionId, subjectId, priority, subject})
        .then(subject => 
            service.updateSubject(subject)
                .then(subject => res.send(
                    new Entity(
                        'Update a Subject',
                        ['Subject'],
                        subjectSiren.updateSubjectLinks(sectionId, subjectId),
                        subject
                    )))
                .catch(next)
        )})

router.delete('/sections/:sectionId/subjects/:subjectId', (req, res, next) => {
    const sectionId = req.params.sectionId
    const subjectId = req.params.subjectId
    service.removeSubject(sectionId, subjectId)
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
    const subjectId = req.params.subjectId
    const ticket=req.body.ticket
    service.removeTicket(sectionId, subjectId, ticket)
        .then(removedTicket => 
            res.send(
                new Entity(
                    'Remove a Ticket',
                    ['Ticket'],
                    subjectSiren.removeTicketLinks(sectionId, subjectId),
                    removedTicket
                )))
        .catch(next)
})

