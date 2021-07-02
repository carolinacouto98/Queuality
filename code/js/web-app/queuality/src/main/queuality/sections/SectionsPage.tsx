import { useEffect, useState } from 'react'
import { SectionsService } from './SectionsService'
import * as API from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'
import * as Model from '../../common/model/SectionModel'
import { resolveNaptr } from 'dns'

type SectionsPageProps = {
    service: SectionsService
}

type SectionsInfo = API.FetchInfo<Siren.Entity<Model.SectionsDto, void>>
type SectionsRequest = API.Request<Siren.Entity<Model.SectionsDto, void>>

function SectionsPage({service}: SectionsPageProps) {
    const [sections, setSections] = useState<SectionsInfo>()

    useEffect(() => {
        async function sendSectionsRequest(request: SectionsRequest) {
            try {
                setSections({ status: API.FetchState.NOT_READY })
                const result: API.Result<Siren.Entity<Model.SectionsDto, void>> = await request.send()
                if(!result.header.ok) {
                    return
                }
                setSections({
                    status: result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            } catch(reason) {
                if(reason.name !== 'AbortError')
                    setSections({status: API.FetchState.ERROR})
            }
        }
        sendSectionsRequest(service.getSections())
    }, [service])
}