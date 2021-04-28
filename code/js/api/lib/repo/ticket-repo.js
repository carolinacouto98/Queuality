'use strict'

const db = require('queuality-db.js')(database, 'ticket')


const getTotalNumberOfTickets = (id) => db.get('_id', id, { projection: { 'nrTotalTickets' : 1 } })

const getNumberOfTicketsAnswered = (id) => db.get('_id', id,  { projection: { 'nrTicketsAnswered' : 1 } })

const updateTotalNumberOfTickets = (id) => db.update({'_id' : id}, { $inc : { 'nrTotalTickets' : 1 } })

const updateNumberOfTicketsAnswered = (id) => db.update({'_id' : id}, { $inc : { 'nrTicketsAnswered' : 1 } })

const decrementTotalNumberOfTickets = (id) => db.update({'_id' : id}, { $inc : { 'nrTotalTickets' : -1 } })

module.exports = {
    getTotalNumberOfTickets,
    getNumberOfTicketsAnswered,
    updateTotalNumberOfTickets, 
    updateNumberOfTicketsAnswered,
    decrementTotalNumberOfTickets
}