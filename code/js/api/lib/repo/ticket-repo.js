'use strict'

const db = require('./queuality-db.js').collection('ticket')


const getTotalNumberOfTickets = (id) => db.get(id, { projection: { 'nrTotalTickets' : 1 } })

const getNumberOfTicketsAnswered = (id) => db.get(id,  { projection: { 'nrTicketsAnswered' : 1 } })

const updateTotalNumberOfTickets = (id) => db.update(id, { $inc : { 'nrTotalTickets' : 1 } })

const updateNumberOfTicketsAnswered = (id) => db.update(id, { $inc : { 'nrTicketsAnswered' : 1 } })

const decrementTotalNumberOfTickets = (id) => db.update(id, { $inc : { 'nrTotalTickets' : -1 } })

module.exports = {
    getTotalNumberOfTickets,
    getNumberOfTicketsAnswered,
    updateTotalNumberOfTickets, 
    updateNumberOfTicketsAnswered,
    decrementTotalNumberOfTickets
}