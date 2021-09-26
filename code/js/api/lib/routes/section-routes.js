'use strict'

const service = require('../services/section-services.js')
const ticketService = require('../services/ticket-services.js')
const model = require('../common/model.js')
const sectionSiren = require('./siren/section-siren.js')
const Router = require('express').Router
const { Entity } = require('../common/siren.js')
const error = require('../common/error.js')
const auth = require('../common/auth.js')
const router = Router()
module.exports=router

router.get('/sections', auth.optional(), (req, res, next) => {
    service.getSections()
        .then(sections => {
            const actions = []
            if (req.employee) {
                sections = sections.filter(section => req.employee.sections.includes(section._id))
                if (req.employee.roles.includes('Manage Sections'))
                    actions.push(sectionSiren.addSectionAction())
            }
            res.send(
                new Entity(
                    'Get Sections',
                    ['Sections'],
                    sectionSiren.getSectionsLinks,
                    undefined,
                    actions,
                    sectionSiren.setSubEntities(sections)
                ))
        })
        .catch(next)
})

router.get('/sections/:sectionId', auth.optional(), (req, res, next) => {
    const _id = req.params.sectionId
    const actions = []
    if (req.employee?.roles.includes('Manage Section') && req.employee?.sections.includes(_id)) 
        actions.push(sectionSiren.updateSectionAction(_id))
    if (req.employee?.roles.includes('Answer Ticket') && req.employee.sections.includes(_id))
        actions.push(sectionSiren.answerTicketAction(_id))

    service.getSection(_id)
        .then(section => 
            res.send(
                new Entity(
                    'Get Section',
                    ['Section'],
                    sectionSiren.addSectionLinks(_id),
                    section,
                    actions
                )))
        .catch(next)
})

router.post('/sections', auth.requested(), (req, res, next) => {
    if (!req.employee?.roles.includes('Manage Sections') && (!req.employee?.roles.includes('Manage Section') || !req.employee?.sections.includes(_id)))
        return next(error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
    const _id = req.body._id
    const workingHours = req.body.workingHours
    if(!_id && !workingHours)
        throw error.CustomException('Missing Required Parameters', error.BAD_REQUEST)
    model.sectionInputModel.validateAsync({ _id, workingHours })
        .then(section => 
            service.addSection(section)
                .then(section => res.status(201).send(
                    new Entity(
                        'Add a Section',
                        ['Section'],
                        sectionSiren.addSectionLinks(_id),
                        section
                    ))))
        .catch(next)
})

router.patch('/sections/:sectionId', auth.requested(), (req, res, next) => {
    const _id = req.params.sectionId
    if (!req.employee?.roles.includes('Manage Section') || !req.employee?.sections.includes(_id))
        return next(error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
    const workingHours = req.body.workingHours
    if(!workingHours)
        throw error.CustomException('Missing Parameters', error.BAD_REQUEST)
    model.sectionUpdateInputModel.validateAsync({_id, workingHours})
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

router.delete('/sections/:sectionId', auth.requested(), (req, res, next) => {
    const _id = req.params.sectionId
    if (!req.employee?.roles.includes('Manage Sections') 
        && (!req.employee?.roles.includes('Manage Section') || !req.employee?.sections.includes(_id)))
        return next(new error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
    service.removeSection(_id)
        .then(() => res.send(
            new Entity(
                'Delete a Section', 
                undefined,
                sectionSiren.deleteSectionLinks
            )))
        .catch(next)
})

router.post('/sections/:sectionId/queue', auth.requested(), (req, res, next) => {
    const _id = req.params.sectionId
    const subjectName = req.body.subject
    ticketService.addTicket(_id, subjectName)
        .then(ticket => res.send(
            new Entity(
                'Add a Ticket',
                ['Tickets'],
                sectionSiren.addTicketLinks(_id),
                ticket
            )))
        .catch(next)
})

router.get('/sections/:sectionId/queue', auth.optional(), (req, res, next) => {
    const _id = req.params.sectionId
    const nextTicket = req.query.next
    const desk = req.query.desk
    const subject = req.query.subject
    const actions = []
    if (req.employee?.roles.includes('Answer Tickets') && req.employee.sections.includes(_id))
        actions.push(sectionSiren.answerTicketAction(_id))
    if(nextTicket && desk && subject) {
        if (!req.employee?.roles.includes('Answer Tickets') || !req.employee?.sections.includes(_id))
            return next(error.CustomException('You do not have permission to access this resource.', error.UNAUTHORIZED))
        ticketService.getNextTicket(_id, subject, desk)
            .then(ticket => res.send(
                new Entity(
                    'Next Ticket',
                    ['Tickets'],
                    sectionSiren.getNextTicketLinks(_id, subject, desk),
                    ticket
                )))
            .catch(next)
    }
    else
        ticketService.getQueueTickets(_id)
            .then(tickets => res.send(
                new Entity(
                    'Get Tickets',
                    ['Tickets'],
                    sectionSiren.getQueueTicketsLinks(_id),
                    tickets,
                    actions
                )
            ))
            .catch(next)
})
