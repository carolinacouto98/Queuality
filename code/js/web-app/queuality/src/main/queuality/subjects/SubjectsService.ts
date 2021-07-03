import * as Model from '../../common/model/SubjectModel'
import * as Fetch from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'

export interface SubjectsService {
   
}

export function getSubjectsService(): SubjectsService {
    const headers = new Headers({})
    headers.append('Content-type', 'application/json')
    headers.append('Accept', 'application/json')
    return {}
}