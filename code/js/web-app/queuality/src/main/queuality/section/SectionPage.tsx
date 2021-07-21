import { useEffect, useState } from 'react'
import { SectionsService } from '../../common/services/SectionsService'
import { SubjectsService } from '../../common/services/SubjectsService'
import { SubjectsList } from './components/SubjectsList'
import * as API from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'
import * as SubjectModel from '../../common/model/SubjectModel'
import * as SectionModel from '../../common/model/SectionModel'
import { Container, Header } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

type SectionPageProps = {
    sectionsService: SectionsService
    subjectsService: SubjectsService
}

type Param = {
    sectionId: string
}

type SubjectsInfo = API.FetchInfo<Siren.Entity<string, SubjectModel.Subject>>
type SubjectsUpdate = API.Request<Siren.Entity<string, SubjectModel.Subject>>

function getSubjectsValue(subjects?: SubjectsInfo) : SubjectModel.Subject[] | undefined {
    const entities = subjects?.result?.body?.entities
    return entities?.map(entity => entity.properties!!)
}

function getSubjectsEntities(subjects?: SubjectsInfo): Siren.EmbeddedEntity<SubjectModel.Subject>[] | undefined {
    return subjects?.result?.body?.entities
}

function getSectionIdProperty(subjects?: SubjectsInfo): string | undefined {
    return subjects?.result?.body?.properties
}

export default function SectionPage(props: SectionPageProps) {
    const { sectionId }  = useParams<Param>()
    const [subjectsList, setSubjects] = useState<SubjectsInfo>()    
    const [subjectsUpdate, setSubjectsUpdate] = useState<SubjectsUpdate>(props.subjectsService.getSubjects(sectionId))


    useEffect(() => {
        async function sendSubjectsRequest(request: SubjectsUpdate) {
            try { 
                setSubjects({ status: API.FetchState.NOT_READY })
                const result: API.Result<Siren.Entity<string, SubjectModel.Subject>> = await request.send()
                if(!result.header.ok) {
                    return
                }
                setSubjects({
                    status: result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            } catch(reason) {
                if(reason.name !== 'AbortError') console.log()
                    setSubjects({status: API.FetchState.ERROR})
            }
        }
        sendSubjectsRequest(props.subjectsService.getSubjects(sectionId))
    }, [props.subjectsService, subjectsUpdate])    
    
    const sectionIdProperty = getSectionIdProperty(subjectsList)
    const subjects = getSubjectsValue(subjectsList)
    const entities = getSubjectsEntities(subjectsList)

    async function handleDeleteSubject(subjectId: string) {
        const sectionsEntities = subjectsList?.result?.body?.entities
        if(sectionsEntities) {
            const deleteSubjectAction = sectionsEntities
                .find(entity => entity.properties?.name === subjectId)?.actions
                .find(action => action.name === 'delete-subject')
            if(deleteSubjectAction) {
                const result = await props.subjectsService.deleteSubject(sectionId!!, subjectId).send()
                setSubjectsUpdate(props.subjectsService.getSubjects(sectionId!!))
                if(!result.header.ok) {
                    return
                }
            }
        }
    }

    return(
        <>
        {subjects && subjects.length ?  
            <Container>
                <SubjectsList subjects={subjects} handleDeleteSubject={handleDeleteSubject}/>
            </Container>
            :
            <Header>There are no subjects yet</Header>
        }
        </>
       
        
    )
}