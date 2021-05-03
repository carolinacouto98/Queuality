'use strict'

const db = require('./queuality-db.js').methods
const collection = 'appointment'

const getSubjectsInfo = () => db.getAll(collection)

const getSubjects = () => db.getAll(collection)
    .then(result => result.map(item => item.subject))

const getDesk = id => db.get(collection, id, { projection: { desk: 1 } })

const getAppointments = (id) => db.get(collection, id)
    .then(result => result.map(item => item.appointments))

const getAppointment = (_id, id) => db.getAppointments(_id)
    .then(result => {
        const appointment = result.find(item => item.id === id)
        if(!appointment) 
            throw Error('The given appointment does not exist')
        return appointment
    })

const insertSubject = subject => db.insert(collection, subject)

const insertAppointment = (_id, id, appointment) => getAppointments(_id)
    .then(result => {
        result[result.length] = appointment 
        db.update(collection, id, {appointments : result})
    })

const updateAppointment = (_id, id, date) => db.getAppointments(_id)
    .then(result => {
        const appointment = result.find(item => item.appointments.id === id)
        if(!appointment) throw Error('The given appointment does not exist')
        else appointment.date = date
    })

const deleteSubject = id => db.del(collection, id)

const deleteAppointment = (_id, id) => db.getAppointments(_id)
    .then(result => {
        const appointment = result.find(item => item.appointments.id === id)
        if(!appointment) throw Error('The given appointment does not exist')
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
