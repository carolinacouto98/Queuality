import * as Model from '../../common/model/SectionModel'
import * as Fetch from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'

export interface SectionsService {
    getSections : () => Fetch.Request<Siren.Entity<Model.SectionsDto, Model.Section>>
    addSection: (section: Model.Section) => Fetch.Request<Siren.Entity<Model.Section, void>>
    updateSection: (sectionId: string, workingHours: Model.WorkingHours) => Fetch.Request<Siren.Entity<Model.Section, void>>
    deleteSection: (sectionId: string) => Fetch.Request<Siren.Entity<void, void>>
}

export function getSectionsService(): SectionsService {
    const headers = new Headers({})
    headers.append('Content-type', 'application/json')
    headers.append('Accept', 'application/json')
    return {
        getSections: (): Fetch.Request<Siren.Entity<Model.SectionsDto, Model.Section>> =>
            Fetch.cancelableRequest(new URL('http://localhost:5000/queuality/api/sections'), {headers: headers})
        ,
        addSection: (section: Model.Section): Fetch.Request<Siren.Entity<Model.Section, void>> => 
            Fetch.cancelableRequest(new URL('http://localhost:5000/queuality/api/sections'), { 
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    section
                })
            })
        ,
        updateSection: (sectionId: string, workingHours: Model.WorkingHours): Fetch.Request<Siren.Entity<Model.Section, void>> => 
            Fetch.cancelableRequest(new URL(`http://localhost:5000/queuality/api/sections/${sectionId}`), { 
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({
                    workingHours
                })
            })
        ,
        deleteSection: (sectionId: string): Fetch.Request<Siren.Entity<void, void>> => 
            Fetch.cancelableRequest(new URL(`http://localhost:5000/queuality/api/sections/${sectionId}`), { 
                method: 'DELETE',
                headers: headers
            })
    }
}