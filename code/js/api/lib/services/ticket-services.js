'use strict'
const repo = require('../repo/ticket-repo.js')
const queueRepo = require('../repo/queue-repo.js')


function getTicket(queueId) {
    return queueRepo.getTotalNumberOfTickets(queueId)
}
function getTickets(queueId) {
    if (queueId) return repo.getTotalNumberOfTickets(new Date().toDateString().replace(/\s/g,'').padEnd(12,'j'))
    return queueRepo.getTotalNumberOfTickets(queueId)
}

function getWaitingTickets() {
    return repo.getTotalNumberOfTickets(new Date().toDateString().replace(/\s/g,'').padEnd(12,'j'))
        .then(res =>
            repo
                .getNumberOfTicketsAnswered(new Date().toDateString().replace(/\s/g,'').padEnd(12,'j'))
                .then(result => res - result)
        )
}

function addWaitingTicket(queueId) {
    return repo.updateTotalNumberOfTickets(new Date().toDateString().replace(/\s/g,'').padEnd(12,'j'))
        .then(() => queueRepo.updateTotalNumberOfTickets(queueId))
}
function removeTicket(queueId) {
    return repo.decrementTotalNumberOfTickets(new Date().toDateString().replace(/\s/g,'').padEnd(12,'j'))
        .then(() => queueRepo.decrementTotalNumberOfTickets(queueId))
}

module.exports = {
    getTicket,
    getTickets,
    getWaitingTickets,
    addWaitingTicket,
    removeTicket
}
