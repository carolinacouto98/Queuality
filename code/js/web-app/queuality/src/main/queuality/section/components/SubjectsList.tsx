import { useState } from 'react'
import { Card, Grid, Header, Icon, Input, List, Transition } from 'semantic-ui-react'
import { Subject } from '../../../common/model/SubjectModel'
import DeleteModal from './DeleteModal'

type SubjectsListProps = {
    subjects: Subject[]
    handleDeleteSubject(subjectId: string): void
    handleEditSubject(subjectId: string, subject: Subject): void
}

export class VisibleDetails {
    idx?: string
    visible?: boolean = false
    editName?: boolean = false
}

export function SubjectsList(props: SubjectsListProps) {
    const [detailsHidden, setDetailsHidden] = useState<VisibleDetails | undefined>()
    const [rotated, setRotated] = useState<'clockwise' | 'counterclockwise' | undefined>()

    function showSubjectDetails(id: string) {
        if(detailsHidden?.idx !== id)
            setDetailsHidden({idx:id, visible: true})
        else 
            setDetailsHidden({idx: id, visible: !detailsHidden?.visible})   
        setRotated((detailsHidden?.visible) ? undefined : 'clockwise')    
       
    }

    function setVisible(id: string) {
        return detailsHidden?.idx === id && detailsHidden?.visible
    }

    function editSubjectDescription(subjectId: string, subjectDescription: string) {
        if(detailsHidden?.idx !== subjectId)
            setDetailsHidden({idx:subjectId, visible: false, editName: true})
        else 
            setDetailsHidden({idx:subjectId, visible: false, editName: !detailsHidden?.editName})
        /*if(props.handleEditSubject)        
            props.handleEditSubject(subjectId, new Subject(undefined, subjectDescription))*/
    }
    return(
        <Card.Group centered>
            {props.subjects.map(subject => {
                return(
                    <Card fluid key={subject.name}>
                        <Card.Content>
                            <Grid>
                                <Grid.Row columns='3'>
                                    <Grid.Column width='1' style={{paddingLeft:'0px', paddingRight:'0px'}}>
                                        <Icon rotated={rotated} onClick={() => showSubjectDetails(subject.name!!)} name='chevron right' link></Icon>
                                    </Grid.Column>
                                    <Grid.Column width='9' textAlign='left' style={{paddingLeft:'0px'}}>
                                        <Grid.Row>
                                            <h4>
                                                {`${subject.name}. `}
                                                {subject.name === detailsHidden?.idx && detailsHidden?.editName ?
                                                    <Input 
                                                        autoFocus                                                   
                                                        placeholder='Subject Description'
                                                        defaultValue={subject.description} 
                                                    /> :
                                                    subject.description}
                                            </h4>
                                        </Grid.Row>  
                                        <Grid.Row>
                                            <Icon onClick={() => editSubjectDescription(subject.name!!, '')} name = 'edit outline' link/>
                                        </Grid.Row>    
                                    </Grid.Column>
                                    <Grid.Column textAlign='right'>
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
                                        <Grid.Row textAlign='left'>                                       
                                            <Header as='h5'>Desks:</Header>                                    
                                            <List bulleted>
                                                {subject.desks!!.map(desk => {
                                                    return(
                                                        <List.Item key={desk}>{desk}</List.Item>                                                    
                                                    )
                                                })}
                                            </List>
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