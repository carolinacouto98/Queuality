import { List } from 'semantic-ui-react'
import { Section, SELF } from '../../../common/model/SectionModel'
import * as Siren from '../../../common/Siren'
import { Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'

type ListProps = {
    sections: Section[]
    entities: Siren.EmbeddedEntity<Section>[]
    handleDeleteSection(sectionId: string): void
}

function getSectionLink(entities: Siren.EmbeddedEntity<Section>[], id: string): string | undefined {
  return entities.find(entity => entity.properties?._id === id)?.links?.find(link => link.rel.includes(SELF))?.href.replace('/api','')
}

export default function SectionList(props: ListProps) {
    return(
        <List divided size='large' relaxed animated verticalAlign='middle'>       
            { props.sections.map(section => {   
              const link = getSectionLink(props.entities, section?._id!!)
              return (
                <List.Item key={section?._id!!}>
                  <List.Content floated='right'>
                    <DeleteModal sectionId={section?._id!!} handleDeleteSection={props.handleDeleteSection}/>
                  </List.Content>
                  <List.Content floated='left'as={Link} to={link}>{section?._id!!}</List.Content>
                </List.Item>
              )}
            )}
        </List>
    )
}