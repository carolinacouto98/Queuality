import { useState, useRef, ChangeEvent } from 'react'
import { Header, Button, Modal, Message } from 'semantic-ui-react'
import * as Siren from '../../../common/Siren'
import * as Model from '../../../common/model/SectionModel'

type SectionsHeaderProps = {
    actions?: Siren.Action[]
    handleAddSection(section: Model.Section): void
}

export default function SectionsHeader(props: SectionsHeaderProps) {
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState(true)
    const [duration, setDuration] = useState<number>()
    const sectionNameRef = useRef<HTMLInputElement>(null)
    const openTimeRef = useRef<HTMLInputElement>(null)
    const endTimeRef = useRef<HTMLInputElement>(null)

    function handleSubmitSection() {
        const sectionName = sectionNameRef.current?.value
        const openTime = openTimeRef.current?.value
        const endTime = endTimeRef.current?.value
        if(sectionName && openTime && endTime && duration) {
            setOpen(false)
            props.handleAddSection(new Model.CreateSection(sectionName!!, new Model.WorkingHours(openTime!!, endTime!!, duration)))
        }
        else setErrorMessage(false)
    }

    function handleDurationOnChange(evt: ChangeEvent<HTMLInputElement>) {
        const value: number = +evt.target.value
        if(value >= Model.WorkingHours.MINDURATION)
            setDuration(value)
        else evt.preventDefault()
    }

    return (
        <div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => {
                    setOpen(true)
                    setErrorMessage(true)
                }}
                open={open}
                trigger={<Button disabled={!props.actions?.find(action => action.name === Model.ADD_SECTION_ACTION)} style={{backgroundColor: '#33BEFF', color: '#FFFFFF'}} floated='right'>Add Section</Button>}
                >
                <Modal.Header>Add a section</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Message
                            hidden = {errorMessage}
                            error
                            header='There was some errors with your submission'
                            list={[
                            'You must include a section name, open time, end time and duration of the appointments of this section.'
                        ]}/>
                        <label>Section Name:</label>
                        <input style={{margin:'1%'}} ref={sectionNameRef} type='text' placeholder='Section Name'/>
                        <br/>
                        <label htmlFor="time">Open Time:</label>
                        <input style={{margin:'1%'}} ref={openTimeRef} type='time' />
                        <br/>
                        <label htmlFor="time">Close Time:</label>
                        <input style={{margin:'1%'}} ref={endTimeRef} type='time' />
                        <br/>
                        <label>Appointment Duration (minutes):</label>
                        <input style={{margin:'1%'}} type='number' placeholder='Ex: 30' onChange={handleDurationOnChange}/>                       
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                    </Button>
                    <Button
                    disabled = {false}
                    style={{backgroundColor: '#33BEFF'}}
                    content="Submit"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleSubmitSection}
                    />
                </Modal.Actions>
            </Modal>           
            <Header floated='left'>Sections:</Header>
        </div>
    )
}