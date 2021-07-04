import { Icon, List, Table } from 'semantic-ui-react'
import { Section, SECTION_SUBJECT_RELATION } from '../../../common/model/SectionModel'
import * as Siren from '../../../common/Siren'
import { Link } from 'react-router-dom'

type TableProps = {
    sections: Section[]
    entities: Siren.EmbeddedEntity<Section>[]
}

function getSectionLink(entities: Siren.EmbeddedEntity<Section>[], id: string): string | undefined {
  return entities.find(entity => entity.properties?._id === id)?.links?.find(link => link.rel.includes(SECTION_SUBJECT_RELATION))?.href.replace('/api','')
}
export default function SectionTable(props: TableProps){
    return(
      <List divided size='large' relaxed animated verticalAlign='middle'>       
          { props.sections.map(section => {        
            const link = getSectionLink(props.entities, section._id!!)
            return (
              <List.Item key={section._id}>
                 <List.Content floated='right'>
                  <Icon name='trash'/>
                </List.Content>
                <List.Content floated='left'as={Link} to={link}>{section._id}</List.Content>
              </List.Item>
            )}
          )}
      </List>
    )
}