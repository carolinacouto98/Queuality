import { Container, Header, Icon } from 'semantic-ui-react'
import { Section, WorkingHours } from '../../../common/model/SectionModel'
import { Subject } from '../../../common/model/SubjectModel'
import { AddSubjectModal } from './AddSubjectModal'
import SectionDetails from './SectionDetails'
import * as Siren from '../../../common/Siren'

type SectionHeaderProps = {
    priority: boolean
    section: Section
    actions?: Siren.Action[]
    handleEditSection(workingHours: WorkingHours): void
    handleAddSubject(subject: Subject): void
}

export default function SectionHeader(props: SectionHeaderProps) {
    return(
        <Container>
            <Header size='large' style={{marginTop:'1%', marginBottom:'2%'}} textAlign='left'>
                    <Icon style={{color: '#33BEFF'}} name='chevron circle right' />
                    <Header.Content>{props.section._id}</Header.Content>
            </Header>
            <SectionDetails actions={props.actions} section={props.section!!} handleEditSection = {props.handleEditSection} />
            <AddSubjectModal actions={props.actions} priority={props.priority} handleAddSubject={props.handleAddSubject}/>
        </Container>
    )
}