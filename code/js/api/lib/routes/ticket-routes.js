'use strict'

const service = require('../services/ticket-services.js')

const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/api/tickets', (req, res, next) => {
    const waiting = req.query.waiting
    if(waiting == undefined || waiting == false)
        service.getTickets()
            .then(tickets => res.json(tickets))
            .catch(next)
    else {
        const ticket = req.query.ticketId
        service.getWaitingTickets(ticket)
            .then((tickets)=> res.json({message : `There are ${tickets} people waiting`}))
            .catch(next)
    }
        
})

router.get('/api/queues/:queueId/tickets', (req, res, next) => {
    const id = req.params.queueId
    service.getTicket(id)
        .then( ticket => res.json({message : `The ticket is ${ticket}`}))
        .catch(next)
})

router.post('/api/queues/:queueId/ticket', (req, res, next) => {
    const queueId = req.params.queueId
    service.addWaitingTicket(queueId)
        .then(res.json({message: 'Ticket added'}))
        .catch(next)
})

router.put('/api/queues/:queueId/queue', (req, res, next) => {
    const queueId = req.params.queueId
    service.removeWaitingTicket(queueId)
        .then(res.json({message: 'Ticket removed'}))
        .catch(next)
})

router.put('/api/queues/:queueid/ticket', (req, res, next) => {
    const queueId = req.params.queueId
    service.removeTicket(queueId)
        .then(res.json({message : 'Ticket removed'}))
        .catch(next)
})