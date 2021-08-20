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
import SectionHeader from './components/SectionHeader'

type SectionPageProps = {
    sectionsService: SectionsService
    subjectsService: SubjectsService
}

type Param = {
    sectionId: string
}

type SubjectsInfo = API.FetchInfo<Siren.Entity<string, SubjectModel.Subject>>
type SubjectsUpdate = API.Request<Siren.Entity<string, SubjectModel.Subject>>

type SectionInfo = API.FetchInfo<Siren.Entity<SectionModel.Section, void>>
type SectionUpdate = API.Request<Siren.Entity<SectionModel.Section, void>>

function getSubjectsValue(subjects?: SubjectsInfo) : SubjectModel.Subject[] | undefined {
    const entities = subjects?.result?.body?.entities
    return entities?.map(entity => entity.properties!!)
}

function getSectionProperties(section?: SectionInfo) : SectionModel.Section | undefined {
    return section?.result?.body?.properties
}

export default function SectionPage(props: SectionPageProps) {
    const { sectionId }  = useParams<Param>()
    const [subjectsList, setSubjects] = useState<SubjectsInfo>()    
    //const [subjectsUpdate, setSubjectsUpdate] = useState<SubjectsUpdate>(props.subjectsService.getSubjects(sectionId))
    const [sectionDetails, setSection] = useState<SectionInfo>()
    const [sectionUpdate, setSectionUpdate] = useState<SectionUpdate>(props.sectionsService.getSection(sectionId))


    /*useEffect(() => {
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
        //sendSubjectsRequest(props.subjectsService.getSubjects(sectionId))
    }, [props.subjectsService, subjectsUpdate, sectionId])*/    

    useEffect(() => {
        async function sendSectionRequest(request: SectionUpdate) {
            try { 
                setSection({ status: API.FetchState.NOT_READY })
                const result: API.Result<Siren.Entity<SectionModel.Section, void>> = await request.send()
                if(!result.header.ok) {
                    return
                }
                setSection({
                    status: result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            } catch(reason) {
                if(reason.name !== 'AbortError') console.log()
                    setSection({status: API.FetchState.ERROR})
            }
        }
        sendSectionRequest(props.sectionsService.getSection(sectionId))
    }, [props.sectionsService, sectionUpdate, sectionId])    
    
    const subjects = getSubjectsValue(subjectsList)
    const section = getSectionProperties(sectionDetails)

    async function handleDeleteSubject(subjectId: string) {
        const sectionsEntities = subjectsList?.result?.body?.entities
        if(sectionsEntities) {
            const deleteSubjectAction = sectionsEntities
                .find(entity => entity.properties?.name === subjectId)?.actions
                .find(action => action.name === SubjectModel.DELETE_SUBJECT_ACTION)
            if(deleteSubjectAction) {
                const result = await props.subjectsService.deleteSubject(sectionId!!, subjectId).send()
                //setSubjectsUpdate(props.subjectsService.getSubjects(sectionId!!))
                if(!result.header.ok) {
                    return
                }
            }
        }
    }

    async function handleEditSubject(subjectId: string, subject: SubjectModel.Subject) {
        const sectionsEntities = subjectsList?.result?.body?.entities
        if(sectionsEntities) {
            const editSubjectAction = sectionsEntities
            .find(entity => entity.properties?.name === subjectId)?.actions
            .find(action => action.name === SubjectModel.EDIT_SUBJECT_ACTION)
        if(editSubjectAction) {
            const result = await props.subjectsService.updateSubject(sectionId, subjectId, subject).send()
            //setSubjectsUpdate(props.subjectsService.getSubjects(sectionId!!))
            if(!result.header.ok) {
                return
            }
        }
        }
    }

    async function handleEditSection(workingHours: SectionModel.WorkingHours) {
        const editSectionAction = sectionDetails?.result?.body?.actions
            .find(action => action.name === SectionModel.EDIT_SECTION_ACTION)
        if(editSectionAction) {
            const result = await props.sectionsService.updateSection(sectionId, workingHours).send()
            setSectionUpdate(props.sectionsService.getSection(sectionId))
            if(!result.header.ok)
                return
        }
    }

    async function handleAddSubject(subject: SubjectModel.Subject) {
        const addSubjectAction = subjectsList?.result?.body?.actions
            .find(action => action.name === SubjectModel.ADD_SUBJECT_ACTION)
        if(addSubjectAction) {
            const result = await props.subjectsService.addSubject(sectionId, subject).send()
            //setSubjectsUpdate(props.subjectsService.getSubjects(sectionId))
            if(!result.header.ok)
                return
        }
    }

    const checkPriority = () => subjects?.find(subject => subject.priority) ? true : false

    return(
        <>
        {section ? 
            <SectionHeader priority={checkPriority()} section={section} handleEditSection={handleEditSection} handleAddSubject={handleAddSubject}/> 
        : null }
        {subjects && subjects.length ?  
            <Container>
                <SubjectsList subjects={subjects} handleDeleteSubject={handleDeleteSubject} handleEditSubject={handleEditSubject}/>
            </Container>
            :
            <Header>There are no subjects yet</Header>
        }
        </>
       
        
    )
}