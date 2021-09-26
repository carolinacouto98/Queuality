import * as Fetch from '../FetchUtils'
import * as Siren from '../Siren'

export interface LoginService {
    getLogins : () => Fetch.Request<Siren.Entity<undefined, undefined>>
    getSignups : () => Fetch.Request<Siren.Entity<undefined, undefined>>
    logout : () => Fetch.Request<any>
}
    
export function getLoginService(): LoginService {
    const headers = new Headers({})
    headers.append('Content-type', 'application/json')
    headers.append('Accept', 'application/json')
    return {
        getLogins: (): Fetch.Request<Siren.Entity<undefined, undefined>> =>
            Fetch.cancelableRequest(new URL('http://localhost:5000/queuality/api/auth/login'), { headers: headers }),
        getSignups: (): Fetch.Request<Siren.Entity<undefined, undefined>> =>
            Fetch.cancelableRequest(new URL('http://localhost:5000/queuality/api/auth/signup'), { headers: headers }),
        logout: (): Fetch.Request<any> =>
            Fetch.cancelableRequest(new URL('http://localhost:5000/queuality/api/auth/logout'), {method: 'POST', headers: headers, credentials:'include' })
    }
}