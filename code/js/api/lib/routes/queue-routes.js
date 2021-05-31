'use strict'

const service = require('../services/queue-services.js')
const model = require('../common/model.js')
const siren = require('../common/siren.js')
const queueSiren = require('./siren/queue-siren.js')
const ticketSiren = require('./siren/ticket-siren.js')
const tickets = require('../services/common.js').ticketsList


const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/api/queues', (req, res, next) => {
    service.getQueues()
        .then(queues => 
            res.send(
                siren.toSirenObject(
                    'Queues', 
                    JSON.stringify(queues), 
                    JSON.stringify(queueSiren.setSubEntities(queues)),
                    JSON.stringify(queueSiren.getQueuesLinks),
                    JSON.stringify([queueSiren.addQueueAction()])
                )
            )
        )
        .catch(next)
})

router.post('/api/queues', (req, res, next) => {
    const name = req.body.name
    const priority = req.body.priority
    const subject = req.body.subject
    model.QueueInputModel.validateAsync({ name, priority, subject})
        .then(queue => 
            service.addQueue(queue)
                .then(queue => res.status(201).send(
                    siren.toSirenObject(
                        'Queue', 
                        JSON.stringify(queue), 
                        '',
                        JSON.stringify(queueSiren.addQueueLinks),
                        ''
                    )
                ))  
        )
        .catch(next)
})

/*router.get('/api/queues/:queueId', (req, res, next) => {
    const id = req.params.queueId
    model.id.validateAsync(id)
        .then(id =>
            service.getQueue(id)
                .then(queue => res.json(queue))
        )
        .catch(next)
})*/

router.patch('/api/queues/:queueId', (req, res, next) => {
    const _id = req.params.queueId
    const priority = req.body.priority
    const subject = req.body.subject
    model.QueueUpdateInputModel.validateAsync({_id, priority, subject})
        .then(queue => 
            service.updateQueue(queue)
                .then(queue => res.send(
                    siren.toSirenObject(
                        'Queue', 
                        JSON.stringify(queue), 
                        '',
                        JSON.stringify(queueSiren.updateQueueLinks),
                        ''
                    )
                ))
                .catch(next)
        )})

router.delete('/api/queues/:queueId', (req, res, next) => {
    const id = req.params.queueId
    service.removeQueue(id)
        .then(() => res.send(
            siren.toSirenObject(
                'Queue', 
                '{}', 
                '',
                JSON.stringify(queueSiren.deleteQueueLinks),
                ''
            )
        ))
        .catch(next)
})

router.put('/api/queues/:queueId/current-ticket', (req, res, next) => {
    const queueId = req.params.queueId
    service.updateNumberOfTicketsAnswered(queueId)
        .then(() => { 
            tickets.shift()
            res.send(
                siren.toSirenObject(
                    'Current Ticket',
                    JSON.stringify(tickets),
                    '',
                    JSON.stringify(ticketSiren.updateAnsweredTicketsLinks(queueId)),
                    ''
                )
            )})
        .catch(next)
})

