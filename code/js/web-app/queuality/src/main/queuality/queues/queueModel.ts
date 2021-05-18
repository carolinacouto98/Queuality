export class Queue {
    readonly _id: string
    readonly name: string
    readonly subject: string
    readonly priority: boolean 

    constructor(name: string, subject: string, priority: boolean, _id: string = '') { 
        this._id = _id
        this.name = name 
        this.subject = subject
        this.priority = priority
    }
  }