'use strict'

const Joi = require('joi')
const { ObjectId } = require('mongodb')

/**
 * @typedef {Object} AppointmentWorkingHours
 * @property {String} begin Hours of the day when should start all appointments. Format should be HH:mm.
 * @property {String} end Hours of the day when should end all appointments. Format should be HH:mm.
 * @property {Number} duration Duration of an appointment in minutes.
 */
const appointmentWorkingHoursSchema = {
    begin: Joi.string().required(),
    end: Joi.string().required(),
    duration: Joi.number().required(),
}

/**
 * @typedef {Object} Subject
 * @property {String} name Name of the subject is unique.
 * @property {String} description Subject
 * @property {Boolean} priority Priority of the subject
 * @property {Number} currentTicket The number of the ticket that is being answered
 * @property {Number} totalTickets The number of the tickets that have been taken
 * @property {Date} date The current day 
 * @property {Array<String>} desks
 */
const subjectSchema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.boolean().required(),
    currentTicket: Joi.number().required(),
    totalTickets: Joi.number().required(),
    date: Joi.date(),//.format('DD/MM/YYYY HH:mm').required(),
    desks: Joi.array().items(Joi.string()).required()
}
const subject = Joi.object(subjectSchema)

/**
 * @typedef {Object} Section
 * @property {String} _id The name of the section is unique.
 * @property {Array<String>} employees The employees working in this section.
 * @property {AppointmentWorkingHours} workingHours Details of hours and duration of an appointment in this section.
 * @property {Array<String>} queue Array with the order for the next tickets to be answered.
 * @property {Array<Subject>} subjects Array with all the subjects of this section.
 */
const section = Joi.object({
    _id: Joi.string().required(),
    employees: Joi.array().items(Joi.string()).required(),
    workingHours: Joi.object(appointmentWorkingHoursSchema).required(),
    queue: Joi.array().items(Joi.string()).required(),
    subjects: Joi.array().items(Joi.object(subjectSchema)).required()
})

const roles = [
    'Manage Sections',
    'Manage Section',
    'Manage Employees',
    'Manage Section\'s Employees Roles',
    'Manage Section\'s Appointments',
    'Manage Employee\'s Appointments',
    'Manage Desk\'s Subject',
    'Answer Appointments',
    'Answer Tickets'
]

/**
 * @typedef {Object} Employee
 * @property {String} _id
 * @property {String} name
 * @property {Array<String>} roles
 * @property {Array<String>} sections
 * @property {String} desk
 */
const employee = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    roles: Joi.array().items(Joi.valid(...roles)).required(),
    sections: Joi.array().items(Joi.string()).required(),
    desk: Joi.string()
})
/**
 * @typedef {Object} Appointment
 * @property {ObjectId} _id
 * @property {String} subject
 * @property {String} desk
 * @property {Date} date
 * @property {String} section
 */
const appointment = Joi.object({
    _id: Joi.object().required(),
    subject: Joi.string().required(),
    desk: Joi.string().required(),
    date: Joi.date(),//.format('DD/MM/YYYY HH:mm').required(),
    section: Joi.string().required()
})

/**
 * @typedef {Object} AppointmentInputModel
 * @property {String} subject
 * @property {String} desk
 * @property {Date} date
 * @property {String} section
 */
const appointmentInputModel = Joi.object({
    subject: Joi.string().required(),
    date: Joi.date().required(),//.format('DD/MM/YYYY HH:mm'),
    section: Joi.string().required()
})
/**
 * @typedef {Object} EmployeeInputModel
 * @property {String} _id
 * @property {String} name
 */
const employeeInputModel = Joi.object({ 
    _id: Joi.string().required(),
    name: Joi.string().required(),
    roles: Joi.array().default([]),
    sections: Joi.array().default([]),
    desk: Joi.string().default('')
})
/**
 * @typedef {Object} EmployeeUpdateInputModel
 * @property {String} _id
 * @property {String} name
 * @property {Array<String>} roles
 * @property {Array<String>} sections
 * @property {String} desk
 */
const employeeUpdateInputModel = Joi.object({ 
    _id: Joi.string().required(),
    name: Joi.string(),
    roles: Joi.array().items(Joi.valid(...roles)),
    sections: Joi.array().items(Joi.string().allow('')),
    desk: Joi.string().allow('')
})
/**
 * @typedef {Object} SectionInputModel
 * @property {String} _id The name of the section is unique.
 * @property {AppointmentWorkingHours} workingHours Details of hours and duration of an appointment in this section.
*/
const sectionInputModel = Joi.object({
    _id: Joi.string().required(),
    workingHours: Joi.object(appointmentWorkingHoursSchema).required(),
    employees: Joi.array().default([]),
    queue: Joi.array().default([]),
    subjects: Joi.array().default([])
})
/**
 * @typedef {Object} SectionUpdateInputModel
 * @property {String} _id The name of the section is unique.
 * @property {AppointmentWorkingHours} workingHours Details of hours and duration of an appointment in this section.
 */
const sectionUpdateInputModel = Joi.object({
    _id: Joi.string().required(),
    workingHours: Joi.object(appointmentWorkingHoursSchema)
})
/**
 * @typedef {Object} SubjectInputModel
 * @property {String} name Name of the subject is unique.
 * @property {String} description Subject
 * @property {Boolean} priority Priority of the subject
 */
const subjectInputModel = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.boolean().required(),
    desks: Joi.array().items(Joi.string().required()).default([]),
    currentTicket: Joi.number().default(0),
    totalTickets: Joi.number().default(0),
    date: Joi.date(),//.format('DD/MM/YYYY HH:mm').default(new Date())
})
/**
 * @typedef {Object} SubjectUpdateInputModel
 * @property {String} name Name of the subject is unique.
 * @property {String} description Subject
 * @property {Boolean} priority Priority of the subject
 * @property {Array<String>} desks
 */
const subjectUpdateInputModel = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    priority: Joi.boolean(),
    desks: Joi.array().items(Joi.string().required())
})

module.exports = {
    section,
    subject,
    employee,
    appointment,
    sectionInputModel,
    sectionUpdateInputModel,
    subjectInputModel,
    subjectUpdateInputModel,
    employeeInputModel,
    employeeUpdateInputModel,
    appointmentInputModel
}