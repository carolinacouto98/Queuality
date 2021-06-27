'use strict'

const repo = require('../repo/section-repo.js')
// eslint-disable-next-line no-unused-vars
const model = require('../common/model.js')


/**
 * @returns {Promise<Array<model.Section>>}
 */
const getSections = () => repo.getSections()
    .then(sections => sections.map(section => {
        const wh = section.workingHours
        section.workingHours.begin = minutesToHours(wh.begin)
        section.workingHours.end = minutesToHours(wh.end)
        return section
    }))

/**
 * @param {String} sectionId 
 * @returns {Promise<model.Section>}
 */
const getSection = (sectionId) => repo.getSection(sectionId)
    .then(section => {
        const wh = section.workingHours
        section.workingHours.begin = minutesToHours(wh.begin)
        section.workingHours.end = minutesToHours(wh.end)
        return section
    })

/**
 * @param {model.SectionInputModel} section
 * @returns {Promise<Void>}
 */
const addSection = (section) => {
    const wh = section.workingHours
    section.workingHours.begin = hoursToMinutes(wh.begin)
    section.workingHours.end = hoursToMinutes(wh.end)
    return repo.insertSection(section)
}

/**
 * Updates the queue with the given id. Only changes the given properties.
 * @param {model.SectionUpdateInputModel} queue 
 * @returns {Promise<Void>}
 */
const updateSection = (section) => {
    if (section.workingHours) {
        const wh = section.workingHours
        section.workingHours.begin = hoursToMinutes(wh.begin)
        section.workingHours.end = hoursToMinutes(wh.end)
    }
    return repo.updateSection(section)
}

/**
 * @param {String} sectionName 
 * @returns {Promise<Void>}
 */
const removeSection = (sectionName) => repo.deleteSection(sectionName)

/**
 * @param {String} hours HH:mm
 * @returns {Number} minutes
 */
const hoursToMinutes = (hours) => {
    const timeParts = hours.split(':')
    return Number(timeParts[0]) * 60 + Number(timeParts[1])
}

/**
 * @param {Number} minutes
 * @returns {String} hour : HH:mm
 */
const minutesToHours = (minutes) => Math.floor(minutes / 60) + ':' + (minutes % 60)

module.exports = {
    getSections,
    getSection,
    addSection,
    updateSection,
    removeSection
}