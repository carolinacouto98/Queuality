'use strict'

const db = require('queuality-db.js')(database, 'appointment')

const getAppointments = () => db.getAll()

const getAppointment = (id) => db.get("_id", id, { projection: {subject : 1, date : 1, description : 1 } })
    .then(result => {
        if(!result) throw Error("The given appointment does not exist")
        return result
    })
        
const insertAppointment = (appointment) => db.insert(appointment)

const updateAppointment = (id, date, description) => db.update({_id : id}, {date : date, description : description})
    .then(result => {
        if(!result) throw Error("The given appointment does not exist")
    })

const deleteAppointment = (id) => db.delete(id)
    .then(result => {
        if(!result) throw Error("The given appointment does not exist")
    })
