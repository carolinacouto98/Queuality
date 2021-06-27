import { Subject } from './SubjectModel'

export class TicketDetails {
    readonly ticket: string
    waitingTickets: number
    subject: Subject
    readonly sectionName: string
    constructor(ticket: string, waiting: number, subject: Subject, sectionName: string){
        this.ticket = ticket
        this.waitingTickets = waiting
        this.subject = subject
        this.sectionName = sectionName
    }
}