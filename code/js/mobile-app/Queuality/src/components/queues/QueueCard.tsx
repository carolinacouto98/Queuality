/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
import {IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonRow, useIonAlert } from '@ionic/react'
import React, { useContext, useState } from 'react'
import { Queue } from '../../model/QueuesModel'
import { accessibilityOutline } from 'ionicons/icons'
import './QueueCard.css'
import { TicketDetails } from '../../model/TicketsModel'
import { AppContext } from '../../App'
import { setTicket } from '../../services/TicketsStorage'

interface QueueCardProps {
    queue: Queue
}

const QueueCard: React.FC<QueueCardProps> = props => {
    const context = useContext(AppContext)
    const [alert] = useIonAlert()
    const [isDisabled, disable] = useState(false)
    
    
    const handleTicketClick = async () => {
        disable(true)
        context.queueService.getQueueTicket(props.queue._id)
            .then(data => {
                console.log(data)
                context.ticketService.getWaitingTickets(data)
                    .then(waiting =>
                        setTicket(new TicketDetails(data, waiting ,props.queue.subject, props.queue.nrTicketsAnswered)))
            })
            .catch(e => console.log(e))
    }

    return(
        <IonCard disabled={isDisabled} className='QueueCard' id ={props.queue._id} button onClick={() => {
            alert({
                message: `Are you sure you want to get a ticket from ${props.queue.name}?`,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: ()=> {}
                    },
                    {
                        text: 'Okay',
                        handler: () => {
                            handleTicketClick()
                        }
                    }
                ]
            })
        }}>
            <IonCardHeader>
                <IonCardTitle>
                    <IonItem lines='none'>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    {props.queue.name} 
                                </IonCol>
                                <IonCol>
                                    {props.queue.priority? <IonIcon icon={accessibilityOutline} size='small'/>: null}
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonBadge slot='end' color='medium'>{props.queue.nrTicketsAnswered}</IonBadge> 
                    </IonItem> 
                </IonCardTitle>  
            </IonCardHeader>
            <IonCardContent>
                {props.queue.subject}
            </IonCardContent> 
        </IonCard>
    )
}

export default QueueCard