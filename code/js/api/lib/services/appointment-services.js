'use strict'
const repo = require('../repo/appointment-repo.js')
const { getSection } = require('../repo/section-repo.js')
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
 * @param {String} id Appointment id
 * @param {Date} date 
 * @returns {Promise<Void>}
 */
const updateAppointment = (id, date) => repo.updateAppointment(id, date)


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
const getAvailableHours = async (sectionId, subjectId, date) => {
    const workingHours = (await getSection(sectionId)).workingHours
    const len = Math.floor((workingHours.end - workingHours.begin) / workingHours.duration)
    const hoursOfDay = Array.from({length : len}, (_, i) => workingHours.begin + workingHours.duration * i)
    const appointments = await repo.getAppointments(sectionId, subjectId)
    
}


module.exports = {
    getAppointments,
    getAppointment,
    addAppointment,
    updateAppointment,
    removeAppointment,
    getAvailableHours
}