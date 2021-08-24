import { useState } from 'react'
import { Card, Grid, Header, Icon, List, Transition } from 'semantic-ui-react'
import { Subject } from '../../../common/model/SubjectModel'
import DeleteModal from './DeleteModal'
import '../../sections/components/timeInput.css'
import EditModal from './EditModal'

type SubjectsListProps = {
    subjects: Subject[]
    handleDeleteSubject(subjectId: string): void
    handleEditSubject(subjectId: string, subject: Subject): void
}

export class VisibleDetails {
    idx?: string
    visible?: boolean = false
    rotated?: 'clockwise' | 'counterclockwise' | undefined
}

export function SubjectsList(props: SubjectsListProps) {
    const [detailsHidden, setDetailsHidden] = useState<VisibleDetails | undefined>()

    function showSubjectDetails(id: string) {
        if(detailsHidden?.idx !== id)
            setDetailsHidden({idx:id, visible: true, rotated: 'clockwise'})
        else {
            setDetailsHidden({idx: id, visible: !detailsHidden?.visible, rotated: (detailsHidden.visible ? undefined : 'clockwise')})
        }
       
    }

    function setVisible(id: string) {
        return detailsHidden?.idx === id && detailsHidden?.visible
    }

    function checkPriority() {
        return (props.subjects.find(subject => subject.priority)) ? true : false
    }
    return(
        <Card.Group centered>
            {props.subjects.map(subject => {
                return(
                    <Card fluid key={subject.name}>
                        <Card.Content>
                            <Grid>
                                <Grid.Row columns='equal'>
                                    <Grid.Column width='1' style={{paddingLeft:'0px', paddingRight:'0px'}}>
                                        <Icon rotated={(detailsHidden?.idx === subject.name) ? detailsHidden?.rotated : undefined} onClick={() => showSubjectDetails(subject.name!!)} name='chevron right' link></Icon>
                                    </Grid.Column>
                                    <Grid.Column textAlign='left' style={{paddingLeft:'0px'}}>
                                            <Header size='small'>
                                                {`${subject.name}. ${subject.description}`}
                                            </Header>  
                                    </Grid.Column>
                                    <Grid.Column width='2' textAlign='right'>
                                        <DeleteModal subjectName={subject.name!!} handleDeleteSubject={props.handleDeleteSubject} />
                                    </Grid.Column>
                                </Grid.Row>
                                <Transition visible={setVisible(subject.name!!)} animation='scale' duration={500}>
                                    <div style={{padding:'0px',  marginLeft:'6%', marginBottom:'14px'}}>
                                        <Grid.Row textAlign='left'>                                    
                                            <Header  as='h5'>                                            
                                                Priority:
                                                {subject.priority ?
                                                <Icon style={{margin:'5px'}} name='check circle outline'/>
                                                : <Icon style={{margin:'5px'}} name='times circle outline'/>
                                                }   
                                            </Header>  
                                        </Grid.Row>
                                        <Grid.Row textAlign='left' columns='2'>   
                                            <Grid.Column>                                    
                                                <Header as='h5'>Desks:</Header>                                    
                                                <List bulleted>
                                                    {subject.desks?.map(desk => {
                                                        return(
                                                            <List.Item key={desk}>{desk}</List.Item>                                                    
                                                        )
                                                    })}
                                                </List>
                                            </Grid.Column>
                                            <Grid.Column style={{marginLeft:'1000%'}}>
                                                <EditModal priority={checkPriority()} subject={subject} handleEditSubject={props.handleEditSubject}></EditModal>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </div>
                                </Transition>
                            </Grid>
                        </Card.Content>
                    </Card>                
                )
            })}   
            </Card.Group>
        )
}