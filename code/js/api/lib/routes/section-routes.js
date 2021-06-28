'use strict'

const service = require('../services/section-services.js')
const model = require('../common/model.js')

const sectionSiren = require('./siren/section-siren.js')
const Router = require('express').Router
const { Entity } = require('../common/siren.js')
const error = require('../common/error.js')
const auth = require('../common/auth.js')
const router = Router()

router.get('/sections', (req, res, next) => {
    service.getSections()
        .then(sections => 
            res.send(
                new Entity(
                    'Get Sections',
                    sectionSiren.getSectionsLinks,
                    sections,
                    [sectionSiren.addSectionAction()],
                    sectionSiren.setSubEntities(sections)
                )))
        .catch(next)
})

router.post('/sections', auth('Manage Sections'), (req, res, next) => {
    const name = req.body.name
    const workingHours = req.body.workingHours
    if(!name && !workingHours)
        throw error.CustomException('Missing Required Parameters', error.BAD_REQUEST)
    model.SectionInputModel.validateAsync({ name, workingHours})
        .then(section => 
            service.addSection(section)
                .then(section => res.status(201).send(
                    new Entity(
                        'Add a Section',
                        sectionSiren.addSectionLinks(section._id),
                        section
                    ))))
        .catch(next)
})

router.patch('/sections/:sectionId', auth('Manage Sections'), (req, res, next) => {
    const _id = req.params.sectionId
    const workingHours = req.body
    if(!workingHours)
        throw error.CustomException('Missing Parameters', error.BAD_REQUEST)
    model.SectionUpdateInputModel.validateAsync({_id, workingHours})
        .then(section => 
            service.updateSection(section)
                .then(section => res.send(
                    new Entity(
                        'Update a Section', 
                        sectionSiren.updateSectionLinks(section._id),
                        section
                    )))
                .catch(next)
        )})

router.delete('/sections/:sectionId', auth('Manage Sections'), (req, res, next) => {
    const id = req.params.sectionId
    service.removeSection(id)
        .then(() => res.send(
            new Entity(
                'Delete a Section', 
                sectionSiren.deleteSectionLinks
            )))
        .catch(next)
})

router.post('/sections/:sectionId/queue', (req, res, next) => {
    const sectionId = req.body.sectionId
    const subjectName = req.body.subject
    service.addTicket(sectionId, subjectName)
        .then(ticket => res.send(
            new Entity(
                'Add a Ticket',
                ['Tickets'],
                sectionSiren.addTicketLinks(sectionId),
                ticket
            )))
        .catch(next)
})

router.get('/sections/:sectionId/queue', (req, res, next) => {
    const sectionId = req.body.sectionId
    const nextTicket = req.query.next
    const subject = req.query.subjectId
    if(nextTicket) 
        service.getNextTicket(sectionId, subject)
            .then(ticket => res.send(
                new Entity(
                    'Next Ticket',
                    ['Tickets'],
                    sectionSiren.getNextTicketLinks(sectionId, subject),
                    ticket
                )))
            .catch(next)
    else
        service.getQueueTicket(sectionId)
            .then(tickets => res.send(
                new Entity(
                    'Get Tickets',
                    ['Tickets'],
                    sectionSiren.getQueueTicketsLinks(sectionId),
                    tickets
                )
            ))
            .catch(next)
})
