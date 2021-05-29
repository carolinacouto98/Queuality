'use strict'
const repo = require('../repo/queue-repo.js')
const ticketRepo = require('../repo/ticket-repo.js')
const error = require('../common/error.js')
const common = require('./common')
// eslint-disable-next-line no-unused-vars
const model = require('../common/model.js')


/**
 * @returns {Promise<Array<model.Queue>>}
 */
const getQueues = () => repo.getQueues()
    .then(async queues => {
        await common.resetTicketsInfo(queues[0]?.queueTicket.date)
        return queues
    })

/**
 * @param {string} id
 * @returns {Promise<model.Queue>}
 */
const getQueue = (id) => repo.getQueue(id)

/**
 * @param {model.QueueInputModel} queue
 * @returns {Promise<Void>}
 */
const addQueue = (queue) => 
    getQueues().then(queues => {
        if (queue.priority && queues.find(q => q.priority)) throw error.CustomException('Cannot have more than one priority queue', error.ALREADY_EXISTS)
        return repo.insertQueue(queue)
    })
    


/**
 * Updates the queue with the given id. Only changes the given properties.
 * @param {model.QueueUpdateInputModel} queue 
 * @returns {Promise<Void>}
 */
const updateQueue = (queue) => 
    getQueues().then(queues => 
        getQueue(queue._id).then(q => {
            if (queue.priority === undefined) queue.priority = q.priority
            if (!queue.subject) queue.subject = q.subject
            if (queue.priority && !q.priority && queues.find(qs =>qs.priority)) 
                throw error.CustomException('Cannot have more than one priority queue', error.ALREADY_EXISTS)
            return repo.updateQueue(queue._id, queue.priority, queue.subject)
        })
    )
/**
 * @param {String} id 
 * @returns {Promise<Void>}
 */
const removeQueue = (id) => repo.deleteQueue(id)

/**
 * @param {String} queueId
 * @returns {Promise<Void>}
 */
const updateNumberOfTicketsAnswered = queueId => 
    getQueue(queueId)
        .then(queue => ticketRepo.updateNumberOfTicketsAnswered(queue.queueTicket.date))
        .then(() => repo.updateNumberOfTicketsAnswered(queueId))
    

module.exports = {
    getQueues,
    getQueue,
    addQueue,
    updateQueue,
    removeQueue,
    updateNumberOfTicketsAnswered
}