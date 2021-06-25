'use strict'
const repo = require('../repo/ticket-repo.js')
const { getSection } = require('./section-services.js')
const { getSubject, updateSubject } = require('./subject-services.js')

const getDate = () => new Date()

/**
 * @param {String} sectionId
 * @param {String} subjectName
 * @returns {Promise<Void>}
 */
const addTicket = (sectionId, subjectId) => 
    getSubject(sectionId, subjectId)
        .then(async subject => {
            if(subject.date !== getDate()) {
                await updateSubject(subject)
            }
            const nrTicket = await repo.incrementTotalTickets(sectionId, subjectId)
            await repo.insertTicket(sectionId, subjectId.concat(nrTicket), subject.priority)
        })

/**
 * 
 * @param {String} sectionId 
 * @param {String} subjectId 
 * @param {String} ticket 
 * @returns {Promise<Void>}
 */
const removeTicket = (sectionId, subjectId, ticket) => {
    const decrementPromise = repo.decrementTotalTickets(sectionId, subjectId)
    const deletePromise = repo.deleteTicket(sectionId, ticket)
    return Promise.all([decrementPromise, deletePromise])
}

/**
 * 
 * @param {String} sectionId 
 * @returns {Promise<Array<model.Ticket>>}
 */
const getQueueTickets = (sectionId) => repo.getQueueTickets(sectionId)

/**
 * 
 * @param {String} sectionId 
 * @param {String} subjectId 
 * @returns {String}
 */
const getNextTicket = (sectionId, subjectId) => {
    const sectionPromise = getSection(sectionId)
        .then(() => repo.removeTicket(sectionId)) //isto aqui é para remover o bilhete que estiver no inicio da lista queue
    const subjectPromise = getSubject(sectionId, subjectId)
        .then(() => repo.incrementCurrentTicket(sectionId, subjectId)) //método que irá incrementar o campo current-ticket do subject
    return Promise.all([sectionPromise, subjectPromise]).then(values => values[0])
}

module.exports = {
    addTicket,
    removeTicket,
    getQueueTickets,
    getNextTicket
}
