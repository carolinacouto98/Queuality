'use strict'
const repo = require('../repo/ticket-repo.js')
const queueRepo = require('../repo/queue-repo.js')

const ticketsList = [] 

const getDate = () => new Date().toDateString()

async function resetTicketsInfo(queues, oldDate){   
    await repo.deleteTicketInfo(oldDate)
    await repo.resetTickets(oldDate)
    return queues.map(async queue => await queueRepo.resetQueueTicket(queue._id, getDate()))
}

module.exports = {
    resetTicketsInfo,
    ticketsList,
    getDate
} 