'use strict'

const db = require('./queuality-db.js').methods
const collection = 'appointment'

const getAppointments = () => db.getAll(collection)

const getAppointment = (id) => db.get(collection, id, { projection: {subject : 1, date : 1, description : 1 } })
    .then(result => {
        if(!result) throw Error('The given appointment does not exist')
        return result
    })
        
const insertAppointment = (appointment) => db.insert(collection, appointment)

const updateAppointment = (id, date, description) => db.update(collection, id, {date : date, description : description})
    .then(result => {
        if(!result) throw Error('The given appointment does not exist')
    })

const deleteAppointment = (id) => db.del(collection, id)
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
