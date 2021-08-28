import { ChangeEvent, useRef, useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { WorkingHours } from '../../../common/model/SectionModel'

type UpdateHoursModalProps = {
    workingHours: WorkingHours
    handleEditSection(workingHours: WorkingHours): void
}

export default function UpdateHoursModal(props: UpdateHoursModalProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [duration, setDuration] = useState<number>()
    const openTimeRef = useRef<HTMLInputElement>(null)
    const endTimeRef = useRef<HTMLInputElement>(null)

    function handleDurationOnChange(evt: ChangeEvent<HTMLInputElement>) {
        const value: number = +evt.target.value
        if(value >= WorkingHours.MINDURATION)
            setDuration(value)
        else evt.preventDefault()
    }

    function editWorkingHours() {
        const openTime = (openTimeRef.current?.value ? openTimeRef.current?.value : props.workingHours.begin) 
        const endTime = (endTimeRef.current?.value ? endTimeRef.current?.value : props.workingHours.end) 
        const durationInput = (duration ? duration : props.workingHours.duration)
        if(props.handleEditSection) 
            props.handleEditSection(new WorkingHours(
                openTime, 
                endTime, 
                durationInput))
    }

    return(        
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button>Update Hours</Button>}
        >
            <Modal.Header>Update Working Hours</Modal.Header>
            <Modal.Content>
                <label htmlFor="time">Open Time:</label>
                <input style={{margin:'1%'}} ref={openTimeRef} type='time' />
                <br/>
                <label htmlFor="time">Close Time:</label>
                <input style={{margin:'1%'}} ref={endTimeRef} type='time'/>
                <br/>
                <label>Appointment Duration (minutes):</label>
                <input style={{margin:'1%'}} type='number' placeholder='Ex: 30' onChange={handleDurationOnChange} />
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => {
                    setOpen(false)
                }}>
                Cancel
                </Button>
                <Button positive onClick={() => {
                    setOpen(false)
                    editWorkingHours()
                }}>
                Update
                </Button>
            </Modal.Actions>
        </Modal>
    )
}