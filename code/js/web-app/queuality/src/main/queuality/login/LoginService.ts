import * as Fetch from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'

export interface LoginService {
    getLogins : () => Fetch.Request<Siren.Entity<undefined, undefined>>
}
    
export function getLoginService(): LoginService {
    const headers = new Headers({})
    headers.append('Content-type', 'application/json')
    headers.append('Accept', 'application/json')
    return {
        getLogins: (): Fetch.Request<Siren.Entity<undefined, undefined>> =>
            Fetch.cancelableRequest(new URL('http://localhost:5000/queuality/api/auth/login'), { headers: headers })
        
    }
}