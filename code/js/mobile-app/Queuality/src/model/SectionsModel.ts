import { Subject } from './SubjectModel'

export type SectionsDto= {
    sections: Array<Section>
}

export class workingHours {
    begin : string
    end : string
    duration : number
    constructor(begin : string, end : string, duration : number){
        this.begin = begin
        this.end = end
        this.duration = duration
    }
}

export class Section {
    readonly name : string 
    employees : string[]
    workingHours : workingHours
    queue : string[]
    subjects : Subject[]

    constructor(name : string, employess : string[], workingHours: workingHours, queue: string[], subjects: Subject[]) {
        this.name= name
        this.employees = employess
        this.workingHours = workingHours
        this.queue = queue
        this.subjects = subjects
    }
}



