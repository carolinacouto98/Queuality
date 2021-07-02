import * as Model from '../../common/model/SectionModel'
import * as Fetch from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'

export interface SectionsService {
    getSections : () => Fetch.Request<Siren.Entity<Model.SectionsDto, void>>
    addSection: (section: Model.Section) => Fetch.Request<Siren.Entity<void, void>>
    updateSection: () => Fetch.Request<Siren.Entity<void, void>>
    deleteSection: (sectionId: string) => Fetch.Request<Siren.Entity<void, void>>
}

export function getSectionsService(): SectionsService {
    const headers = new Headers({})
    headers.append('Content-type', 'application/json')
    headers.append('Accept', 'application/json')
    return {
        getSections: (): Fetch.Request<Siren.Entity<Model.SectionsDto, void>> =>
            Fetch.cancelableRequest(new URL('http://localhost:3000/queuality/api/sections'), {headers: headers})
        ,
        addSection: (section: Model.Section): Fetch.Request<Siren.Entity<void, void>> => 
            Fetch.cancelableRequest(new URL('http://localhost:3000/queuality/api/sections'), { 
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    
                })
            })
        ,
        updateSection: (): Fetch.Request<Siren.Entity<void, void>> => 
            Fetch.cancelableRequest(new URL('http://localhost:3000/queuality/api/sections'), { 
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({

                })
            })
        ,
        deleteSection: (sectionId: string): Fetch.Request<Siren.Entity<void, void>> => 
            Fetch.cancelableRequest(new URL(`http://localhost:3000/queuality/api/sections/${sectionId}`), { 
                method: 'DELETE',
                headers: headers
            })
    }
}