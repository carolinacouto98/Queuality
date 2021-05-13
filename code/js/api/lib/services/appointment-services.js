'use strict'
const repo = require('../repo/appointment-repo.js')
const error = require('../common/error.js')
// eslint-disable-next-line no-unused-vars
const model = require('../common/model.js')

/**
 * @returns {Promise<Array<model.Subject>>}
 */
const getSubjectsInfo = () => repo.getSubjectsInfo()

/**
 * @returns {Promise<Array<String>>}
 */
const getSubjects = () => repo.getSubjects()

/**
 * @param {String} subject SubjectInfo name
 * @returns {Promise<String>}
 */
const getDesks = subject => repo.getDesks(subject)


/**
 * @param {String} id SubjectInfo id
 * @returns {Promise<Array<model.Appointment>>}
 */
const getAppointments = (id) => repo.getAppointments(id)


/**
 * 
 * @param {String} _id SubjectInfo id 
 * @param {String} id Appointment id
 * @returns {Promise<model.Appointment>}
 */
const getAppointment = (_id, id) => repo.getAppointment(_id, id)

/**
 * 
 * @param {model.SubjectInputModel} subject
 * @returns {Promise<Void>}
 */
const addSubject = subject => 
    getSubjectsInfo().then(subjects => {
        if (subjects.find(s => s.subject === subject.subject && s.desk === subject.desk)) 
            throw error.CustomException('The given subject is already in the list of subjects', error.ALREADY_EXISTS)
        return repo.insertSubject(subject)
    })


/**
 * @param {String} _id SubjectInfo id
 * @param {Date} date 
 * @returns {Promise<Void>}
 */
const addAppointment = (_id, date) => repo.insertAppointment(_id, date)

/**
 * @param {String} _id SubjectInfo id
 * @param {String} id Appointment id
 * @param {Date} date 
 * @returns {Promise<Void>}
 */
const updateAppointment = (_id, id, date) => repo.updateAppointment(_id, id, date)


/**
 * @param {String} _id SubjectInfo id
 * @param {String} id Appointment id
 * @returns {Promise<Void>}
 */
const removeAppointment = (_id, id) => repo.deleteAppointment(_id, id)

/**
 * @param {String} _id SubjectInfo id
 * @returns {Promise<Void>}
 */
const removeSubject = _id => repo.deleteSubject(_id)

module.exports = {
    getSubjectsInfo,
    getSubjects,
    getDesks,
    getAppointments,
    getAppointment,
    addAppointment,
    addSubject,
    updateAppointment,
    removeAppointment,
    removeSubject 
}