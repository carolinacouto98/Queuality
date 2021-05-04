'use strict'

const db = require('./queuality-db.js').methods
const error = require('../common/error.js')

const collection = 'queue'

const getQueues = () => db.getAll(collection)

const getQueue = (id) => db.get(collection, id, { projection: { name: 1, description: 1 } })
    .then(result => {
        if(!result) throw error.CustomException('The given queue does not exist', error.NOT_FOUND)
        return result
    })
        
const getTotalNumberOfTickets = (id) => db.get(collection, '_id', id, { projection: { nrTotalTickets : 1 } })

const insertQueue = (queue) => db.insert(collection, queue)

const updateQueue = (id, name, priority, subject) => 
    db.update(collection, id, {name : name, priority : priority, subject : subject})
        .then(result => {
            if(!result) throw error.CustomException('The given queue does not exist', error.NOT_FOUND)
        })

const updateTotalNumberOfTickets = (id) => db.update(collection, id, { $inc : { 'nrTotalTickets' : 1 } })

const decrementTotalNumberOfTickets = (id) => db.update(collection, id, { $inc : { 'nrTotalTickets' : -1 } })

const deleteQueue = (id) => db.del(collection, id)
    .then(result => {
        if(!result) throw error.CustomException('The given queue does not exist', error.NOT_FOUND)
    })

module.exports = {
    getQueues, 
    getQueue, 
    getTotalNumberOfTickets, 
    insertQueue, 
    updateQueue, 
    updateTotalNumberOfTickets,
    decrementTotalNumberOfTickets,
    deleteQueue
}