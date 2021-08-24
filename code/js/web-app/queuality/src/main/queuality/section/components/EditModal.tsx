import { useRef, useState } from 'react'
import { Button, Checkbox, CheckboxProps, Modal, Popup } from 'semantic-ui-react'
import { Subject } from '../../../common/model/SubjectModel'
import AddDesksDropdown from './AddDesksDropdown'

type EditModalProps = {
    priority: boolean
    subject: Subject
    handleEditSubject(subjectId: string, subject: Subject): void
}

export default function EditModal(props: EditModalProps) {    
    const [open, setOpen] = useState<boolean>(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const [priority, setPriority] = useState<boolean | undefined>(false)
    const checkboxPriority = !props.subject.priority && props.priority
    const [desks, setDesks] = useState<string[] | undefined>(props.subject.desks)

    const updatedDesks = (desks: string[]) => setDesks(desks)

    const checkbox = <Checkbox defaultChecked={props.subject.priority} disabled = {checkboxPriority} onChange={(event:  React.FormEvent<HTMLInputElement>, data: CheckboxProps) => setPriority(data.checked)} />

    function editSubject() {
        const description = (nameRef.current?.value ? nameRef.current?.value.trim() : props.subject.description)
        const desksInput = (desks?.length ? desks : undefined)  
        setOpen(false)
        if(props.handleEditSubject)
            props.handleEditSubject(
                props.subject.name!!, 
                new Subject(undefined, description, priority, undefined, undefined, undefined, desksInput))
    }
    
    return(        
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button>Update</Button>}
        >
            <Modal.Header>Update Subject {props.subject.name}</Modal.Header>
            <Modal.Content>
                <label>Name: </label>
                <div className='ui input fluid' style={{marginLeft:'1%'}}>
                    <input   
                        ref = {nameRef}
                        type = 'text'                                               
                        placeholder='Subject Description'
                        defaultValue={props.subject.description} />
                </div>
                <br/>
                <label>Priority: </label>
                {checkboxPriority ? 
                    <Popup content="There's already a subject with priority enabled" trigger={checkbox} />
                    : checkbox
                }
                <br/>
                <label>Desks:</label>
                <AddDesksDropdown desks = {props.subject.desks!!} handleUpdatedDesks={updatedDesks}/>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => {
                    setOpen(false)
                }}>
                Cancel
                </Button>
                <Button positive onClick={editSubject}>
                Update
                </Button>
            </Modal.Actions>
        </Modal>
    )
}