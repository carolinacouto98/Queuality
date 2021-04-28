'use strict'

const service = require('../repo/services.js')

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
        .then(res.json({"message" : "Queue added"}))
        .catch(next)
})

router.get('/api/queue/:queueid', (req, res, next) => {
    const id = req.params.queueid
    service.getQueue(id)
        .then(queue => res.json(queue))
        .catch(next)
})

router.put('/api/queue/:queueid', (req, res, next) => {
    const id = req.params.queueid
    const type = req.body.type
    const description = req.body.description
    service.updateQueue(id, type, description)
        .then(res.json({"message" : `Queue with the Id ${id} updated`}))
        .catch(next)
})

router.delete('/api/queue/:queueid', (req, res, next) => {
    const id = req.params.queueid
    service.deleteQueue(id)
        .then(queue => res.json(queue))
        .catch(next)
})

