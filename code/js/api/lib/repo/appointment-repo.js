'use strict'

const ObjectId = require('mongodb').ObjectId

const db = require('./queuality-db.js').methods
const error = require('../common/error.js')

const collection = 'appointment'

const getSubjectsInfo = () => db.getAll(collection)

const getSubjects = () => db.getAll(collection)
    .then(result => result.map(item => item.subject))

const getDesks = subject => db.getAll(collection, {subject: subject}, { projection: { desk: 1 } })
    .then(result => {
        if (!result) throw error.CustomException('The given getSubjectInfo does not exist', error.NOT_FOUND)
        return result
    })

const getAppointments = (id) => db.get(collection, ObjectId(id))
    .then(result => {
        if (!result) throw error.CustomException('The given getSubjectInfo does not exist', error.NOT_FOUND)
        return result.appointments
    })

const getAppointment = (_id, id) => getAppointments(_id)
    .then(result => {
        const appointment = result.find(item => item.id.id.toString() === id)
        if(!appointment) throw error.CustomException('The given appointment does not exist', error.NOT_FOUND)
        return appointment
    })

const insertSubject = subject => db.insert(collection, subject)

const insertAppointment = (_id, date) => getAppointments(_id)
    .then(async result => {
        let id = ObjectId()
        while ((await getAppointments(_id)).find(item => item.id === id))
            id = ObjectId()
        result[result.length] = {id, date} 
        db.update(collection, _id, {appointments : result})
    })

const updateAppointment = (_id, id, date) => getAppointments(_id)
    .then(result => {
        const appointment = result.find(item => item.id.id.toString() === id)
        if(!appointment) throw error.CustomException('The given appointment does not exist', error.NOT_FOUND)
        appointment.date = date
        db.update(collection, _id, {appointments: result})
    })

const deleteSubject = id => db.del(collection, id)

const deleteAppointment = (_id, id) => getAppointments(_id)
    .then(result => {
        const appointment = result.find(item => item.id.id.toString() === id)
        if(!appointment) throw error.CustomException('The given appointment does not exist', error.NOT_FOUND)
        result = result.filter(item => item.id != id)
        db.update(collection, _id, {appointments: result})
    })
    
module.exports = {
    getSubjectsInfo,
    getSubjects,
    getDesks,
    getAppointments, 
    getAppointment,
    insertSubject, 
    insertAppointment, 
    updateAppointment, 
    deleteAppointment,
    deleteSubject
}
