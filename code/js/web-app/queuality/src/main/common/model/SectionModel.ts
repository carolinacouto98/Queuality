import { Subject } from './SubjectModel'

export const SECTION_SUBJECT_RELATION = '/rel/subjects'
export const ADD_SECTION_ACTION = 'add-section'
export const DELETE_SECTION_ACTION = 'delete-section'
export type SectionsDto = {
    sections: Section[]
}

export class Section {
    readonly _id?: string
    readonly workingHours?: WorkingHours
    readonly queue?: string[]
    readonly subjects?: Subject[]

    constructor(_id: string, workingHours: WorkingHours, queue: string[] = [], subjects: Subject[] = []) {
        this._id = _id
        this.workingHours = workingHours
        this.queue = queue
        this.subjects = subjects
    }
}

export class CreateSection  {
    readonly _id?: string
    readonly workingHours?: WorkingHours

    constructor(_id: string, workingHours: WorkingHours) {
        this._id = _id
        this.workingHours = workingHours
    }
}
export class WorkingHours {
    begin?: string
    end?: string
    duration?: string

    constructor(begin: string, end: string, duration: string) {
        this.begin = begin
        this.end = end
        this.duration = duration
    }
}