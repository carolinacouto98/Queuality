'use strict'
const repo = require('../repo/ticket-repo.js')
const queueRepo = require('../repo/queue-repo.js')


function addWaittingTicket(queueId) {
    return repo.updateTotalNumberOfTickets(new Date().toLocaleDateString)
            .then(() => queueRepo.updateTotalNumberOfTickets(queueId))
}
function getTicket(queueId) {
    return queueRepo.getTotalNumberOfTickets(queueId)
}
function getTickets() {return repo.getTotalNumberOfTickets(new Date().toLocaleDateString)}
function getTickets(queueId) {return queueRepo.getTotalNumberOfTickets(queueId)}
function getWaittingTickets() {
    return repo.getTotalNumberOfTickets(new Date().toLocaleDateString)
        .then(res => 
            repo
                .getNumberOfTicketsAnswered(new Date().toLocaleDateString())
                .then(result => res - result)
        )
}
function removeTicket(queueId) {}
