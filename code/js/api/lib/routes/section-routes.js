'use strict'

const service = require('../services/section-services.js')
const ticketService = require('../services/ticket-services.js')
const model = require('../common/model.js')
const sectionSiren = require('./siren/section-siren.js')
const Router = require('express').Router
const { Entity } = require('../common/siren.js')
const error = require('../common/error.js')
const router = Router()
module.exports=router

router.get('/sections',(req, res, next)=> {
    service.getSections()
        .then(sections => 
            res.send(
                new Entity(
                    'Get Sections',
                    ['Sections'],
                    sectionSiren.getSectionsLinks,
                    sections,
                    [sectionSiren.addSectionAction()],
                    sectionSiren.setSubEntities(sections)
                )))
        .catch(next)
})

router.post('/sections', (req, res, next) => {
    const _id = req.body._id
    const workingHours = req.body.workingHours
    if(!_id && !workingHours)
        throw error.CustomException('Missing Required Parameters', error.BAD_REQUEST)
    model.sectionInputModel.validateAsync({ _id, workingHours})
        .then(section => 
            service.addSection(section)
                .then(section => res.status(201).send(
                    new Entity(
                        'Add a Section',
                        ['Section'],
                        sectionSiren.addSectionLinks(_id.replace(' ', '-')),
                        section
                    ))))
        .catch(next)
})

router.patch('/sections/:sectionId', (req, res, next) => {
    const _id = req.params.sectionId
    const workingHours = req.body.workingHours
    if(!workingHours)
        throw error.CustomException('Missing Parameters', error.BAD_REQUEST)
    model.sectionUpdateInputModel.validateAsync({_id, workingHours})
        .then(section => 
            service.updateSection(section)
                .then(section => res.send(
                    new Entity(
                        'Update a Section', 
                        sectionSiren.updateSectionLinks(section._id.replace(' ', '-')),
                        section
                    )))
                .catch(next)
        )})

       
router.delete('/sections/:sectionId', (req, res, next) => {
    const _id = req.params.sectionId
    service.removeSection(_id)
        .then(() => res.send(
            new Entity(
                'Delete a Section', 
                undefined,
                sectionSiren.deleteSectionLinks
            )))
        .catch(next)
})

router.post('/sections/:sectionId/queue', (req, res, next) => {
    const _id = req.params.sectionId
    const subjectName = req.body.subject
    ticketService.addTicket(_id, subjectName)
        .then(ticket => res.send(
            new Entity(
                'Add a Ticket',
                ['Tickets'],
                sectionSiren.addTicketLinks(_id.replace(' ', '-')),
                ticket
            )))
        .catch(next)
})

router.get('/sections/:sectionId/queue', (req, res, next) => {
    const _id = req.params.sectionId
    const nextTicket = req.query.next
    const subject = req.query.subject
    if(nextTicket) 
        ticketService.getNextTicket(_id, subject)
            .then(ticket => res.send(
                new Entity(
                    'Next Ticket',
                    ['Tickets'],
                    sectionSiren.getNextTicketLinks(_id.replace(' ', '-'), subject),
                    ticket
                )))
            .catch(next)
    else
        ticketService.getQueueTickets(_id)
            .then(tickets => res.send(
                new Entity(
                    'Get Tickets',
                    ['Tickets'],
                    sectionSiren.getQueueTicketsLinks(_id.replace(' ', '-')),
                    tickets
                )
            ))
            .catch(next)
})
