import { useEffect, useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

type DeleteModalProps = {
    trigger?: React.ReactNode,
    title: string,
    content: string,
    open?:boolean,
    onOpen?: () => void,
    onConfirm: () => void,
    onClose?: () => void,
    hidden?: boolean
}

export default function DeleteModal(props: DeleteModalProps) {
    const [open, setOpen] = useState<boolean | undefined>(props.open)

    useEffect(() => setOpen(props.open), [props.open])

    return(
        <Modal
            size='tiny'
            open={open}
            onClose={() => {
                setOpen(false)
                props.onClose?.()
            }}
            onOpen={() => setOpen(true)}
            trigger={props.trigger}
            hidden={props.hidden}
        >
            <Modal.Header>{props.title}</Modal.Header>
            <Modal.Content>{props.content}</Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => {
                    setOpen(false)
                    props.onClose?.()
                }}>No</Button>
                <Button positive onClick={() => {
                    setOpen(false)
                    props.onConfirm()
                    props.onClose?.()
                }}>Yes</Button>
            </Modal.Actions>
        </Modal>
    )
}