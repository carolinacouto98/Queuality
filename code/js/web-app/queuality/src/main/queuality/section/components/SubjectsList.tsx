import { useState } from 'react'
import { Icon, List } from 'semantic-ui-react'
import { Subject } from '../../../common/model/SubjectModel'
import * as Siren from '../../../common/Siren'

type SubjectsListProps = {
    subjects: Subject[]    
    entities: Siren.EmbeddedEntity<Subject>[]
}

export function SubjectsList(props: SubjectsListProps) {
    const [subjectDetails, setSubjectDetails] = useState<boolean>(false)
    return(
        <List>
            {props.entities.map(entity => {
                <List.Item as='a' onClick={() => setSubjectDetails(true)}>
                    <Icon name='triangle right' />
                    <List.Content>
                        <List.Header>{entity.properties?.id}. {entity.properties?.description}</List.Header>
                    </List.Content>
                    <List.List>
                        <List.Item>
                            <List.Content>
                                <List.Header>Desks</List.Header>
                                {entity.properties?.desks.map(desk => <List.Description>{desk}</List.Description>)}
                            </List.Content>
                        </List.Item>
                    </List.List>
                </List.Item>  
            })}
        </List>
    )
}