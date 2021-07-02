export class Subject {
    readonly id: string
    readonly description: string
    readonly priority: boolean
    readonly currentTicket: number
    readonly nextTicket: number
    readonly date: Date
    readonly desks: string[]

    constructor(id: string, 
                description: string, 
                priority: boolean, 
                currentTicket: number, 
                nextTicket: number, 
                date: Date, 
                desks: string[]) 
    {
        this.id = id,
        this.description = description,
        this.priority = priority,
        this.currentTicket = currentTicket,
        this.nextTicket = nextTicket,
        this.date = date,
        this.desks = desks
    }
}