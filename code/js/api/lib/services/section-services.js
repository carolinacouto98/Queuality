'use strict'

const repo = require('../repo/section-repo.js')
// eslint-disable-next-line no-unused-vars
const model = require('../common/model.js')


/**
 * @returns {Promise<Array<model.Section>>}
 */
const getSections = () => repo.getSections()

/**
 * @param {String} sectionId 
 * @returns {Promise<model.Section>}
 */
const getSection = (sectionId) => repo.getSection(sectionId)

/**
 * @param {model.SectionInputModel} queue
 * @returns {Promise<Void>}
 */
const addSection = (section) => repo.insertSection(section) 

/**
 * Updates the queue with the given id. Only changes the given properties.
 * @param {model.SectionUpdateInputModel} queue 
 * @returns {Promise<Void>}
 */
const updateSection = (section) => repo.updateSection(section)

/**
 * @param {String} sectionName 
 * @returns {Promise<Void>}
 */
const removeSection = (sectionName) => repo.deleteQueue(sectionName)

module.exports = {
    getSections,
    getSection,
    addSection,
    updateSection,
    removeSection
}