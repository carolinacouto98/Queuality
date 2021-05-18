import React, {useState, useRef} from 'react'
import { Dropdown, Modal, Button, Checkbox, Input } from 'semantic-ui-react'
import { Queue } from './queueModel'


export interface QueueDisplayProps {
    name: string,
    subject: string,
    priority: boolean,
    _id: string,
    deleteQueue?: (queue: Queue) => void
    editQueue?: (queue: Queue) => void
} 

/**
 * @param {QueueDisplayProps} props - The props object.
 * @returns the React Element used to render the component.
 */

export function FunctionsDropdown(prop: QueueDisplayProps) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const subjectInputRef = useRef<HTMLInputElement>(null)
    const [priority, setPriority] = useState(false)

    function editQueue() {
        setEditOpen(false)
        if(prop.editQueue)
            prop.editQueue(new Queue(prop.name, subjectInputRef.current!.value, priority, prop._id))
    }

    function deleteQueue() {
        setDeleteOpen(false)
        if(prop.deleteQueue)
            prop.deleteQueue(new Queue(prop.name, prop.subject, prop.priority, prop._id))
    }
    
    return (
        <>
        <Dropdown icon='ellipsis vertical'>
            <Dropdown.Menu>
                <Dropdown.Item text='Edit Queue' onClick = {() => setEditOpen(true)} />
                <Dropdown.Item text='Delete Queue' onClick = {() => setDeleteOpen(true)} />
            </Dropdown.Menu>
        </Dropdown>
        <Modal
            onClose={() => setEditOpen(false)}
            open={editOpen}
        >
        <Modal.Header>Edit Queue</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <div>
                    <Input>
                        <input type='text' ref={subjectInputRef} placeholder='Subject' defaultValue={prop.subject}/>
                    </Input>
                </div>
                <div>
                    {prop.priority ?
                        <Checkbox onChange={() => setPriority(!prop.priority)} label='Priority' defaultChecked/>
                        :
                        <Checkbox onChange={() => setPriority(!prop.priority)} label='Priority' />
                    }
                </div>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setEditOpen(false)}>
            Cancel
          </Button>
          <Button
            content='Submit'
            labelPosition='right'
            onClick={editQueue}
            />
        </Modal.Actions>
      </Modal>
      <Modal
            onClose={() => setDeleteOpen(false)}
            open={deleteOpen}
        >
        <Modal.Header>Delete Queue</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <p>
                    Are you sure you want to delete this queue?
                </p>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button onClick={deleteQueue} color='blue'>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
      </>
    )
}