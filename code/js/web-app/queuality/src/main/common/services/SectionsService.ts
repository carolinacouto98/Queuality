import * as Model from '../model/SectionModel'
import * as Fetch from '../FetchUtils'
import * as Siren from '../Siren'

import { API_BASE_URL } from '../../App'

export interface SectionsService {
    getSections: () => Fetch.Request<Siren.Entity<void, Model.Section>>
    getSection: (sectionId: string) => Fetch.Request<Siren.Entity<Model.Section, void>>
    addSection: (section: Model.Section) => Fetch.Request<Siren.Entity<Model.CreateSection, void>>
    updateSection: (sectionId: string, workingHours: Model.WorkingHours) => Fetch.Request<Siren.Entity<Model.Section, void>>
    deleteSection: (sectionId: string) => Fetch.Request<Siren.Entity<void, void>>
}

export function getSectionsService(): SectionsService {
    const headers = new Headers({})
    headers.append('Content-type', 'application/json')
    headers.append('Accept', 'application/json')
    return {
        getSections: (): Fetch.Request<Siren.Entity<void, Model.Section>> =>
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/sections`), {headers: headers,
                credentials:'include'})
        ,
        getSection: (sectionId: string): Fetch.Request<Siren.Entity<Model.Section, void>> =>
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/sections/${sectionId}`), {headers: headers,
                credentials:'include'})
        ,
        addSection: (section: Model.Section): Fetch.Request<Siren.Entity<Model.CreateSection, void>> => {            
            const body = {
                _id : section._id,
                workingHours : {
                    begin: section.workingHours!!.begin,
                    end: section.workingHours!!.end,
                    duration: section.workingHours!!.duration
                }
            }
            return Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/sections`), { 
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
                credentials:'include'
            })
        },
        updateSection: (sectionId: string, workingHours: Model.WorkingHours): Fetch.Request<Siren.Entity<Model.Section, void>> => 
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/sections/${sectionId}`), { 
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({
                    workingHours
                }),
                credentials:'include'
            })
        ,
        deleteSection: (sectionId: string): Fetch.Request<Siren.Entity<void, void>> => 
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/sections/${sectionId}`), { 
                method: 'DELETE',
                headers: headers,
                credentials:'include'
            })
    }
}