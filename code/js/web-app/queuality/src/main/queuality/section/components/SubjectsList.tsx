import { useState } from 'react'
import { Grid, Icon, List, Transition } from 'semantic-ui-react'
import { Subject } from '../../../common/model/SubjectModel'
import * as Siren from '../../../common/Siren'

type SubjectsListProps = {
    subjects: Subject[]    
    entities: Siren.EmbeddedEntity<Subject>[]
}

export type VisibleList = {
    visible: boolean,
    idx?: string
  }

export function SubjectsList(props: SubjectsListProps) {
    const [invisibleList, setInvisibleList] = useState<string>()
    return(
        <List floated='left' size='large' style={{textAlign: 'left'}} divided>
            {props.entities.map(entity => {
                return(
                    <List.Item key={entity.properties?.name}>
                        <Grid columns='2'>
                            <Grid.Row as='a' onClick={() =>
                                    setInvisibleList(entity.properties?.name)
                                }>
                                <Icon name='triangle right'></Icon>                    
                                <List.Header>{entity.properties?.name}. {entity.properties?.description}</List.Header>
                            </Grid.Row>
                        </Grid>
                            <Transition visible={invisibleList === entity.properties?.name} animation='scale' duration={500}>
                                <List.List>
                                    <List.Item>
                                        <List.Item>
                                            <List.Header>Priority: {entity.properties?.priority.toString()}</List.Header>
                                        </List.Item>
                                        <List.Content>
                                            <List.Header>Appointment Desks:</List.Header>
                                            {entity.properties?.desks.map((desk, index) => <List.Description key={index} style={{textIndent:'10%'}} bulleted >{desk}</List.Description>)}
                                        </List.Content>
                                    </List.Item>
                                </List.List>
                            </Transition>
                    </List.Item>  
                )
            })}
        </List>
    )
}