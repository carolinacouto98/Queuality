'use strict'
const repo = require('../repo/ticket-repo.js')
const queueRepo = require('../repo/queue-repo.js')
const common = require('./common.js')

/**
 * @returns {Promise<Array>}
 */
const getTicketsList = () => Promise.resolve(common.ticketsList)

/**
 * @returns {Promise<Number>}
 */
const getCurrentQueueTicket = (queueId) => queueRepo.getNumberOfTicketsAnswered(queueId)

/**
 * @param {String} queueName
 * @param {String} queueId
 * @returns {Promise<String>}
 */
const getCurrentTicket = (queueId) => 
    queueRepo.getTotalNumberOfTickets(queueId)
        .then(nr => queueId+nr)

/**
 * @returns {Promise<Number>}
 */
const getWaitingTickets = () => Promise.resolve(common.ticketsList.length)

/**
 * @returns {Promise<Void>}
*/
const addWaitingTicket = queueId => repo.updateTotalNumberOfTickets(common.getDate())
    .then(() => queueRepo.updateTotalNumberOfTickets(queueId))
    .then(ticketInfo => {
        if(ticketInfo.priority) {
            const idx = common.ticketsList.findIndex(item => !item.priority)
            common.ticketsList.splice(idx, 0, ticketInfo)
        }
        else common.ticketsList.push(ticketInfo)
        return ticketInfo.ticketNumber
    })

/**
 * @returns {Promise<Void>}
 */
const removeTicket = ticket => repo
    .decrementTotalNumberOfTickets(common.getDate())
    .then(() => {
        const idx = common.ticketsList.findIndex(item => item.ticketNumber === ticket)
        common.ticketsList.splice(idx, 1)
    })
    

module.exports = {
    getCurrentQueueTicket,
    getCurrentTicket,
    getWaitingTickets,
    addWaitingTicket,
    removeTicket,
    getTicketsList
}
