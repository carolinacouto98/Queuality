'use strict'

const service = require('../services/queue-services.js')

const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/api/queues', (req, res, next) => {
    service.getQueues()
        .then(queues => res.json(queues))
        .catch(next)
})

router.put('/api/queues', (req, res, next) => {
    const name = req.body.name
    const type = req.body.type
    const description = req.body.description
    service.addQueue(name, type, description)
        .then(res.json({message : 'Queue added'}))
        .catch(next)
})

router.get('/api/queues/:queueId', (req, res, next) => {
    const id = req.params.queueId
    service.getQueue(id)
        .then(queue => res.json(queue))
        .catch(next)
})

router.put('/api/queues/:queueId', (req, res, next) => {
    const id = req.params.queueId
    const type = req.body.type
    const description = req.body.description
    service.updateQueue(id, type, description)
        .then(res.json({message : `Queue with the Id ${id} updated`}))
        .catch(next)
})

router.delete('/api/queues/:queueId', (req, res, next) => {
    const id = req.params.queueId
    service.deleteQueue(id)
        .then(res.json({message : `Queue with the Id ${id} deleted`}))
        .catch(next)
})
