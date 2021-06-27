export type SubjectsDto = {
    subjects: Array<Subject>
}
export class Subject {
    readonly name : string
    subject : string
    priority : boolean
    currentTicket : number
    totalTtickets : number
    date : string
        
    constructor(name : string, subject : string, priority : boolean, currentTicket : number, totalTtickets : number, date : string) {
        this.name = name
        this.subject = subject
        this.priority = priority
        this.currentTicket = currentTicket
        this.totalTtickets = totalTtickets
        this.date = date
    }
}