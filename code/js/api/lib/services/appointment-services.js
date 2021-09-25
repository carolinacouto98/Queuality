'use strict'
const repo = require('../repo/appointment-repo.js')
const { getSection } = require('../repo/section-repo.js')
const { getSubjectDesks } = require('../repo/subject-repo.js')
const { Appointment, AppointmentInputModel } = require('../common/model.js') // eslint-disable-line no-unused-vars
const Error = require('../common/error.js')



/**
 * @param {String} sectionId Section id
 * @param {String} subject Subject
 * @param {String} day Day
 * @returns {Promise<Array<String>>}
 */

 const getAvailableHoursByDay = async (sectionId, subject, day) => {
    const workingHours = (await getSection(sectionId)).workingHours
    const len = Math.floor((workingHours.end - workingHours.begin) / workingHours.duration)
    const hoursOfDay = Array.from({length : len}, (_, i) => workingHours.begin + workingHours.duration * i)
    const desks = await getSubjectDesks(sectionId, subject)
    return hoursOfDay
        .filter(async hour => (await repo.getAppointmentsByDate(sectionId, subject, new Date(day + hour) !== desks.length)))
        .map(minutes => Math.floor(minutes / 60) + ':' + ((minutes % 60)== 0?'0'+(minutes % 60):(minutes % 60)))
}

const getNextDayAvailable = async (sectionId, subject) => {

    let now = new Date()
    let daysOfYear = []
    for (let d = now; d <= new Date(now.getFullYear(), 11, 31); d.setDate(d.getDate() + 1)) {
        daysOfYear.push(new Date(d))
    }
    return daysOfYear.find(async day => (await getAvailableHoursByDay(sectionId, subject, day).length > 0))       
}

/**
 * @param {String} sectionId Section id
 * @param {ObjectId} deskId Desk Id
 * @returns {Promise<Array<model.Appointment>>}
 */
const getAppointments = (sectionId, subject, deskId) => 
    repo.getAppointments(sectionId, subject, deskId) //vai buscar os appointments que estão na secção e deskId do funcionário


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
 * @returns {Promise<Appointment>}
 */
const updateAppointment = (id, date) => repo.updateAppointment(id, date)


/**
 * @param {String} appointmentId Appointment id
 * @returns {Promise<Appointment>}
 */
const removeAppointment = (appointmentId) => repo.deleteAppointment(appointmentId)


module.exports = {
    getAppointments,
    getAvailableHoursByDay,
    getNextDayAvailable,
    getAppointment,
    addAppointment,
    updateAppointment,
    removeAppointment
}