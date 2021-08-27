import {NGROK_PATH, API_BASE_URL} from '../App'
import * as Siren from '../common/Siren'

export interface TicketsService {
    removeTicket: (sectionName: string, subjectName: string, ticket: string) => Promise<Siren.Entity<string, void>>,
}

export function getTicketsService() : TicketsService {
    const headers = new Headers({})
    headers.append('Accept', 'application/json')
    headers.append('Content-type', 'application/json')
    return{
        removeTicket:  (sectionName: string, subjectName: string, ticket: string) : Promise<Siren.Entity<string, void>> => 
            fetch(`${NGROK_PATH}${API_BASE_URL}/sections/${sectionName}/subjects/${subjectName}`,
                {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify({ticket: ticket})
                }
            )
                .then(res => res.json())   
    }
}