'use strict'
const repo = require('../repo/appointment-repo.js')

const getAppointments = () => repo.getAppointments() 
const getAppointment = (id) => repo.getAppointment(id)
    .catch(err => {
        if (err.message === 'The given appointment does not exist') err.status = 404
        throw err
    })
const addAppointment = (queueId, time, subject, description) => repo.insertAppointment(
    {
        queueId: queueId,
        time: time,
        subject: subject,
        description: description
    }
)
const removeAppointment = (id) => repo.deleteAppointment(id)
    .catch(err => {
        if (err.message === 'The given appointment does not exist') err.status = 404
        throw err
    })
const updateAppointment = (id, date, description) => repo.updateAppointment(id, date, description)
    .catch(err => {
        if (err.message === 'The given appointment does not exist') err.status = 404
        throw err
    })
