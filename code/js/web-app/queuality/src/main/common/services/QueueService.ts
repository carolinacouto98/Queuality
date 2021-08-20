import * as Siren from '../Siren'
import { API_BASE_URL } from '../../App'

export interface QueueService {
    getQueue: (sectionId: string) => Promise<Siren.Entity<string[], void>>
    getNextTicket: (sectionId: string, subjectName: string) => Promise<Siren.Entity<string, void>>
}

export function getQueueService(): QueueService {
    const headers = new Headers({})
    headers.append('Content-type', 'application/json')
    headers.append('Accept', 'application/json')
    return {
        getQueue: (sectionId: string): Promise<Siren.Entity<string[], void>> => 
            fetch(`${API_BASE_URL}/api/sections/${sectionId}/queue`)
                .then(response => response.json())
                
        ,
        getNextTicket: (sectionId: string, subjectName: string): Promise<Siren.Entity<string, void>> =>
            fetch(`${API_BASE_URL}/api/sections/${sectionId}/queue?subject=${subjectName}&next=true`)
                .then(response => response.json())
    
    }
}
