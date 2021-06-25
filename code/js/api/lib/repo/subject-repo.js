'use strict'

const sectionRepo = require('./section-repo.js')
const Error = require('../common/error.js')
const { Subject } = require('../common/model.js') // eslint-disable-line no-unused-vars
/**
 * Gets all subjects from a section.
 * @param {String} section Section name
 * @returns {Array<Subject>} Array of subjects
 */
const getSubjects = (section) => sectionRepo.getSection(section)
    .then(s => s.subjects)

/**
 * Get a subject from a section.
 * @param {String} section Section name
 * @param {String} subject Subject name
 * @returns {Promise<Subject>} Subject
 */
const getSubject = (section, subject) => sectionRepo.getSection(section)
    .then(s => s.subjects.find(sub => sub.name === subject))
    .then(sub => {
        if (!sub)
            throw new Error.CustomException(`The subject ${subject} does not exists`, Error.NOT_FOUND)
        return sub
    })

/**
 * Adds a subject to a section.
 * @param {String} section Section name
 * @param {Subject} subject Subject to be added
 * @returns {Subject} The subject added
 */
const addSubject = (section, subject) => sectionRepo.getSection(section)
    .then(async sect => {
        const subjects = await getSubjects(section)
        if (subjects.findIndex(sub => sub.name === subject.name))
            throw new Error.CustomException(`The subject ${subject.name} is already in the database`, Error.ALREADY_EXISTS)
        sect.subjects.push(subject)
        return subject
    })

/**
 * Updates a subject of a section.
 * @param {String} section Name of the subject section
 * @param {Subject} subject Subject to replace the subject with the same name
 * @returns {Promise<Subject>} The new subject
 */ 
const updateSubject = (section, subject) => sectionRepo.getSection(section)
    .then(async sect => {
        const subjects = await getSubjects(section)
        const idx = subjects.findIndex(sub => sub.name === subject.name)
        if (idx < 0)
            throw new Error.CustomException(`The subject ${subject} is not in the database`, Error.NOT_FOUND)
        sect.subjects[idx] = subject
        const s = await sectionRepo.updateSection(sect)
        return s.subjects[idx]
    })


/**
 * Deletes a subject of a section.
 * @param {String} section Name of the subject section
 * @param {String} subject Name of the subject to be deleted
 * @returns {Promise<Subject>} The deleted Subject
 */ 
const deleteSubject = (section, subject) => sectionRepo.getSection(section)
    .then(async sect => {
        const subjects = await getSubjects(section)
        const idx = subjects.findIndex(sub => sub.name === subject.name)
        if (idx < 0)
            throw new Error.CustomException(`The subject ${subject} is not in the database`, Error.NOT_FOUND)
        const ret = subjects[idx]
        sect.subjects.splice(idx, 1)
        await sectionRepo.updateSection(sect)
        return ret
    })

module.exports = {
    getSubjects,
    getSubject,
    addSubject,
    updateSubject,
    deleteSubject
}