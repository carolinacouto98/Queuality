'use strict'
const repo = require('../repo/ticket-repo.js')
const queueRepo = require('../repo/queue-repo.js')


const getTicket = (queueId) => queueRepo.getTotalNumberOfTickets(queueId)

const getTickets = (queueId) => {
    if (queueId) return repo.getTotalNumberOfTickets(new Date().toDateString().replace(/\s/g,'').padEnd(12,'-'))
    return queueRepo.getTotalNumberOfTickets(queueId)
}

const getWaitingTickets = () => repo
    .getTotalNumberOfTickets(new Date().toDateString().replace(/\s/g,'').padEnd(12,'-'))
    .then(res => repo
        .getNumberOfTicketsAnswered(new Date().toDateString().replace(/\s/g,'').padEnd(12,'-'))
        .then(result => res - result)
    )

const addWaitingTicket = (queueId) => repo
    .updateTotalNumberOfTickets(new Date().toDateString().replace(/\s/g,'').padEnd(12,'-'))
    .then(() => queueRepo.updateTotalNumberOfTickets(queueId))

const removeTicket = (queueId) => repo
    .decrementTotalNumberOfTickets(new Date().toDateString().replace(/\s/g,'').padEnd(12,'-'))
    .then(() => queueRepo.decrementTotalNumberOfTickets(queueId))


module.exports = {
    getTicket,
    getTickets,
    getWaitingTickets,
    addWaitingTicket,
    removeTicket
}
