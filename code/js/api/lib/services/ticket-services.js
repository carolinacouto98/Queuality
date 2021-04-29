'use strict'
const repo = require('../repo/ticket-repo.js')
const queueRepo = require('../repo/queue-repo.js')


function getTicket(queueId) {
    return queueRepo.getTotalNumberOfTickets(queueId)
}
function getTickets(queueId) {
    if (queueId) return repo.getTotalNumberOfTickets(new Date().toLocaleDateString)
    return queueRepo.getTotalNumberOfTickets(queueId)
}

function getWaitingTickets() {
    return repo.getTotalNumberOfTickets(new Date().toLocaleDateString)
        .then(res => 
            repo
                .getNumberOfTicketsAnswered(new Date().toLocaleDateString())
                .then(result => res - result)
        )
}

function addWaitingTicket(queueId) {
    return repo.updateTotalNumberOfTickets(new Date().toLocaleDateString)
        .then(() => queueRepo.updateTotalNumberOfTickets(queueId))
}
function removeTicket(queueId) {
    return repo.decrementTotalNumberOfTickets(new Date().toLocaleDateString)
        .then(() => queueRepo.decrementTotalNumberOfTickets(queueId))
}

module.exports = {
    getTicket,
    getTickets,
    getWaitingTickets,
    addWaitingTicket,
    removeTicket
}
