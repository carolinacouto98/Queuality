'use strict'
const Joi = require('joi')

/**
 * @typedef {Object} Employee
 * @property {String} _id
 * @property {String} name
 * @property {String} password
 * @property {Array<String>} roles
 */

const Employee = Joi.object({
    _id : Joi.string().required(),
    name : Joi.string().required(),
    password : Joi.string().required(),
    roles : Joi.array().items(Joi.string()).default([])
})

/**
 * @typedef {Object} EmployeeInputModel
 * @property {String} name
 * @property {String} password
 * @property {Array<String>} roles
 */

const EmployeeInputModel = Joi.object({
    name : Joi.string().required(),
    password : Joi.string().required(),
    roles : Joi.array().items(Joi.string()).default([])
})

/**
 * @typedef {Object} Queue
 * @property {String} _id
 * @property {String} name
 * @property {Boolean} priority
 * @property {String} subject
 * @property {Number} tickets
 * @property {Number} waitingTickets
 */

const Queue = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    priority: Joi.boolean().default(false),
    subject: Joi.string().required(),
    tickets: Joi.number().default(0),
    waitingTickets: Joi.number().default(0)
})

/**
 * @typedef {Object} QueueInputModel
 * @property {String} name
 * @property {Boolean} priority
 * @property {String} subject
 */

const QueueInputModel = Joi.object({
    name: Joi.string().required(),
    priority: Joi.boolean().default(false),
    subject: Joi.string().required(),
    tickets: Joi.number().default(0),
    waitingTickets: Joi.number().default(0)
})

/**
 * @typedef {Object} Appointment
 * @property {String} id
 * @property {Date} date
 */
/**
 * @typedef {Object} Desk
 * @property {String} _id
 * @property {String} desk
 * @property {String} subject
 * @property {String} duration in form of hh:mm:ss
 * @property {Array<Appointment>} appointments
 */

const Desk = Joi.object({
    _id: Joi.string().required(),
    desk: Joi.string().required(),
    subject: Joi.string().required(),
    duration: Joi.string().required(),
    appointments: Joi.array().items({
        id: Joi.string().required(),
        date: Joi.date().required()
    }).default([])
})

/**
 * @typedef {Object} AppointmentInputModel
 * @property {Date} date
 */

const AppointmentInputModel = Joi.object({
    date: Joi.date().required()
})

/**
 * @typedef {Object} DeskInputModel
 * @property {String} desk
 * @property {String} subject
 * @property {String} duration in form of hh:mm:ss
 */

const DeskInputModel = Joi.object({
    desk: Joi.string().required(),
    subject: Joi.string().required(),
    duration: Joi.string().required()
})

const id = Joi.string().required()

module.exports = { 
    Employee, 
    EmployeeInputModel, 
    Queue, 
    QueueInputModel, 
    Desk,
    DeskInputModel,
    AppointmentInputModel,
    id 
}