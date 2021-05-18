import React, {useState, useRef} from 'react'
import { Modal, Button, Grid, Icon, Checkbox, Message, Input, Transition } from 'semantic-ui-react'
import { Queue } from './queueModel'

export interface NewQueueProps {    
    addNewQueue?: (newQueue: Queue) => void
    err: String
}

export function NewQueue(props: NewQueueProps) {
    const [open, setOpen] = useState(false)
    const [nameMessage, hideNameMessage] = useState(true)
    const [subjectMessage, hideSubjectMessage] = useState(true)
    const [priorityMessage, hideErrMessage] = useState(true)
    const nameInputRef = useRef<HTMLInputElement>(null)
    const subjectInputRef = useRef<HTMLInputElement>(null)
    const [priority, setPriority] = useState(false)
    

    function addQueue() {
        (nameInputRef.current!.value === '') ? hideNameMessage(false) :  hideNameMessage(true);
        (subjectInputRef.current!.value === '') ? hideSubjectMessage(false) : hideSubjectMessage(true)
        if(nameInputRef.current!.value !== '' && subjectInputRef.current!.value !== '') {
            if(props.addNewQueue && props.err === '') {
                props.addNewQueue(new Queue(nameInputRef.current!.value, subjectInputRef.current!.value, priority));
                if(props.err !== '') 
                    hideErrMessage(false)
                else {
                    hideErrMessage(true)
                    setOpen(false)
                }
            }
        }
        
    }

    return (
        <Modal 
            onClose = {() => setOpen(false)}
            onOpen = {() => setOpen(true)}
            open = {open}
            trigger = {
                <Button fluid inverted style={{color:'#85C1E9'}} animated='fade'>
                    <Button.Content size='large' hidden>Add Queue</Button.Content>
                    <Button.Content visible>
                        <Icon name='add' />
                    </Button.Content>
                </Button>
            }
        >
            <Modal.Header>Add a new Queue</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Grid column='2'>
                        <Grid.Row>
                            <Grid.Column floated='left' width='5'>
                                <Input>
                                    <input type='text' ref={nameInputRef} required placeholder='Name'/> 
                                </Input>                                
                            </Grid.Column>  
                            <Grid.Column width='5'>
                                <Transition visible={!nameMessage} animation='scale' duration={500}>
                                    <Message hidden={nameMessage} compact warning>
                                        <p>Please insert a name</p>
                                    </Message>
                                </Transition>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column floated='left'>
                                <Input>
                                    <input type='text' ref={subjectInputRef} required placeholder='Subject'/>
                                </Input>
                            </Grid.Column>
                            <Grid.Column width='5'>
                                <Transition visible={!subjectMessage} animation='scale' duration={500}>
                                    <Message hidden={subjectMessage} compact warning>
                                        <p>Please insert a subject</p>
                                    </Message>
                                </Transition>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column floated = 'left'>
                                <Checkbox onChange={() => setPriority(!priority)} label='Priority' />
                            </Grid.Column>
                            <Grid.Column width='5'>
                                <Transition visible={!priorityMessage} animation='scale' duration={500}>
                                    <Message hidden={priorityMessage} compact warning>
                                        <p>Please insert a subject</p>
                                    </Message>
                                </Transition>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button inverted style={{color:'#85C1E9'}} onClick={() => { 
                    setOpen(false) 
                    hideNameMessage(true) 
                    hideSubjectMessage(true)
                }}>
                    Cancel
                </Button>
                <Button onClick={addQueue} color = 'blue'>
                    Add Queue
                </Button>
            </Modal.Actions>
        </Modal>
    )
}