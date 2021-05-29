'use strict'
const repo = require('../repo/ticket-repo.js')
const queueRepo = require('../repo/queue-repo.js')
const common = require('./common.js')

const getDate = () => new Date().toDateString().replace(/\s/g,'').padEnd(12,'-')

/**
 * @returns {Promise<Number>}
 */
const getCurrentQueueTicket = (queueId) => queueRepo.getNumberOfTicketsAnswered(queueId)

/**
 * @param {String} queueName
 * @param {String} queueId
 * @returns {Promise<String>}
 */
const getCurrentTicket = (queueName, queueId) => 
    queueRepo.getTotalNumberOfTickets(queueId)
        .then(nr => queueName+nr)

/**
 * @returns {Promise<Number>}
 */
const getWaitingTickets = () => repo
    .getTotalNumberOfTickets(getDate())
    .then(res => repo
        .getNumberOfTicketsAnswered(getDate())
        .then(result => res - result)
    )

/**
 * @returns {Promise<Void>}
*/
const addWaitingTicket = (queueId) => {
    repo.updateTotalNumberOfTickets(getDate())
        .then(() => queueRepo.updateTotalNumberOfTickets(queueId))
        .then(ticketInfo => {
            if(ticketInfo.priority) {
                const idx = common.ticketsList.findIndex(item => !item.priority)
                common.ticketsList.splice(idx, 0, ticketInfo)
            }
            else common.ticketsList.push(ticketInfo)
            return ticketInfo.ticket
        })
}
/**
 * @returns {Promise<Void>}
 */
const removeTicket = ticket => repo
    .decrementTotalNumberOfTickets(getDate())
    .then(() => {
        const idx = common.ticketsList.findIndex(item => item === ticket)
        common.ticketsList.splice(idx, 1, ticket)
    })
    

module.exports = {
    getCurrentQueueTicket,
    getCurrentTicket,
    getWaitingTickets,
    addWaitingTicket,
    removeTicket
}
