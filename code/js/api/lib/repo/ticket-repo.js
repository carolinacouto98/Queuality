'use strict'

const db = require('./queuality-db.js').methods
const collection = 'ticket'

const getTotalNumberOfTickets = (id) => db.get(collection, id, { projection: { 'nrTotalTickets' : 1 } })

const getNumberOfTicketsAnswered = (id) => db.get(collection, id,  { projection: { 'nrTicketsAnswered' : 1 } })

const updateTotalNumberOfTickets = (id) => db.updateInc(collection, id, { $inc : { 'nrTotalTickets' : 1 } })

const updateNumberOfTicketsAnswered = (id) => db.updateInc(collection, id, { $inc : { 'nrTicketsAnswered' : 1 } })

const decrementTotalNumberOfTickets = (id) => db.updateInc(collection, id, { $inc : { 'nrTotalTickets' : -1 } })

const deleteTicketInfo = (id) => db.del(collection, id)

const resetTickets = (id) => db.update(collection, id,{nrTicketsAnswered: 0, nrTotalTickets: 0})

const getDate = () => db.getAll(collection)
    .then(tickets => {
        if(tickets)
            return tickets[0]
    })
    .then(ticket => {
        if(ticket)
            return ticket._id
    })
module.exports = {
    getDate,
    getTotalNumberOfTickets,
    getNumberOfTicketsAnswered,
    updateTotalNumberOfTickets, 
    updateNumberOfTicketsAnswered,
    decrementTotalNumberOfTickets,
    deleteTicketInfo,
    resetTickets
}