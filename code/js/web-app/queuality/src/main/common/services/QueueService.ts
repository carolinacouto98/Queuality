import * as Fetch from '../FetchUtils'
import * as Siren from '../Siren'
import { API_BASE_URL } from '../../App'

export interface QueueService {
    getQueue: (sectionId: string) => Fetch.Request<Siren.Entity<string[], void>>
    getNextTicket: (sectionId: string, subjectName: string) => Fetch.Request<Siren.Entity<string, void>>
}

export function getQueueService(): QueueService {
    const headers = new Headers({})
    headers.append('Content-type', 'application/json')
    headers.append('Accept', 'application/json')
    return {
        getQueue: (sectionId: string): Fetch.Request<Siren.Entity<string[], void>> =>
        Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/sections/${sectionId}/queue`), {headers: headers})
        ,
        getNextTicket: (sectionId: string, subjectName: string): Fetch.Request<Siren.Entity<string, void>> =>
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/sections/${sectionId}/queue?subject=${subjectName}&next=true`), {headers: headers})
    
    }
}
