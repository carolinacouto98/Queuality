'use strict'

const ObjectId = require('mongodb').ObjectId

const db = require('./queuality-db.js').methods
const Error = require('../common/error.js')
const { Appointment, AppointmentInputModel } = require('../common/model.js')  // eslint-disable-line no-unused-vars

const collection = 'appointment'

/**
 * Gets all the appointments from the database
 * @param {String} section Section name
 * @param {String} desk Desk name
 * @returns {Promise<Array<Appointment>>} 
 */
const getAppointments = (section, desk) => db.getAll(collection, { section, desk }, {})

/**
 * Gets an appointment
 * @param {String} id Appointment id
 * @returns {Promise<Appointment>}
 */
const getAppointment = (id) => db.get(collection, ObjectId(id))
    .then(appointment => {
        if (!appointment)
            throw Error.CustomException(`The appointment with id ${id} does not exist`, Error.NOT_FOUND)
        return appointment
    })

/**
 * Gets all the appointments from the database
 * @param {String} section Section name
 * @param {String} subject Subject name
 * @param {Date} date 
 * @returns {Promise<Array<Appointment>>} 
 */
const getAppointmentsByDate = (section, subject, date) => db.getAll(collection, { section, subject, date }, {})

/**
 * Inserts an appointment into the database
 * @param {AppointmentInputModel} appointment Appointment to be inserted
 * @returns {Promise<Appointment>}
 */
const insertAppointment = (appointment) => db.insert(collection, appointment)

/**
 * Updates an appointment, to be the same as the given, with the same ID has the given appointment
 * @param {Appointment} appointment New Appointment
 * @returns {Promise<Appointment>}
 */
const updateAppointment = (appointment) => getAppointment(appointment._id)
    .then(() => db.update(collection, appointment._id, appointment))

/**
 * Deletes an appointment from the database with the given id
 * @param {String} id Appointment id
 * @returns {Promise<Appointment>}
 */
const deleteAppointment = (id) => getAppointment(id)
    .then(() => db.del(collection, ObjectId(id)))

module.exports = {
    getAppointments,
    getAppointment,
    getAppointmentsByDate,
    insertAppointment,
    updateAppointment,
    deleteAppointment
}