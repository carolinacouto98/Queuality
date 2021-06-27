'use strict'

const db = require('./queuality-db.js').methods
const Error = require('../common/error.js')
const { Section } = require('../common/model.js') // eslint-disable-line no-unused-vars

const collection = 'section'

/**
 * Gets an array of all the sections in the database.
 * @returns {Promise<Array<Section>>} Array of Section
 */
const getSections = () => db.getAll(collection)

/**
 * Gets a section from the database by its name.
 * @param {String} name The name of the section
 * @returns {Promise<Section>} Section
 */
const getSection = (name) => db.getByProperties(collection, {_id: name})
    .then((section) => {
        if (!section)
            throw Error.CustomException(`The section ${name} is not in the database`, Error.NOT_FOUND)
        return section
    })

/**
 * Inserts a new section into the database
 * @param {Section} section Section to be inserted
 * @returns {Promise<Section>}
 */
const insertSection = (section) => db.insert(collection, section)

/**
 * Updates a section in the database with the same name that is passed in the parameter 
 * @param {Section} section Section to replace the the one with the same name
 * @returns {Promise<Section>}
 */
const updateSection = (section) => getSection(section._id)
    .then(() => db.update(collection, section._id, section))

/**
 * Deletes a section given its name 
 * @param {String} name Name of the section to be deleted
 * @returns {Promise<Section>}
 */
const deleteSection = (name) => getSection(name)
    .then(() => db.del(collection, name))

module.exports = {getSections, getSection, insertSection, updateSection, deleteSection}
