import * as Model from '../model/SubjectModel'
import * as Fetch from '../common/FetchUtils'
import * as Siren from '../common/Siren'
import {NGROK_PATH, API_BASE_URL} from '../App' 



export interface SectionService {
    getSubjects: (sectionName: string) => Fetch.Request<Siren.Entity<Model.SubjectsDto, Model.Subject>>,
    addNewTicket: (sectionName: string, subjectName: string) => Fetch.Request<Siren.Entity<string, void>>,
    getQueue: (sectionName: string) => Fetch.Request<Siren.Entity<string[], void>>
}

export function getSectionService(): SectionService {
    const headers = new Headers({})
    headers.append('Accept', 'application/json')
    headers.append('Content-type', 'application/json')
    return {
        getSubjects: (sectionName: string): Fetch.Request<Siren.Entity<Model.SubjectsDto, Model.Subject>> => 
            Fetch.cancelableRequest(new URL(`${NGROK_PATH}${API_BASE_URL}/sections/${sectionName}/subjects`),{
                headers: headers
            }),
        addNewTicket:(sectionName: string, subjectName: string): Fetch.Request<Siren.Entity<string, void>> => 
            Fetch.cancelableRequest(new URL(`${NGROK_PATH}${API_BASE_URL}/sections/${sectionName}/queue`), {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    'subject': subjectName,
                
                })
            }),
        getQueue: (sectionName: string): Fetch.Request<Siren.Entity<string[], void>> =>
            Fetch.cancelableRequest(new URL(`${NGROK_PATH}${API_BASE_URL}/sections/${sectionName}/queue`),{
                headers: headers
            })
            
    }
}