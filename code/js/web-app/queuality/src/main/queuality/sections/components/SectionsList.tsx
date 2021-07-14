import { useReducer } from 'react'
import { Icon, List, Modal, Button } from 'semantic-ui-react'
import { Section, SECTION_SUBJECT_RELATION, SELF } from '../../../common/model/SectionModel'
import * as Siren from '../../../common/Siren'
import { Link } from 'react-router-dom'

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

type ListProps = {
    sections: Section[]
    entities: Siren.EmbeddedEntity<Section>[]
    handleDeleteSection(sectionId: string): void
}

function getSectionLink(entities: Siren.EmbeddedEntity<Section>[], id: string): string | undefined {
  return entities.find(entity => entity.properties?._id === id)?.links?.find(link => link.rel.includes(SELF))?.href.replace('/api','')
}

export default function SectionList(props: ListProps) {
  const [state, dispatch] = useReducer(reducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state
  let sectionId: string
    return(
      <>
        <List divided size='large' relaxed animated verticalAlign='middle'>       
            { props.entities.map(entity => {      
              sectionId = entity.properties?._id!!
              const link = getSectionLink(props.entities, sectionId)
              return (
                <List.Item key={entity.properties?._id}>
                  <List.Content floated='right'>
                    <Icon link name='trash alternate outline' onClick={() => dispatch({ type: 'open', size: 'tiny' })} />
                  </List.Content>
                  <List.Content floated='left'as={Link} to={link}>{sectionId}</List.Content>
                </List.Item>
              )}
            )}
        </List>
        <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
        >
          <Modal.Header>Delete Section</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete section {sectionId!!}?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => dispatch({ type: 'close' })}>
              No
            </Button>
            <Button positive onClick={() => {
              dispatch({ type: 'close' })
              props.handleDeleteSection(sectionId)
            }}>
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
    </>
    )
}