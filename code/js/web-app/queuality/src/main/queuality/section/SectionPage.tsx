import { useEffect, useState } from 'react'
import { SectionsService } from '../../common/services/SectionsService'
import { SubjectsService } from '../../common/services/SubjectsService'
import { SubjectsList } from './components/SubjectsList'
import * as API from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'
import * as SubjectsModel from '../../common/model/SubjectModel'
import { Container, Header } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

type SectionPageProps = {
    sectionsService: SectionsService
    subjectsService: SubjectsService
}

type Param = {
    sectionId: string
}

type SubjectsInfo = API.FetchInfo<Siren.Entity<void, SubjectsModel.Subject>>
type SubjectsUpdate = API.Request<Siren.Entity<void, SubjectsModel.Subject>>

function getSubjectsValue(subjects?: SubjectsInfo) : SubjectsModel.Subject[] | undefined {
    const entities = subjects?.result?.body?.entities
    return entities?.map(entity => entity.properties!!)
}

function getSubjectsEntities(subjects?: SubjectsInfo): Siren.EmbeddedEntity<SubjectsModel.Subject>[] | undefined {
    return subjects?.result?.body?.entities
}

export default function SectionPage(props: SectionPageProps) {
    const { sectionId }  = useParams<Param>()
    const [subjectsList, setSubjects] = useState<SubjectsInfo>()    
    const [subjectsUpdate, setSubjectsUpdate] = useState<SubjectsUpdate>(props.subjectsService.getSubjects(sectionId))


    useEffect(() => {
        async function sendSubjectsRequest(request: SubjectsUpdate) {
            try {
                setSubjects({ status: API.FetchState.NOT_READY })
                const result: API.Result<Siren.Entity<void, SubjectsModel.Subject>> = await request.send()
                if(!result.header.ok) {
                    return
                }
                setSubjects({
                    status: result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            } catch(reason) {
                if(reason.name !== 'AbortError')
                    setSubjects({status: API.FetchState.ERROR})
            }
        }
        sendSubjectsRequest(props.subjectsService.getSubjects(sectionId))
    }, [props.subjectsService, subjectsUpdate])

    const subjects = getSubjectsValue(subjectsList)
    const entities = getSubjectsEntities(subjectsList)

    return(
        <>
        {subjects && subjects?.length && entities ? 
            <Container>
                <SubjectsList subjects={subjects} entities={entities}/>
            </Container>
            : 
            <Header>There are no subjects yet</Header>
        }
        </>
       
        
    )
}