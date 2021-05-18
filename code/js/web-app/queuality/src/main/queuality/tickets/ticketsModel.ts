export class QueueTicket {
    readonly name: string
    readonly subject: string
    readonly ticketNumber: number
    constructor(name: string, subject: string, ticketNumber: number) {
        this.name = name
        this.subject = subject
        this.ticketNumber = ticketNumber
    }
}