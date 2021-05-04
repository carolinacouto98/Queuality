'use strict'
const repo = require('../repo/appointment-repo.js')

const getAppointments = () => repo.getAppointments() 

const getAppointment = (id) => repo.getAppointment(id)

const addAppointment = (queueId, time, subject, description) => repo.insertAppointment(
    {
        queueId : queueId,
        time: time,
        subject: subject,
        description: description
    }
)

const updateAppointment = (id, date, description) => repo.updateAppointment(id, date, description)

const removeAppointment = (id) => repo.deleteAppointment(id)

module.exports = {
    getAppointments,
    getAppointment,
    addAppointment,
    updateAppointment,
    removeAppointment    
}