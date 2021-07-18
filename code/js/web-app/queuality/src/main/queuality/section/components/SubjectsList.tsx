import { useState } from 'react'
import { Card, Divider, Grid, Header, Icon, Item, List, Transition } from 'semantic-ui-react'
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
        <Card.Group centered>
        {props.entities.map(entity => {
            return(
                <Card fluid>
                    <Card.Content>
                        <Grid>
                            <Grid.Row columns='2'>
                                <Grid.Column width='1' style={{paddingLeft:'0px', paddingRight:'0px'}}>
                                    <Icon name='chevron right' link></Icon>
                                </Grid.Column>
                                <Grid.Column width='15' textAlign='left' style={{paddingLeft:'0px'}}>
                                    <Header>{`${entity.properties?.name}. ${entity.properties?.description}`}</Header>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row textAlign='left' style={{marginLeft:'5%'}}>
                                <Grid.Column>
                                    <Grid.Row>
                                        Priority: 
                                        {entity.properties?.priority ?
                                        <Icon style={{margin:'5px'}} name='check circle outline'/>
                                        : <Icon name='times circle outline'/>
                                        }
                                    </Grid.Row>
                                    <Divider hidden style={{margin:'7px'}}/>
                                    <p>Desks:</p>                                    
                                    <List bulleted>
                                        {entity.properties?.desks.map(desk => {
                                            return(
                                                    <List.Item style={{marginLeft:'2%'}}>{desk}</List.Item>
                                                
                                            )
                                        })}
                                    </List>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
                
            )
        })}   
        </Card.Group>
    )
}