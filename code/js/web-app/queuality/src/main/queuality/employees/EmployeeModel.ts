export class Employee {
    readonly _id: string
    readonly name: string
    readonly email: string
    readonly picture: string
    readonly roles: Array<string>

    constructor(_id: string, name: string, email: string, picture: string, roles: Array<string>) {
        this._id = _id
        this.name = name
        this.email = email
        this.picture = picture
        this.roles = roles
    }
}