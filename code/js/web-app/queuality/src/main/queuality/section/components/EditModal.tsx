import { useRef, useState } from 'react'
import { Button, Checkbox, CheckboxProps, List, Modal } from 'semantic-ui-react'
import { Subject } from '../../../common/model/SubjectModel'

type EditModalProps = {
    subject: Subject
    handleEditSubject(subjectId: string, subject: Subject): void
}

export default function EditModal(props: EditModalProps) {    
    const [open, setOpen] = useState<boolean>(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const [priority, setPriority] = useState<boolean | undefined>(false)
    
    return(
        
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button>Update</Button>}
        >
            <Modal.Header>Update Subject</Modal.Header>
            <Modal.Content>
                <label>Name:</label>
                <div className='ui input'>
                    <input   
                        ref = {nameRef}
                        type = 'text'                                               
                        placeholder='Subject Description'
                        defaultValue={props.subject.description} />
                </div>
                <br/>
                <Checkbox onChange={(event:  React.FormEvent<HTMLInputElement>, data: CheckboxProps) => setPriority(data.checked)} label='Priority' />
                <br/>
                <label>Desks:</label>
                <List>
                    {props.subject.desks?.map(desk => {
                        <List.Item key={desk}>{desk}</List.Item>
                    })}
                </List>
                <div className='ui input'>
                    <input placeholder='New Desk'/>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => {
                    setOpen(false)
                }}>
                Cancel
                </Button>
                <Button positive onClick={() => {
                    setOpen(false)
                    props.handleEditSubject(props.subject.name!!, new Subject(undefined, nameRef.current?.value!!, priority))
                }}>
                Update
                </Button>
            </Modal.Actions>
        </Modal>
    )
}