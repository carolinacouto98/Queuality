import { Subject } from './SubjectModel'

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
    readonly _id : string 
    employees : string[]
    workingHours : workingHours
    queue : string[]
    subjects : Array<Subject>

    constructor(_id : string, employess : string[], workingHours: workingHours, queue: string[], subjects: Subject[]) {
        this._id= _id
        this.employees = employess
        this.workingHours = workingHours
        this.queue = queue
        this.subjects = subjects
    }
}



