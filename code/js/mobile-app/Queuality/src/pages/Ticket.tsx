/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain*/
/* eslint-disable react/prop-types */
import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { API_BASE_URL, AppContext, NGROK_PATH } from '../App'
import { TicketDetails } from '../model/TicketsModel'
import {getTicket, removeTicket, updateCurrentTicket, updateWaitingTickets } from '../services/TicketsStorage'
import * as Siren from '../common/Siren' 
import { Subject } from '../model/SubjectModel'
type TicketDisplayProps = RouteComponentProps<{
    ticket: string
}>
const Ticket: React.FC<TicketDisplayProps> = ({match, history}) => {
    const [ticketDetails, setTicketDetails] = useState<TicketDetails>()
    const [sectionName, setSectionName] = useState('')
    const {ticket} = match.params
    const context = useContext(AppContext)
    
    useEffect(() => {   
        getTicket(ticket)
            .then(ticket => {
                setSectionName(ticket.sectionName)
                setTicketDetails(ticket)
            })
    }, [ticket])

    function fetchQueue() {
        return context.subjectService.getQueue(sectionName)
    }
    useEffect(() => {
        if(ticketDetails)
            fetchQueue()
                .then(queue => {
                    const idx = getQueueIndex(ticket, queue)
                    if(idx!! != ticketDetails!!.waitingTickets){
                        updateWaitingTickets(idx!!, ticketDetails!!)
                        setTicketDetails({
                            ...ticketDetails!!,
                            waitingTickets: idx!!
                        })
                    }
                })
    },[fetchQueue, ticketDetails])

    function fetchSubjects() {
        return fetch(`${NGROK_PATH}${API_BASE_URL}/sections/${sectionName}/subjects`)
            .then(res => res.json())   
    }

    useEffect(() => {
        if(ticketDetails)
            fetchSubjects()
                .then( subjects => {
                    const curr = getCurrTicket(ticketDetails!!.subject.description!!, subjects)
                    console.log(curr)
                    if(curr!! != ticketDetails!!.subject.currentTicket){
                        updateCurrentTicket(curr!!, ticketDetails!!)
                        setTicketDetails({
                            ...ticketDetails!!,
                            subject: {...ticketDetails?.subject!!,
                                currentTicket: curr!!
                            }
                        })
                    }
                })

    }, [fetchSubjects, ticketDetails])
    return ( 
        ticketDetails && ticketDetails.subject?
            <IonPage>
                <IonHeader translucent>
                    <IonToolbar>
                        <IonTitle>{ticketDetails.ticket}</IonTitle>
                        <IonButtons slot='end'>
                            <IonButton routerLink='/tickets'>Close</IonButton>
                            <IonButton onClick={() => {
                                removeTicket(ticketDetails.ticket)
                                context.ticketService.removeTicket(ticketDetails.sectionName,ticketDetails.subject.name, ticketDetails.ticket)
                                history.goBack()
                            }} color='danger'>Delete</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem lines='none'>
                        <IonCol></IonCol>
                        <h3>{ticketDetails.sectionName}</h3>
                        <IonCol></IonCol>
                    </IonItem>
                    <IonItem  lines='none'>
                        <IonCol></IonCol>
                        <h5>{ticketDetails.subject.description}</h5>
                        <IonCol></IonCol>
                    </IonItem>
                    {ticketDetails.waitingTickets> 0 ?
                        <IonItem lines='none' >
                            
                            <b >Tickets Left </b>
                            <b slot='end'>{ticketDetails.waitingTickets}</b> 
                        </IonItem>
                        : ticketDetails.waitingTickets === 0 ?
                            <IonItem lines='none'>
                                <IonCol></IonCol>
                                <b>You are Next!</b>
                                <IonCol></IonCol>
                            </IonItem>
                            :
                            <IonItem lines='none'>
                                <IonCol></IonCol>
                                <b>Your Turn!</b>
                                <IonCol></IonCol>
                            </IonItem>
                    }
                    <IonItem lines='none'>
                        <b>Current Ticket</b> 
                        <b slot='end'>{ticketDetails.subject.currentTicket}</b>
                    </IonItem>         
                </IonContent> 
            </IonPage>
            : null
    )
}

export default Ticket

function getQueueIndex(ticket : string, queueInfo? : Siren.Entity<string[], void>) : number | undefined {
    return queueInfo?.properties?.findIndex(tick => tick === ticket)
}

function getCurrTicket(subject: string, subInfo? : Siren.Entity<void, Subject>) : number | undefined {
    console.log(subject)
    return subInfo?.entities?.find(sub => {
        console.log(sub.properties)
        return sub.properties?.description=== subject
    })?.properties?.currentTicket
}