export const DELETE_APPOINTMENT_ACTION = 'delete-appointment'
export const UPDATE_APPOINTMENT_ACTION = 'update-appointment'

export class Appointment {
    readonly _id: string
    readonly sectionId: string
    readonly date: Date
    readonly subject: string

    constructor(_id: string, sectionId: string, date: Date, subject: string) {
        this._id = _id 
        this.sectionId = sectionId
        this.date = date
        this.subject = subject
    }
}