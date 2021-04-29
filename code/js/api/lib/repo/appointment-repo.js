'use strict'

const db = require('./queuality-db.js').collection('appointment')

const getAppointments = () => db.getAll()

const getAppointment = (id) => db.get(id, { projection: {subject : 1, date : 1, description : 1 } })
    .then(result => {
        if(!result) throw Error('The given appointment does not exist')
        return result
    })
        
const insertAppointment = (appointment) => db.insert(appointment)

const updateAppointment = (id, date, description) => db.update(id, {date : date, description : description})
    .then(result => {
        if(!result) throw Error('The given appointment does not exist')
    })

const deleteAppointment = (id) => db.del(id)
    .then(result => {
        if(!result) throw Error('The given appointment does not exist')
    })

module.exports = {
    getAppointments, 
    getAppointment, 
    insertAppointment, 
    updateAppointment, 
    deleteAppointment
}
