'use strict'
const repo = require('../repo/ticket-repo.js')
const queueRepo = require('../repo/queue-repo.js')

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
    .getTotalNumberOfTickets(new Date().toDateString().replace(/\s/g,'').padEnd(12,'-'))
    .then(res => repo
        .getNumberOfTicketsAnswered(new Date().toDateString().replace(/\s/g,'').padEnd(12,'-'))
        .then(result => res - result - 1)
    )

/**
 * @returns {Promise<Void>}
*/
const addWaitingTicket = (queueId) => 
repo.getDate()
.then(date => {
    if(date)
        checkDayChanged(date)
    return repo.updateTotalNumberOfTickets(new Date().toDateString().replace(/\s/g,'').padEnd(12,'-'))
    .then(() => queueRepo.updateTotalNumberOfTickets(queueId))
})
/**
 * @returns {Promise<Void>}
 */
const removeTicket = () => repo
    .decrementTotalNumberOfTickets(new Date().toDateString().replace(/\s/g,'').padEnd(12,'-'))
/**
 * @param {String} queueId
 * @returns {Promise<Void>}
 */
const updateNumberOfTicketsAnswered = (queueId) => 
    repo.getDate()
        .then(date => {
            if(date)
                checkDayChanged(date)
            return repo.updateNumberOfTicketsAnswered(new Date().toDateString().replace(/\s/g,'').padEnd(12,'-'))
                .then(() => queueRepo.updateNumberOfTicketsAnswered(queueId))
        })
    
function checkDayChanged(date){
    const currentDate = new Date().toDateString().replace(/\s/g,'').padEnd(12,'-')
    if(currentDate!==date) {
        repo.deleteTicketInfo(date)
        repo.resetTickets(date)
        queueRepo.getQueues()
            .then(queues => queues.map(queue => {
                queueRepo.resetQueueTicket(queue._id, currentDate)
            }))
    }
}
module.exports = {
    getCurrentQueueTicket,
    getCurrentTicket,
    getWaitingTickets,
    addWaitingTicket,
    removeTicket,
    updateNumberOfTicketsAnswered
}
