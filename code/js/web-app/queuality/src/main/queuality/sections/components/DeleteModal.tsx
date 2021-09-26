import { useState } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

type DeleteModalProps = {
    disabled?: boolean,
    sectionId: string
    handleDeleteSection(sectionId: string): void
}

export default function DeleteModal(props: DeleteModalProps) {
    const [open, setOpen] = useState<boolean>(false)

    return(
        <Modal
            size='tiny'
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Icon disabled={props.disabled} name='trash alternate outline' link/>}
        >
            <Modal.Header>Delete Section</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete section {props.sectionId!!}?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => {
                    setOpen(false)
                }}>
                No
                </Button>
                <Button positive onClick={() => {
                    setOpen(false)
                    props.handleDeleteSection(props.sectionId)
                }}>
                Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}