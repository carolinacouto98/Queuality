import { useEffect } from 'react'
import { ChangeEvent, useState } from 'react'
import { Button, Checkbox, CheckboxProps, Modal, Popup } from 'semantic-ui-react'
import * as SubjectModel from '../../../common/model/SubjectModel'
import AddDesksDropdown from './AddDesksDropdown'
import * as Siren from '../../../common/Siren'

type AddSubjectModalProps = {
    priority: boolean
    handleAddSubject(subject: SubjectModel.Subject): void
    actions?: Siren.Action[]
}

export function AddSubjectModal(props: AddSubjectModalProps) {

    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [priority, setPriority] = useState<boolean | undefined>(false)
    const [desks, setDesks] = useState<string[]>([])
    const [disabled, setDisabled] = useState<boolean>(true)

    const checkbox = <Checkbox disabled = {props.priority} onChange={(_event:  React.FormEvent<HTMLInputElement>, data: CheckboxProps) => setPriority(data.checked)} />

    const updatedDesks = (desks: string[]) => setDesks(desks)

    useEffect(() => {
        setDisabled(!name || !description || !name.length || !description.length)
    }, [name, description])

    function addSubject() {
        if(name && description && props.handleAddSubject) {
            setDisabled(false)
            props.handleAddSubject(new SubjectModel.Subject(name, description, priority, undefined, undefined, undefined, desks))
            setOpen(false)
        }

    }

    function handleNameChange(evt: ChangeEvent<HTMLInputElement>) {
        evt.preventDefault()
        setName(evt.target.value)
    }

    function handleDescriptionChange(evt: ChangeEvent<HTMLInputElement>) {
        evt.preventDefault()
        setDescription(evt.target.value) 
    }
    
    return(        
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button disabled={!props.actions?.find(action => action.name === SubjectModel.ADD_SUBJECT_ACTION)} icon='add' style={{marginBottom:'1%', marginLeft:'1088px'}}/>}
        >
            <Modal.Header>Add New Subject</Modal.Header>
            <Modal.Content>
                <label>Name: </label>
                <div className='ui input fluid' style={{marginLeft:'1%'}}>
                    <input   
                        onChange={handleNameChange}
                        type = 'text'                                               
                        placeholder='Subject Name' />
                </div>
                <br/>
                <label>Description: </label>
                <div className='ui input fluid' style={{marginLeft:'1%'}}>
                    <input
                        onChange={handleDescriptionChange}
                        type = 'text'                                               
                        placeholder='Subject Description' />
                </div>
                <br/>
                <label>Priority: </label>
                {props.priority ? 
                    <Popup content="There's already a subject with priority enabled" trigger={checkbox} />
                    : checkbox
                }
                <br/>
                <label>Desks:</label>
                <AddDesksDropdown desks={desks} handleUpdatedDesks={updatedDesks}/>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => {
                    setOpen(false)
                }}>
                Cancel
                </Button>
                <Button disabled={disabled} positive onClick={addSubject}>
                Add
                </Button>
            </Modal.Actions>
        </Modal>
    )
}