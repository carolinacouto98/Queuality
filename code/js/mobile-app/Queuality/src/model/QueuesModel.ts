export type QueueType = {
    _id: string,
    name: string,
    subject: string,
    priority: boolean,
    queueTicket: {
        nrTotalTickets: number,
        nrTicketsAnswered: number,
        date: Date
    }
}

export class Queue {
    readonly _id: string
    readonly name: string
    readonly subject: string
    readonly priority: boolean
    readonly nrTicketsAnswered: number

    constructor(_id: string, name: string, subject: string, priority: boolean, ticketsAnswered: number) {
        this._id = _id
        this.name = name
        this.subject = subject
        this.priority = priority
        this.nrTicketsAnswered = ticketsAnswered
    }
}