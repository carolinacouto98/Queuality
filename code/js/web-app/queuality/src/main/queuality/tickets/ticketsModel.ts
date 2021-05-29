export class QueueTicket {
    readonly name: string
    readonly subject: string
    readonly nrTicketsAnswered: number
    readonly _id: string
    constructor(name: string, subject: string, nrTicketsAnswered: number, _id: string) {
        this.name = name
        this.subject = subject
        this.nrTicketsAnswered = nrTicketsAnswered
        this._id = _id
    }
}