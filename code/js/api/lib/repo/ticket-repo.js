'use strict'

const sectionRepo = require('./section-repo.js')
const subjectRepo = require('./subject-repo.js')
const Error = require('../common/error.js')
const db = require('../repo/queuality-db.js').methods
const collection = 'section'

/**
 * Increments the total number of tickets in the subject
 * @param {String} section Section name
 * @param {String} subject Subject name
 * @returns {Promise<Void>}
 */
const incrementTotalTickets = (section, subject) => subjectRepo.getSubject(section, subject)
    .then(async sub => {
        sub.totalTickets++
        await subjectRepo.updateSubject(section, sub)
        return sub.totalTickets
    })

/**
 * Inserts the given ticket into the waiting queue in the section.
 * Puts it in the beginning of the queue if the priority is true.
 * @param {String} section Section name
 * @param {String} ticket Ticket to be inserted
 * @param {Boolean} priority Priority of the subject
 * @returns {Promise<Void>}
 */
const insertTicket = (section, subject, ticket, priority) => sectionRepo.getSection(section)
    .then(async sect => {
        if (sect.queue.find(t => t === ticket))
            throw Error.CustomException(`The ticket ${ticket} is already in the queue`, Error.ALREADY_EXISTS)
        if (priority) {
            const idx = sect.queue.findIndex(t => !t.includes(subject))
            sect.queue.splice(idx, 0, ticket)
        }
        else sect.queue.push(ticket)
        await sectionRepo.updateSection(sect)
    })

/**
 * Decrements the total number of tickets in the subject
 * @param {String} section Section name
 * @param {String} subject Subject name
 * @returns {Promise<Void>}
 */
const decrementTotalTickets = (section, subject) => subjectRepo.getSubject(section, subject)
    .then(async sub => {
        sub.totalTickets--
        await subjectRepo.updateSubject(section, sub)
      /*  const arr = await subjectRepo.getSubjects(section)
        const idx = arr.findIndex(s => s === sub)
        const object ={}
        object[`subjects.${idx}.totalTickets`] = -1
        await db.updateInc(collection, section, object) */
    })

/**
 * Deletes the given ticket into the waiting queue in the section.
 * @param {String} section Section name
 * @param {String} ticket Ticket to be deleted
 * @returns {Promise<String>}
 */
const deleteTicket = (section, ticket) => sectionRepo.getSection(section)
    .then(async sect => {
        const idx = sect.queue.findIndex(t => t === ticket)
        if (idx < 0)
            throw Error.CustomException(`The ticket ${ticket} does not exists in ${section}`, Error.NOT_FOUND)
        sect.queue.splice(idx, 1)
        await sectionRepo.updateSection(sect)
        return ticket
    })

/**
 * Returns the waiting queue for the given section
 * @param {String} section Section name
 * @returns {Promise<Array<String>>}
 */
const getQueueTickets = (section) => sectionRepo.getSection(section).then(s => s.queue)

/**
 * Removes the first ticket from the waiting queue
 * @param {String} section Section name
 * @returns {Promise<Void>}
 */
const removeTicket = (section) => sectionRepo.getSection(section)
    .then(async sect => {
        const removedTicket = sect.queue.splice(0, 1)
        await sectionRepo.updateSection(sect)
        return removedTicket
    })

/**
 * Increments the current number of tickets answered in the subject
 * @param {String} section Section name
 * @param {String} subject Subject name
 * @returns {Promise<Void>}
 */
const incrementCurrentTicket = (section, subject) => subjectRepo.getSubject(section, subject)
    .then(sub => {
        sub.currentTicket++
        return subjectRepo.updateSubject(section, sub)
    })

const updateCallingDesk = (section, subject, desk) => subjectRepo.getSubject(section, subject)
    .then(sub => {
        sub.callingDesk = desk
        return subjectRepo.updateSubject(section, sub)
    })

module.exports = {
    incrementTotalTickets,
    insertTicket,
    decrementTotalTickets,
    deleteTicket,
    getQueueTickets,
    removeTicket,
    incrementCurrentTicket,
    updateCallingDesk
}