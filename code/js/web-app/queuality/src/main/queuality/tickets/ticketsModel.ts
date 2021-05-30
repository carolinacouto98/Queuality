export class QueueTicket {
    readonly _id: string    
    readonly ticketNumber: string
    readonly subject: string
    //readonly nrTicketsAnswered: number
    //readonly _id: string
    constructor(_id: string, subject: string, ticketNumber: string, nrTicketsAnswered: number) {
        this._id = _id
        this.subject = subject
        this.ticketNumber = ticketNumber
        //this.nrTicketsAnswered = nrTicketsAnswered
        //this._id = _id
    }
}