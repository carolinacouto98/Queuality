export const DELETE_SUBJECT_ACTION = 'delete-subject'
export const EDIT_SUBJECT_ACTION = 'edit-subject'

export type SectionsDto = {
    sections: Subject[]
}

export class Subject {
    readonly name?: string | undefined
    readonly description?: string | undefined
    readonly priority?: boolean | undefined
    readonly currentTicket?: number | undefined
    readonly nextTicket?: number | undefined
    readonly date?: Date | undefined
    readonly desks?: string[] | undefined

    constructor(name?: string, 
                description?: string, 
                priority?: boolean, 
                currentTicket?: number, 
                nextTicket?: number, 
                date?: Date, 
                desks?: string[]) 
    {
        this.name = name
        this.description = description
        this.priority = priority
        this.currentTicket = currentTicket
        this.nextTicket = nextTicket
        this.date = date
        this.desks = desks
    }
}