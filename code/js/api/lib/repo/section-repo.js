'use strict'

const db = require('./queuality-db.js').methods
const Error = require('../common/error.js')
const { Section, SectionInputModel, SectionUpdateInputModel } = require('../common/model.js') // eslint-disable-line no-unused-vars

const collection = 'section'

/**
 * Gets an array of all the sections in the database.
 * @returns {Promise<Array<Section>>} Array of Section
 */
const getSections = () => db.getAll(collection)

/**
 * Gets a section from the database by its name.
 * @param {String} id The name of the section
 * @returns {Promise<Section>} Section
 */
const getSection = (id) => db.get(collection, id)
    .then((section) => {
        if (!section)
            throw Error.CustomException(`The section ${id} is not in the database`, Error.NOT_FOUND)
        return section
    })

/**
 * Inserts a new section into the database
 * @param {SectionInputModel} section Section to be inserted
 * @returns {Promise<Section>}
 */
const insertSection = (section) => db.get(collection, section._id)
.then(sect => {
    if (sect) throw Error.CustomException(`The given section is already in the database`, Error.ALREADY_EXISTS)
    return db.insert(collection, employee)
})


/**
 * Updates a section in the database with the same name that is passed in the parameter 
 * @param {SectionUpdateInputModel} section Section to replace the the one with the same name
 * @returns {Promise<Section>}
 */
const updateSection = (section) => getSection(section._id)
    .then(sect => 
        db.update(collection, sect._id, section)
    )

/**
 * Deletes a section given its name 
 * @param {String} id Name of the section to be deleted
 * @returns {Promise<Section>}
 */
const deleteSection = (id) => getSection(id)
    .then(() => db.del(collection, id))

module.exports = {getSections, getSection, insertSection, updateSection, deleteSection}
