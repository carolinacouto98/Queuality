'use strict'

const Joi = require('joi')

/**
 * @typedef {Object} AppointmentWorkingHours
 * @property {String} begin Hours of the day when should start all appointments. Format should be HH:mm.
 * @property {String} end Hours of the day when should end all appointments. Format should be HH:mm.
 * @property {Number} duration Duration of an appointment in minutes.
 */
/**
 * @typedef {Object} Section
 * @property {String} name The name of the section is unique.
 * @property {Array<String>} employees The employees working in this section.
 * @property {AppointmentWorkingHours} workingHours Details of hours and duration of an appointment in this section.
 * @property {Array<String>} queue Array with the order for the next tickets to be answered.
 * @property {Array<Subject>} subjects Array with all the subjects of this section.
 */
/**
 * @typedef {Object} Subject
 * @property {String} name Name of the subject is unique.
 * @property {String} subject Subject
 * @property {Boolean} priority Priority of the subject
 * @property {Number} currentTicket The number of the ticket that is being answered
 * @property {Number} totalTicket The number of the tickets that have been taken
 * @property {Date} date The current day 
 * @property {Array<String>} desks
 */
/**
 * @typedef {Object} Employee
 * @property {String} id
 * @property {String} name
 * @property {Array<String>} roles
 * @property {Array<String>} sections
 * @property {String} desk
 */
/**
 * @typedef {Object} Appointment
 * @property {ObjectId} _id
 * @property {String} subject
 * @property {String} desk
 * @property {Date} date
 * @property {String} section
 */

/**
 * @typedef {Object} AppointmentInputModel
 * @property {String} subject
 * @property {String} desk
 * @property {Date} date
 * @property {String} section
 */
/**
 * @typedef {Object} EmployeeInputModel
 * @property {String} id
 * @property {String} name
 */
/**
 * @typedef {Object} EmployeeUpdateInputModel
 * @property {String} id
 * @property {String} name
 * @property {Array<String>} roles
 * @property {Array<String>} sections
 * @property {String} desk
 */
/**
 * @typedef {Object} SectionInputModel
 * @property {String} name The name of the section is unique.
 * @property {AppointmentWorkingHours} workingHours Details of hours and duration of an appointment in this section.
*/
/**
 * @typedef {Object} SectionUpdateInputModel
 * @property {String} name The name of the section is unique.
 * @property {Array<String>} employees The employees working in this section.
 * @property {AppointmentWorkingHours} workingHours Details of hours and duration of an appointment in this section.
 * @property {Array<String>} queue Array with the order for the next tickets to be answered.
 * @property {Array<Subject>} subjects Array with all the subjects of this section.
 */
/**
 * @typedef {Object} SubjectInputModel
 * @property {String} name Name of the subject is unique.
 * @property {String} subject Subject
 * @property {Boolean} priority Priority of the subject
 */
/**
 * @typedef {Object} SubjectUpdateInputModel
 * @property {String} name Name of the subject is unique.
 * @property {String} subject Subject
 * @property {Boolean} priority Priority of the subject
 * @property {Array<String>} desks
 */