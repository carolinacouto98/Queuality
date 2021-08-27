export type SubjectsDto = {
    subjects: Array<Subject>
}
export class Subject {
    readonly name : string
    description : string
    priority : boolean
    currentTicket : number
    totalTtickets : number
    date : string
        
    constructor(name : string, description : string, priority : boolean, currentTicket : number, totalTtickets : number, date : string) {
        this.name = name
        this.description = description
        this.priority = priority
        this.currentTicket = currentTicket
        this.totalTtickets = totalTtickets
        this.date = date
    }
}