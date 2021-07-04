import { Subject } from './SubjectModel'

export const SECTION_SUBJECT_RELATION = '/rel/subjects'
export type SectionsDto = {
    sections: Section[]
}

export class Section {
    readonly _id?: string
    readonly workingHours?: WorkingHours
    readonly queue?: string[]
    readonly subjects?: Subject[]

    constructor(_id: string, workingHours: WorkingHours, queue: string[], subjects: Subject[]) {
        this._id = _id
        this.workingHours = workingHours
        this.queue = queue
        this.subjects = subjects
    }
}

export type WorkingHours = {
    begin?: string,
    end?: string,
    duration?: number
}