import * as Model from '../model/SubjectModel'
import * as Siren from '../common/Siren'
import {NGROK_PATH, API_BASE_URL} from '../App' 



export interface SectionService {
    getSubjects: (sectionName: string) => Promise<Siren.Entity<void, Model.Subject>>,
    addNewTicket: (sectionName: string, subjectName: string) => Promise<Siren.Entity<string, void>>,
    getQueue: (sectionName: string) => Promise<Siren.Entity<string[], void>>
}

export function getSectionService(): SectionService {
    const headers = new Headers({})
    headers.append('Accept', 'application/json')
    headers.append('Content-type', 'application/json')
    return {
        getSubjects: async (sectionName: string): Promise<Siren.Entity<void, Model.Subject>> => 
            fetch(`${NGROK_PATH}${API_BASE_URL}/sections/${sectionName}/subjects`,{
                headers: headers
            })
                .then(res => res.json())   
        ,
        addNewTicket:(sectionName: string, subjectName: string): Promise<Siren.Entity<string, void>> => 
            fetch(`${NGROK_PATH}${API_BASE_URL}/sections/${sectionName}/queue`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    'subject': subjectName, 
                })
            })
                .then(res => res.json())   
        ,
        getQueue: (sectionName: string): Promise<Siren.Entity<string[], void>> =>
            fetch(`${NGROK_PATH}${API_BASE_URL}/sections/${sectionName}/queue`, {
                headers: headers
            })
                .then(res => res.json())    
    }
}