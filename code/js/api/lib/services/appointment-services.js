'use strict'
const repo = require('../repo/appointment-repo.js')
const { getSection } = require('../repo/section-repo.js')
const { getSubjectDesks } = require('../repo/subject-repo.js')
const { Appointment, AppointmentInputModel } = require('../common/model.js') // eslint-disable-line no-unused-vars
const Error = require('../common/error.js')

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
 * @param {AppointmentInputModel} appointment
 * @returns {Promise<Boolean>}
 */
const addAppointment = async appointment => {
    const workingHours = (await getSection(appointment.section)).workingHours
    const len = Math.floor((workingHours.end - workingHours.begin) / workingHours.duration)
    const hoursOfDay = Array.from({length : len}, (_, i) => workingHours.begin + workingHours.duration * i)
    if (!hoursOfDay.includes(appointment.date.getHours() * 60 + appointment.date.getMinutes()))
        throw Error.CustomException(`The hours passed should be one of those: ${hoursOfDay}`, Error.BAD_REQUEST)
    const desks = await getSubjectDesks(appointment.section, appointment.subject)
    const appointments = await repo.getAppointmentsByDate(appointment.section, appointment.subject, appointment.date)
    if (appointments.length === desks.length) return undefined
    const availableDesk = desks.find(desk => !appointments.find(app => app.desk===desk))
    appointment.desk = availableDesk
    return repo.insertAppointment(appointment)
}

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


module.exports = {
    getAppointments,
    getAppointment,
    addAppointment,
    updateAppointment,
    removeAppointment
}