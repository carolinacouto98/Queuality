'use strict'
const repo = require('../repo/ticket-repo.js')
const queueRepo = require('../repo/queue-repo.js')

const ticketsList = [] 

async function resetTicketsInfo(date){
    const currentDate = new Date().toDateString()
    if(date && currentDate !== date) {
        await repo.deleteTicketInfo(date)
        await repo.resetTickets(date)
        await queueRepo.getQueues()
            .then(queues => queues.map(queue => {
                queueRepo.resetQueueTicket(queue._id, currentDate)
            }))
    }
}

module.exports = {
    resetTicketsInfo,
    ticketsList
} 