/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/prop-types */
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import { trashBinOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { AppContext } from '../App'
import { TicketDetails } from '../model/TicketsModel'
import {getTickets, removeTicket } from '../services/TicketsStorage'
type TicketDisplayProps = RouteComponentProps<{
    ticket: string
}>
const Ticket: React.FC<TicketDisplayProps> = ({match, history}) => {
    const [ticketDetails, setTicketDetails] = useState<TicketDetails>()
    const {ticket} = match.params
    useEffect(() => {   
        const ac = new AbortController()
        getTickets().then(tickets => tickets.find((tick: TicketDetails)  => tick.ticket === ticket)).then(ticket => setTicketDetails(ticket))
        console.log(ticketDetails)
        return () => ac.abort()
    }, [ticket])
    
    const context = useContext(AppContext)
    return ( 
        ticketDetails ?
            <IonPage>
                <IonHeader translucent>
                    <IonToolbar>
                        <IonTitle>{ticketDetails.subject.subject}</IonTitle>
                        <IonButtons slot='end'>
                            <IonButton routerLink='/tickets' >Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem  lines='none'>
                        <IonIcon slot='end' onClick={() => {
                            removeTicket(ticketDetails.ticket)
                            context.ticketService.removeTicket(ticketDetails.sectionName,ticketDetails.subject.name, ticketDetails.ticket)
                            history.goBack()
                        }} icon ={trashBinOutline}/>
                        <h3>{ticketDetails.ticket}</h3>
                    </IonItem>
                    <IonItem lines='none' >
                        <b >Tickets Left </b>
                        <b slot='end'>{ticketDetails.waitingTickets}</b> 
                    </IonItem>
                    
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