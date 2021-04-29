'use strict'

const db = require('./queuality-db.js').methods
const collection = 'ticket'

const getTotalNumberOfTickets = (id) => db.get(collection, id, { projection: { 'nrTotalTickets' : 1 } })

const getNumberOfTicketsAnswered = (id) => db.get(collection, id,  { projection: { 'nrTicketsAnswered' : 1 } })

const updateTotalNumberOfTickets = (id) => db.update(collection, id, { $inc : { 'nrTotalTickets' : 1 } })

const updateNumberOfTicketsAnswered = (id) => db.update(collection, id, { $inc : { 'nrTicketsAnswered' : 1 } })

const decrementTotalNumberOfTickets = (id) => db.update(collection, id, { $inc : { 'nrTotalTickets' : -1 } })

module.exports = {
    getTotalNumberOfTickets,
    getNumberOfTicketsAnswered,
    updateTotalNumberOfTickets, 
    updateNumberOfTicketsAnswered,
    decrementTotalNumberOfTickets
}