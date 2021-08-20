import * as Model from '../model/SubjectModel'
import * as Fetch from '../FetchUtils'
import * as Siren from '../Siren'
import { API_BASE_URL } from '../../App'

export interface SubjectsService {
   getSubjects: (sectionId: string) => Promise<Siren.Entity<string, Model.Subject>>
   addSubject: (sectionId: string, subject: Model.Subject) => Fetch.Request<Siren.Entity<Model.Subject, void>>
   updateSubject: (sectionId: string, subjectId: string, update: Model.Subject) => Fetch.Request<Siren.Entity<Model.Subject, void>>
   deleteSubject: (sectionId: string, subjectId: string) => Fetch.Request<Siren.Entity<void, void>>
}

export function getSubjectsService(): SubjectsService {
    const headers = new Headers({})
    headers.append('Content-type', 'application/json')
    headers.append('Accept', 'application/json')
    return {
        getSubjects: (sectionId: string): Promise<Siren.Entity<string, Model.Subject>> =>
            fetch(`${API_BASE_URL}/api/sections/${sectionId}/subjects`)
                .then(response => response.json())
        ,
        addSubject: (sectionId: string, subject: Model.Subject): Fetch.Request<Siren.Entity<Model.Subject, void>> =>
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/sections/${sectionId}/subjects`), {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(subject)
            })
        ,
        updateSubject: (sectionId: string, subjectId: string, update: Model.Subject): Fetch.Request<Siren.Entity<Model.Subject, void>> =>
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/sections/${sectionId}/subjects/${subjectId}`), {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(update)
            })
        ,
        deleteSubject: (sectionId: string, subjectId: string): Fetch.Request<Siren.Entity<void, void>> =>
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/sections/${sectionId}/subjects/${subjectId}`), {
                method: 'DELETE',
                headers: headers
            })
    }
}