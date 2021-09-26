export const ANSWER_TICKET_ACTION = 'answer-ticket'

export class Ticket {
    readonly ticket: string
    
    constructor(ticket: string) {
        this.ticket = ticket
    }
}