import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppointmentsService } from '../../common/services/AppointmentsService'

import FullCalendar, { EventClickArg, EventDropArg } from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction';

import { Button, Container, Modal } from 'semantic-ui-react'
import * as API from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'
import * as Model from '../../common/model/AppointmentModel'

type AppointmentsPageProps = {
    service: AppointmentsService
    subject: string,
    desk: string
}


type AppointmentsInfo = API.FetchInfo<Siren.Entity<void, Model.Appointment>>
type AppointmentsUpdate = API.Request<Siren.Entity<void, Model.Appointment>>

type Param = {
    sectionId: string
}

function getAppointmentsValue(appointment?: AppointmentsInfo) : Model.Appointment[] | undefined {
    const entities = appointment?.result?.body?.entities
    return entities?.map(entity => entity.properties!!)
}

export default function AppointmentsPage(props: AppointmentsPageProps) {

    //const [events, setEvents] = useState<any>([])
    const { sectionId } = useParams<Param>()    
    const [eventClickedDetails, setEventClickedDetails] = useState({id: '', title: '', start: ''})
    const [open, setOpen] = useState(false)
    //const [events, setEvents] = useState({id: '',})

    const [appointments, setAppointments] = useState<AppointmentsInfo>()
    const [appointmentsUpdate, setAppoinmentsUpdate] = useState<AppointmentsUpdate>(props.service.getAppointments(sectionId, props.subject, props.desk))


    useEffect(() => {
        async function sendSectionsRequest(request: AppointmentsUpdate) {
            try {
                setAppointments({ status: API.FetchState.NOT_READY })
                const result: API.Result<Siren.Entity<void, Model.Appointment>> = await request.send()
                if(!result.header.ok) {
                    return
                }
                setAppointments({
                    status: result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            } catch(reason) {
                if(reason.name !== 'AbortError')
                    setAppointments({status: API.FetchState.ERROR})
            }
        }
        sendSectionsRequest(props.service.getAppointments(sectionId, props.subject, props.desk))
    }, [props.service, appointmentsUpdate])

    const handleEventClick = (info: EventClickArg) => { 
        setEventClickedDetails(prevState => ({
            ...prevState,
            id: info.event.id,
            title: info.event.title,
            start: info.event.startStr
         }))
        setOpen(true)
    }

    const handleEventDrop = (arg: EventDropArg) => {
        handleUpdateAppointment(arg.event.id, arg.event.start!!)
    }

    async function handleDeleteAppointment(appointmentId: string) {
        const appointmentsEntities = appointments?.result?.body?.entities
        if(appointmentsEntities) {
            const deleteAppointmentAction = appointmentsEntities
                .find(entity => entity.properties?._id === appointmentId)?.actions
                .find(action => action.name === Model.DELETE_APPOINTMENT_ACTION)
            if(deleteAppointmentAction) {
                const result = await props.service.deleteAppointment(appointmentId).send()
                setAppoinmentsUpdate(props.service.getAppointments(sectionId, props.subject, props.desk))
                if(!result.header.ok) {
                    return
                }
            }
        }
    }

    async function handleUpdateAppointment(appointmentId: string, date: Date) {
        const appointmentsEntities = appointments?.result?.body?.entities
        if(appointmentsEntities) {
            const updateAppointmentAction = appointmentsEntities
                .find(entity => entity.properties?._id === appointmentId)?.actions
                .find(action => action.name === Model.UPDATE_APPOINTMENT_ACTION)
            if(updateAppointmentAction) {
                const result = await props.service.updateAppointment(appointmentId, date).send()
                setAppoinmentsUpdate(props.service.getAppointments(sectionId, props.subject, props.desk))
                if(!result.header.ok) {
                    return
                }
            }
        }
    }

    const events = getAppointmentsValue(appointments)

    return (
        <Container>
        <FullCalendar
            initialView= 'dayGridMonth'
            stickyHeaderDates={true}
            dayMaxEvents={true}
            locale='pt'
            editable
            eventColor='#33BEFF'
            headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            }}
            contentHeight='auto' 
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}          
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventOverlap={false}
            events={events?.map(event => {
                return {
                    id: event._id,
                    title: event.subject,
                    start: event.date
                }
            })}
        />  
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
        <Modal.Header>{eventClickedDetails.title} {eventClickedDetails.start}</Modal.Header>
        <Modal.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button negative onClick={() => {
                setOpen(false)
                handleDeleteAppointment(eventClickedDetails.id)
            }}>
            Delete
            </Button>
        </Modal.Actions>
        </Modal>
    </Container>
    )
}