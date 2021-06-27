import * as Fetch from '../common/FetchUtils'
import * as Siren from '../common/Siren'
import * as Model from '../model/SectionsModel'
import {NGROK_PATH, API_BASE_URL} from '../App'

export interface SectionsService {
    getSections: () => Fetch.Request<Siren.Entity<Model.SectionsDto, Model.Section>>
}

export function getSectionsService(): SectionsService {
    const headers = new Headers({})
    headers.append('Accept', 'application/json')
    headers.append('Content-type', 'application/json')
    return {
        getSections: (): Fetch.Request<Siren.Entity<Model.SectionsDto, Model.Section>> => 
            Fetch.cancelableRequest(new URL(`${NGROK_PATH}${API_BASE_URL}/sections`),{
                headers: headers
            })
    }
}