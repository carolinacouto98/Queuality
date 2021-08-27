export class AppointmentDetails {
    readonly _id: string
    readonly subject: string
    desk: string
    date: string
    readonly section: string
    constructor(_id: string, desk: string, subject: string, section: string, date: string){
        this._id = _id
        this.subject = subject
        this.desk = desk
        this.section = section
        this.date = date
    }
}