import { useState } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

type DeleteModalProps = {
    subjectName: string
    handleDeleteSubject(subjectId: string): void
    hidden?: boolean
}

export default function DeleteModal(props: DeleteModalProps) {
    const [open, setOpen] = useState<boolean>(false)    

    function deleteSubject() {
        if(props.handleDeleteSubject) {
            setOpen(false)
            props.handleDeleteSubject(props.subjectName)
        }
    }

    return(
        <Modal
            size='tiny'
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Icon disabled={props.hidden} name='trash alternate outline' link/>}
        >
            <Modal.Header>Delete Subject</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete subject {props.subjectName!!}?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => {
                    setOpen(false)
                }}>
                No
                </Button>
                <Button positive onClick={deleteSubject}>
                Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}