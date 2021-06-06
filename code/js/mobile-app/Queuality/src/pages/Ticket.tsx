/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/prop-types */
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import { trashBinOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { AppContext } from '../App'
import { TicketDetails } from '../model/TicketsModel'
import {getTicket, removeTicket, updateWaitingTime } from '../services/TicketsStorage'
type TicketDisplayProps = RouteComponentProps<{
    ticket: string
}>
const Ticket: React.FC<TicketDisplayProps> = ({match, history}) => {
    const [ticketDetails, setTicketDetails] = useState<TicketDetails>()
    const {ticket} = match.params
    const context = useContext(AppContext)

    useEffect(() => {   
        const ac = new AbortController()
        context.ticketService.getWaitingTickets(ticket)
            .then(waiting => updateWaitingTime(ticket, waiting))
        getTicket(ticket).then(ticket => setTicketDetails(ticket))   
        return () => ac.abort()
    }, [ticket, context])
    
    
    return ( 
        ticketDetails ?
            <IonPage>
                <IonHeader translucent>
                    <IonToolbar>
                        <IonTitle>{ticketDetails.queueSubject}</IonTitle>
                        <IonButtons slot='end'>
                            <IonButton routerLink='/tickets' >Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem  lines='none'>
                        <IonIcon slot='end' onClick={() => {
                            removeTicket(ticketDetails.ticket)
                            context.ticketService.removeTicket(ticketDetails.ticket)
                            history.goBack()
                        }} icon ={trashBinOutline}/>
                        <h3>{ticketDetails.ticket}</h3>
                    </IonItem>
                    <IonItem lines='none' >
                        <b >People Ahead </b>
                        <b slot='end'>{ticketDetails.waitingTickets}</b> 
                    </IonItem>
                    
                    <IonItem lines='none'>
                        <b>Current Ticket</b> 
                        <b slot='end'>{ticketDetails.queueNumber}</b>
                    </IonItem>
                </IonContent> 
            </IonPage>
            : null
    )
}

export default Ticket