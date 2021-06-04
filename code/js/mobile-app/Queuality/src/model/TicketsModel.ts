export class TicketDetails {
    readonly ticket: string
    waitingTickets: number
    readonly queueSubject: string
    readonly queueNumber: number
    constructor(ticket: string, waiting: number, queueSubject: string, queueNumber: number){
        this.ticket = ticket
        this.waitingTickets = waiting
        this.queueSubject = queueSubject
        this.queueNumber = queueNumber
    }
}