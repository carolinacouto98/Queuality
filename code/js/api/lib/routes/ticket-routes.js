'use strict'

const service = require('../repo/services.js')

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
            .then((tickets)=> res.json({"message" : `There are ${tickets} people waiting`}))
            .catch(next)
    }
        
})

router.get('/api/tickets/:queueid', (req, res, next) => {
    const id = req.params.queueid
    service.getTicket(id)
        .then( ticket => res.json(ticket))
        .catch(next)
})

router.post('/api/tickets/:queueid', (req, res, next) => {
    const queueid = req.params.queueid
    service.addWaitingTicket(queueid)
        .then(res.json({"message": "Ticket added"}))
        .catch(next)
})

router.put('/api/tickets/:queueid', (req, res, next) => {
    const queueid = req.params.queueid
    service.removeWaitingTicket(queueid)
        .then(res.json({"message": "Ticket added"}))
        .catch(next)
})

router.delete('/api/tickets/:queueid', (req, res, next) => {
    const queueid = req.params.queueid
    service.removeTicket(queueid)
        .then(res.json({"message" : "Ticket removed"}))
        .catch(next)
})