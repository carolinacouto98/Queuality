import { Subject } from './SubjectModel'

export const SELF = 'self'
export const SECTION_SUBJECT_RELATION = '/rel/subjects'
export const ADD_SECTION_ACTION = 'add-section'
export const DELETE_SECTION_ACTION = 'delete-section'
export const EDIT_SECTION_ACTION = 'update-section'

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
    begin?: string | undefined
    end?: string | undefined
    duration?: number | undefined
    static MINDURATION: number = 0
    constructor(begin: string | undefined, end: string | undefined, duration: number | undefined) {
        this.begin = begin
        this.end = end
        this.duration = duration
    }
}