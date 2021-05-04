'use strict'
const repo = require('../repo/queue-repo.js')
// eslint-disable-next-line no-unused-vars
const model = require('../common/model.js')

/**
 * @returns {Promise<Array<model.Queue>>}
 */
const getQueues = () => repo.getQueues()

/**
 * @param {string} id
 * @returns {Promise<model.Queue>}
 */
const getQueue = (id) => repo.getQueue(id)

/**
 * @param {model.QueueInputModel} queue
 * @returns {Promise<Void>}
 */
const addQueue = (queue) => repo.insertQueue(queue)

const updateQueue = (id, name, description) => repo.updateQueue(id, name, description)

/**
 * @param {string} id 
 * @returns {Promise<Void>}
 */
const removeQueue = (id) => repo.deleteQueue(id)

module.exports = {
    getQueues,
    getQueue,
    addQueue,
    updateQueue,
    removeQueue
}