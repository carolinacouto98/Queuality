import { useState, useRef } from 'react'
import { Header, Button, Modal } from 'semantic-ui-react'
import * as Model from '../../../common/model/SectionModel'

type SectionsHeaderProps = {
    handleAddSection(section: Model.Section): void
}

export default function SectionsHeader(props: SectionsHeaderProps) {
    const [open, setOpen] = useState(false)
    const sectionNameRef = useRef<HTMLInputElement>(null)
    const openTimeRef = useRef<HTMLInputElement>(null)
    const endTimeRef = useRef<HTMLInputElement>(null)
    const durantionRef = useRef<HTMLInputElement>(null)

    function handleSubmitSection() {
        const sectionName = sectionNameRef.current?.value
        const openTime = openTimeRef.current?.value
        const endTime = endTimeRef.current?.value
        const duration = durantionRef.current?.value
        setOpen(false)
        if(sectionName && openTime && endTime && duration)
            props.handleAddSection(new Model.CreateSection(sectionName!!, new Model.WorkingHours(openTime!!, endTime!!, duration!!)))
    }
    
    return (
        <>
        <div> 
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button color='instagram' floated='right'>Add Section</Button>}
                >
                <Modal.Header>Add a section</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <label>Section Name:</label>
                        <input ref={sectionNameRef}required type='text' placeholder='Section Name'/>
                        <br/>
                        <label htmlFor="time">Open Time:</label>
                        <input ref={openTimeRef} required type='time' />
                        <br/>
                        <label htmlFor="time">End Time:</label>
                        <input ref={endTimeRef} required type='time' />
                        <br/>
                        <label>Duration (minutes):</label>
                        <input ref={durantionRef} required min='0' max='60' type='number' placeholder='Duration'/>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                    Nope
                    </Button>
                    <Button
                    color='instagram'
                    content="Submit"
                    labelPosition='right'
                    icon='checkmark'
                    onSubmit={handleSubmitSection}
                    />
                </Modal.Actions>
            </Modal>           
            <Header floated='left'>Sections:</Header>
        </div>
      </>
    )
}