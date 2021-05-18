'use strict'

const service = require('../services/ticket-services.js')
const siren = require('../common/siren.js')
const ticketSiren = require('./siren/ticket-siren.js')

const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/api/tickets', (req, res, next) => {
    service.getWaitingTickets()
        .then((tickets)=> res.send(
            siren.toSirenObject(
                'Tickets',
                JSON.stringify(tickets),
                '[]',
                JSON.stringify(ticketSiren.getWaitingTicketsLinks),
                JSON.stringify([ticketSiren.addTicketAction(), ticketSiren.deleteTicketAction()])
            )
        ))
        .catch(next)
})

/*router.get('/api/queues/:queueId/current-ticket', (req, res, next) => {
    const id = req.params.queueId
    service.getCurrentQueueTicket(id)
        .then(ticket => res.send(
            siren.toSirenObject(
                'Current Ticket',
                JSON.stringify(ticket),
                '[]',
                JSON.stringify(ticketSiren.getCurrentQueueTicketLinks(id)),
                JSON.stringify([ticketSiren.updateAnsweredTicketsAction(id)])
            )
        ))
        .catch(next)
})*/

//mobile-app
router.post('/api/tickets', (req, res, next) => {
    const queueName = req.body.queueName
    const queueId = req.body.queueId
    service.addWaitingTicket(queueId)
        .then(() => service.getCurrentTicket(queueName, queueId)
            .then(ticket => res.send(
                siren.toSirenObject(
                    'Tickets',
                    JSON.stringify(ticket),
                    '[]',
                    JSON.stringify(ticketSiren.addTicketLinks),
                    '[]'
                )
            ))
        )
        .catch(next)
})

//mobile-app
router.put('/api/tickets', (req, res, next) => {
    service.removeTicket()
        .then(() => res.send(
            siren.toSirenObject(
                'Tickets',
                '{}',
                '[]',
                JSON.stringify(ticketSiren.deleteTicketLinks),
                '[]'
            )
        ))
        .catch(next)
})