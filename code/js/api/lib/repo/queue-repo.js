'use strict'

const db = require('./queuality-db.js').methods
const error = require('../common/error.js')

const collection = 'queue'

const getQueues = () => db.getAll(collection)

const getQueue = (id) => db.get(collection, id, { projection: { name: 1, subject: 1, priority: 1}})
    .then( result => {
        if(!result) throw error.CustomException('The given queue does not exist', error.NOT_FOUND)
        return result
    })

const getNumberOfTicketsAnswered = (id) => db.get(collection, id,  { projection: { 'queueTicket' : 1 } })
    .then(res => res.queueTicket.nrTicketsAnswered)

const getTotalNumberOfTickets = (id) => db.get(collection, id, { projection: { 'queueTicket' : 1 } })
    .then(res => res.queueTicket.nrTotalTickets)

const insertQueue = (queue) => db.insert(collection, queue)

const updateQueue = (id, priority, subject) => 
    db.update(collection, id, { priority : priority, subject : subject})
        .then(result => {
            if(!result) throw error.CustomException('The given queue does not exist', error.NOT_FOUND)
        })

const updateNumberOfTicketsAnswered = (id) => db.updateInc(collection, id, { $inc : { 'nrTicketsAnswered' : 1 } })

const deleteQueue = (id) => db.del(collection, id)
    .then(result => {
        if(!result) throw error.CustomException('The given queue does not exist', error.NOT_FOUND)
    })

const resetQueueTicket = (id, date) => db.update(collection, id,{queueTicket: {nrTicketsAnswered: 0, nrTotalTickets: 0, date: date}})

const updateTotalNumberOfTickets = (id) => db.updateInc(collection, id, { $inc :{'queueTicket.nrTotalTickets': 1} })

module.exports = {
    getQueues,
    getQueue, 
    getNumberOfTicketsAnswered,
    getTotalNumberOfTickets, 
    insertQueue, 
    updateQueue, 
    updateNumberOfTicketsAnswered,
    deleteQueue,
    resetQueueTicket,
    updateTotalNumberOfTickets
}