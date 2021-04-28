'use strict'

const db = require('queuality-db.js')(database, 'queue')


const getQueues = () => db.getAll()

const getQueue = (id) => db.get('_id', id, { projection: { name: 1, description: 1 } })
    .then(result => {
        if(!result) throw Error('The given queue does not exist')
        return result
    })
        
const getTotalNumberOfTickets = (id) => db.get('_id', id, { projection: { nrTotalTickets : 1 } })

const insertQueue = (queue) => db.insert(queue)

const updateQueue = (id, name, description) => db.update({_id : id}, {name : name, description : description})
    .then(result => {
        if(!result) throw Error('The given queue does not exist')
    })

const updateTotalNumberOfTickets = (id) => db.update({_id : id}, { $inc : { 'nrTotalTickets' : 1 } })

const decrementTotalNumberOfTickets = (id) => db.update({_id : id}, { $inc : { 'nrTotalTickets' : -1 } })

const deleteQueue = (id) => db.delete(id)
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