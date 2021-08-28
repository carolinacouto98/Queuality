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
const getAppointments = (section, subject, desk) => db.getAll(collection, { section, subject, desk }, {})

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
const insertAppointment = (appointment) => getAppointmentsByDate(appointment.section, appointment.subject, appointment.date)
    .then(appointments => {
        if (appointments.find(appoint => appoint.desk === appointment.desk))
            throw Error.CustomException(`The desk ${appointment.desk} already has an appointment at that time`, Error.ALREADY_EXISTS)
        return db.insert(collection, appointment)
    })

/**
 * Updates an appointment, to be the same as the given, with the same ID has the given appointment
 * @param {String} id Appointment id
 * @param {Date} date New Date
 * @returns {Promise<Appointment>}
 */
const updateAppointment = (id, date) => getAppointment(ObjectId(id))
    .then(appointment => {
        appointment.date = date
        return db.update(collection, ObjectId(id), appointment)
    })

/**
 * Deletes an appointment from the database with the given id
 * @param {String} id Appointment id
 * @returns {Promise<Appointment>}
 */
const deleteAppointment = (id) => getAppointment(id)
    .then(appointment => {
        db.del(collection, ObjectId(id))
        return appointment
    })

module.exports = {
    getAppointments,
    getAppointment,
    getAppointmentsByDate,
    insertAppointment,
    updateAppointment,
    deleteAppointment
}