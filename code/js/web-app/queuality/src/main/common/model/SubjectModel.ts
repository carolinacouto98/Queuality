export const DELETE_SUBJECT_ACTION = 'delete-subject'

export type SectionsDto = {
    sections: Subject[]
}

export class Subject {
    readonly name: string
    readonly description: string
    readonly priority: boolean
    readonly currentTicket: number
    readonly nextTicket: number
    readonly date: Date
    readonly desks: string[]

    constructor(name: string, 
                description: string, 
                priority: boolean, 
                currentTicket: number, 
                nextTicket: number, 
                date: Date, 
                desks: string[]) 
    {
        this.name = name,
        this.description = description,
        this.priority = priority,
        this.currentTicket = currentTicket,
        this.nextTicket = nextTicket,
        this.date = date,
        this.desks = desks
    }
}