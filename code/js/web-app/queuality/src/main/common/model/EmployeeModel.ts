export class Employee {
    readonly _id: string
    readonly name: string
    readonly picture: string
    roles: string[]
    sections: string[]
    desk: string

    constructor(_id: string, name: string, picture: string, roles: string[], sections: string[], desk: string) {
        this._id = _id
        this.name = name
        this.picture = picture
        this.roles = roles
        this.sections = sections
        this.desk = desk
    }
}