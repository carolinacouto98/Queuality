import { Container, Grid, Header } from 'semantic-ui-react'
import { Section, WorkingHours } from '../../../common/model/SectionModel'
import UpdateHoursModal from './UpdateHoursModal'
import * as Siren from '../../../common/Siren'
import * as SubjectModel from '../../../common/model/SubjectModel'

type SectionDetailsProps = {
    section: Section
    handleEditSection(workingHours: WorkingHours): void
    actions?: Siren.Action[]
}

export default function SectionDetails(props: SectionDetailsProps) {
    return (
        <Container>
            <Grid columns='equal'>
                <Grid.Column width='5'>
                    <Header style={{marginBottom:'10px'}} textAlign='left'>Opens at {props.section.workingHours?.begin}h closes at {props.section.workingHours?.end}h</Header>
                    <Header style={{marginTop:'0%', marginBottom: '1%'}} textAlign='left'>Appointments Duration: {props.section.workingHours?.duration} mins</Header>
                </Grid.Column>
                <Grid.Column textAlign='left'>
                    <UpdateHoursModal hidden={!!props.actions?.find(action => action.name === SubjectModel.EDIT_SUBJECT_ACTION)} workingHours = {props.section.workingHours!!} handleEditSection={props.handleEditSection} />
                </Grid.Column>
            </Grid>
        </Container>
    )
}