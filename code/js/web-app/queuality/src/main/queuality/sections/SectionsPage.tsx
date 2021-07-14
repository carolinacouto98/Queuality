import { useEffect, useState } from 'react'
import { SectionsService } from '../../common/services/SectionsService'
import * as API from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'
import * as Model from '../../common/model/SectionModel'
import SectionsList from './components/SectionsList'
import { Container, Divider, Header } from 'semantic-ui-react'
import SectionsHeader from './components/SectionsHeader'

type SectionsPageProps = {
    service: SectionsService
}

type SectionsInfo = API.FetchInfo<Siren.Entity<void, Model.Section>>
type SectionsUpdate = API.Request<Siren.Entity<void, Model.Section>>

function getSectionsValue(sections?: SectionsInfo) : Model.Section[] | undefined {
    const entities = sections?.result?.body?.entities
    return entities?.map(entity => entity.properties!!)
}

function getSectionsEntities(sections?: SectionsInfo): Siren.EmbeddedEntity<Model.Section>[] | undefined {
    return sections?.result?.body?.entities
}

export default function SectionsPage(props: SectionsPageProps) {
    const [sectionsList, setSections] = useState<SectionsInfo>()
    const [sectionsUpdate, setSectionsUpdate] = useState<SectionsUpdate>(props.service.getSections())


    useEffect(() => {
        async function sendSectionsRequest(request: SectionsUpdate) {
            try {
                setSections({ status: API.FetchState.NOT_READY })
                const result: API.Result<Siren.Entity<void, Model.Section>> = await request.send()
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
        sendSectionsRequest(props.service.getSections())
    }, [props.service, sectionsUpdate])

    async function handleDeleteSection(sectionId: string) {
        const sectionsEntities = sectionsList?.result?.body?.entities
        if(sectionsEntities) {
            const deleteSectionAction = sectionsEntities
                .find(entity => entity.properties?._id === sectionId)?.actions
                .find(action => action.name === Model.DELETE_SECTION_ACTION)
            if(deleteSectionAction) {
                const result = await props.service.deleteSection(sectionId).send()
                setSectionsUpdate(props.service.getSections())
                if(!result.header.ok) {
                    return
                }
            }
        }
    }

    async function handleAddSection(section: Model.Section) {
        const sectionsActions = sectionsList?.result?.body?.actions
        if(sectionsActions) {
            const addSectionAction = sectionsActions
                .find(action => action.name === Model.ADD_SECTION_ACTION)
            if(addSectionAction) {
                const result = await props.service.addSection(section).send()
                setSectionsUpdate(props.service.getSections())
                if(!result.header.ok) {
                    return
                }
            }
        }
    }

    const sections = getSectionsValue(sectionsList)
    const entities = getSectionsEntities(sectionsList)

    return (                
        <Container>
            <SectionsHeader handleAddSection={handleAddSection}/>
            <Divider hidden />
            <br/>
            { sections && sections?.length && entities ?
                <SectionsList
                    sections = {sections} 
                    entities = {entities}
                    handleDeleteSection={handleDeleteSection}/>
                : <Header>There are no sections yet.</Header>
            }
        </Container>     
    )
}