import { Subject } from './SubjectModel'

export type SectionsDto = {
    sections: Section[]
}

export class Section {
    readonly name?: string
    readonly workingHours?: WorkingHours
    readonly queue?: string[]
    readonly subjects?: Subject[]

    constructor(name: string, workingHours: WorkingHours, queue: string[], subjects: Subject[]) {
        this.name = name
        this.workingHours = workingHours
        this.queue = queue,
        this.subjects = subjects
    }
}

type WorkingHours = {
    begin?: string,
    end?: string,
    duration?: number
}