import { useEffect, useState } from 'react'
import { SectionsService } from './SectionsService'
import * as API from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'
import * as Model from '../../common/model/SectionModel'
import SectionsTable from './components/SectionsTable'
import { Header } from 'semantic-ui-react'

type SectionsPageProps = {
    service: SectionsService
}

type SectionsInfo = API.FetchInfo<Siren.Entity<Model.SectionsDto, Model.Section>>
type SectionsRequest = API.Request<Siren.Entity<Model.SectionsDto, Model.Section>>

function getSectionsValue(sections?: SectionsInfo) : Model.Section[] | undefined {
    const entities = sections?.result?.body?.entities
    return entities?.map(entity => entity.properties!!)
}

function getSectionsEntities(sections?: SectionsInfo): Siren.EmbeddedEntity<Model.Section>[] | undefined {
    return sections?.result?.body?.entities
}

export default function SectionsPage({ service }: SectionsPageProps) {
    const [sectionsList, setSections] = useState<SectionsInfo>()

    useEffect(() => {
        async function sendSectionsRequest(request: SectionsRequest) {
            try {
                setSections({ status: API.FetchState.NOT_READY })
                const result: API.Result<Siren.Entity<Model.SectionsDto, Model.Section>> = await request.send()
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

    const sections = getSectionsValue(sectionsList)
    const entities = getSectionsEntities(sectionsList)

    return (
        <>
            {
                sections && sections?.length && entities ?
                    <SectionsTable sections = {sections} entities = {entities}/>
                :
                    <Header>There are no sections yet.</Header>
            }
        </>        
    )
}