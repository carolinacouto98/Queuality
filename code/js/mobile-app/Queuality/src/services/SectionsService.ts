import * as Siren from '../common/Siren'
import * as Model from '../model/SectionsModel'
import {NGROK_PATH, API_BASE_URL} from '../App'

export interface SectionsService {
    getSections: () => Promise<Siren.Entity<void, Model.Section>>
}

export function getSectionsService(): SectionsService {
    const headers = new Headers({})
    headers.append('Accept', 'application/json')
    headers.append('Content-type', 'application/json')
    return {
        getSections: async (): Promise<Siren.Entity<void, Model.Section>>  => 
            fetch(`${NGROK_PATH}${API_BASE_URL}/sections`, {
                headers: headers
            })
                .then(res => res.json())    
    }
}