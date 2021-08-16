import { useState } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

type DeleteModalProps = {
    trigger: React.ReactNode,
    title: string,
    content: string,
    onConfirm: () => void,
    hidden?: boolean
}

export default function DeleteModal(props: DeleteModalProps) {
    const [open, setOpen] = useState<boolean>(false)

    return(
        <Modal
            size='tiny'
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button color='red' content='Remove' icon='close'/>}
            hidden={props.hidden}
        >
            <Modal.Header>props.title</Modal.Header>
            <Modal.Content>props.content</Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => setOpen(false)}>No</Button>
                <Button positive onClick={() => {
                    setOpen(false)
                    props.onConfirm()
                }}>Yes</Button>
            </Modal.Actions>
        </Modal>
    )
}