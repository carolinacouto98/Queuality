'use strict'

const db = require('./queuality-db.js').methods
const error = require('../common/error.js')

const collection = 'queue'

const getQueues = () => db.getAll(collection)
        
const getNumberOfTicketsAnswered = (id) => db.get(collection, id,  { projection: { 'nrTicketsAnswered' : 1 } })

const getTotalNumberOfTickets = (id) => db.get(collection, '_id', id, { projection: { nrTotalTickets : 1 } })

const insertQueue = (queue) => db.insert(collection, queue)

const updateQueue = (id, name, priority, subject) => 
    db.update(collection, id, {name : name, priority : priority, subject : subject})
        .then(result => {
            if(!result) throw error.CustomException('The given queue does not exist', error.NOT_FOUND)
        })

const updateNumberOfTicketsAnswered = (id) => db.update(collection, id, { $inc : { 'nrTicketsAnswered' : 1 } })

const deleteQueue = (id) => db.del(collection, id)
    .then(result => {
        if(!result) throw error.CustomException('The given queue does not exist', error.NOT_FOUND)
    })

const resetQueueTicket = (id, date) => db.update(collection, id,{nrTicketsAnswered: 0, nrTotalTickets: 0, date: date})

module.exports = {
    getQueues, 
    getNumberOfTicketsAnswered,
    getTotalNumberOfTickets, 
    insertQueue, 
    updateQueue, 
    updateNumberOfTicketsAnswered,
    deleteQueue,
    resetQueueTicket
}