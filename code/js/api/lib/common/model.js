'use strict'
const Joi = require('joi')

/**
 * @typedef {Object} Employee
 * @property {String} _id
 * @property {String} name
 * @property {Array<String>} roles
 */

const Employee = Joi.object({
    _id : Joi.string().required(),
    name : Joi.string().required(),
    roles : Joi.array().items(Joi.string()).default([])
})

/**
 * @typedef {Object} EmployeeInputModel
 * @property {String} name
 * @property {Array<String>} roles
 */

const EmployeeInputModel = Joi.object({
    name : Joi.string().required(),
    roles : Joi.array().items(Joi.string()).default([])
})

/**
 * @typedef {Object} Ticket
 * @property {Number} nrTotalTickets
 * @property {Number} nrTicketsAnswered
 * @property {Date} date
 */

const Ticket = Joi.object(
    {
        nrTotalTickets: Joi.number().default(0),
        nrTicketsAnswered: Joi.number().default(0),
        date: Joi.date().required()
    }
)
/**
 * @typedef {Object} Queue
 * @property {String} _id
 * @property {String} name
 * @property {Boolean} priority
 * @property {String} subject
 * @property {Ticket} queueTicket
 * 
 */

const Queue = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    priority: Joi.boolean().default(false),
    subject: Joi.string().required(),
    queueTicket: Ticket.required()
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
    subject: Joi.string().required()
})

/**
 * @typedef {Object} QueueUpdateInputModel
 * @property {String} _id
 * @property {String} name
 * @property {Boolean} priority
 * @property {String} subject
 */

const QueueUpdateInputModel = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string(),
    priority: Joi.boolean(),
    subject: Joi.string()
})

/**
 * @typedef {Object} Appointment
 * @property {String} id
 * @property {Date} date
 */
/**
 * @typedef {Object} Subject
 * @property {String} _id
 * @property {String} desk
 * @property {String} subject
 * @property {String} duration in form of hh:mm:ss
 * @property {Array<Appointment>} appointments
 */

const Subject = Joi.object({
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
 * @typedef {Object} SubjectInputModel
 * @property {String} desk
 * @property {String} subject
 * @property {String} duration in form of hh:mm:ss
 */

const SubjectInputModel = Joi.object({
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
    QueueUpdateInputModel, 
    Subject,
    SubjectInputModel,
    AppointmentInputModel,
    id 
}