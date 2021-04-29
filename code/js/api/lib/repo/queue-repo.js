'use strict'

const db = require('./queuality-db.js').methods
const collection = 'queue'

const getQueues = () => db.getAll(collection)

const getQueue = (id) => db.get(collection, id, { projection: { name: 1, description: 1 } })
    .then(result => {
        if(!result) throw Error('The given queue does not exist')
        return result
    })
        
const getTotalNumberOfTickets = (id) => db.get(collection, '_id', id, { projection: { nrTotalTickets : 1 } })

const insertQueue = (queue) => db.insert(collection, queue)

const updateQueue = (id, name, description) => db.update(collection, id, {name : name, description : description})
    .then(result => {
        if(!result) throw Error('The given queue does not exist')
    })

const updateTotalNumberOfTickets = (id) => db.update(collection, id, { $inc : { 'nrTotalTickets' : 1 } })

const decrementTotalNumberOfTickets = (id) => db.update(collection, id, { $inc : { 'nrTotalTickets' : -1 } })

const deleteQueue = (id) => db.del(collection, id)
    .then(result => {
        if(!result) throw Error('The given queue does not exist')
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