'use strict'
const repo = require('../repo/appointment-repo.js')
// eslint-disable-next-line no-unused-vars
const model = require('../common/model.js')

/**
 * @param {String} sectionId Section id
 * @param {ObjectId} deskId Desk Id
 * @returns {Promise<Array<model.Appointment>>}
 */
const getAppointments = (sectionId, deskId) => 
    repo.getAppointments(sectionId, deskId) //vai buscar os appointments que estão na secção e deskId do funcionário


/**
 * 
 * @param {String} appointmentId Appointment id
 * @returns {Promise<model.Appointment>}
 */
const getAppointment = (appointmentId) => repo.getAppointment(appointmentId) //vai buscar um appointment que tenha o id passado

/**
 * 
 * @param {model.AppointmentInputModel} appointment
 * @returns {Promise<Void>}
 */
const addAppointment = appointment => 
    repo.insertAppointment(appointment)

/**
 * @param {String} _id SubjectInfo id
 * @param {String} id Appointment id
 * @param {Date} date 
 * @returns {Promise<Void>}
 */
const updateAppointment = (_id, id, date) => repo.updateAppointment(_id, id, date)


/**
 * @param {String} appointmentId Appointment id
 * @returns {Promise<Void>}
 */
const removeAppointment = (appointmentId) => repo.deleteAppointment(appointmentId)

/**
 * 
 * @param {String} subjectId 
 * @param {Date} date 
 * @returns {Promise<model.AvailableHoursOutputModel>}
 */
const getAvailableHours = (subjectId, date) => 
    repo.getAvailableHours(subjectId, date)


module.exports = {
    getAppointments,
    getAppointment,
    addAppointment,
    updateAppointment,
    removeAppointment,
    getAvailableHours
}