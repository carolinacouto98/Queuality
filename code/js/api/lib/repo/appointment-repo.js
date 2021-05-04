'use strict'

const db = require('./queuality-db.js').methods
const error = require('../common/error.js')

const ObjectId = require('mongodb').ObjectId

const collection = 'appointment'

const getSubjectsInfo = () => db.getAll(collection)

const getSubjects = () => db.getAll(collection)
    .then(result => result.map(item => item.subject))

const getDesk = id => db.get(collection, id, { projection: { desk: 1 } })
    .then(result => {
        if (!result) throw error.CustomException('The given getSubjectInfo does not exist', error.NOT_FOUND)
        return result
    })

const getAppointments = (id) => db.get(collection, id)
    .then(result => {
        if (!result) throw error.CustomException('The given getSubjectInfo does not exist', error.NOT_FOUND)
        return result.map(item => item.appointments)
    })

const getAppointment = (_id, id) => getAppointments(_id)
    .then(result => {
        const appointment = result.find(item => item.id === id)
        if(!appointment) throw error.CustomException('The given appointment does not exist', error.NOT_FOUND)
        return appointment
    })

const insertSubject = subject => db.insert(collection, subject)

const insertAppointment = (_id, date) => getAppointments(_id)
    .then(result => {
        let id = ObjectId()
        while (getAppointments(_id).find(item => item.id === id))
            id = ObjectId()
        result[result.length] = {id, date} 
        db.update(collection, _id, {appointments : result})
    })

const updateAppointment = (_id, id, date) => db.getAppointments(_id)
    .then(result => {
        const appointment = result.find(item => item.appointments.id === id)
        if(!appointment) throw error.CustomException('The given appointment does not exist', error.NOT_FOUND)
        else appointment.date = date
    })

const deleteSubject = id => db.del(collection, id)

const deleteAppointment = (_id, id) => db.getAppointments(_id)
    .then(result => {
        const appointment = result.find(item => item.appointments.id === id)
        if(!appointment) throw error.CustomException('The given appointment does not exist', error.NOT_FOUND)
        else {
            result.appointments = result.appointments.filter(item => item.id != id)
        }
    })
    
module.exports = {
    getSubjectsInfo,
    getSubjects,
    getDesk,
    getAppointments, 
    getAppointment,
    insertSubject, 
    insertAppointment, 
    updateAppointment, 
    deleteAppointment,
    deleteSubject
}
