import {NGROK_PATH, API_BASE_URL} from '../App'
import * as Siren from '../common/Siren'
import * as Fetch from '../common/FetchUtils'

export interface TicketsService {
    removeTicket: (sectionName: string, subjectName: string, ticket: string) => Fetch.Request<Siren.Entity<string, void>>,
}

export function getTicketsService() : TicketsService {
    const headers = new Headers({})
    headers.append('Accept', 'application/json')
    headers.append('Content-type', 'application/json')
    return{
        removeTicket:  (sectionName: string, subjectName: string, ticket: string) : Fetch.Request<Siren.Entity<string, void>> => 
            Fetch.cancelableRequest(new URL(`${NGROK_PATH}${API_BASE_URL}/sections/${sectionName}/subjects/${subjectName}`),
                {
                    method: 'PUT',
                    headers: {
                        'accept' : 'application/json',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ticket: ticket})
                }
            )
        
    }
}