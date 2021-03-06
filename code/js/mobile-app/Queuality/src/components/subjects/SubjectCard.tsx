/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
import {IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonRow, useIonAlert, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import React, { useState } from 'react'
import { Subject } from '../../model/SubjectModel'
import { accessibilityOutline } from 'ionicons/icons'
import './SubjectCard.css'
import * as TicketStorage from '../../services/TicketsStorage'
type Props = {
    subject: Subject,
    ticketHandler(subjectName: string) : void
}

const SubjectCard: React.FC<Props> = ({subject, ticketHandler})=> {
    const [alert] = useIonAlert()
    const[disabled, setDisabled] = useState<boolean>(false)
    const handleTicketClick = async () => {
        ticketHandler(subject.name)
    }


    useIonViewWillEnter(() => {
        TicketStorage.getTickets()
            .then(tickets => 
                setDisabled(!!tickets.find(ticket => ticket.subject.name === subject.name))
            )

    })
    return(
        <IonCard disabled={disabled} className='SubjectCard' id ={subject.name} button onClick={() => {
            alert({
                message: `Are you sure you want to get a ticket to ${subject.description}?`,
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
                                    {subject.name} {subject.description}
                                    {subject.priority?
                                        <IonIcon color='primary' icon={accessibilityOutline} size='small' style={{marginLeft: '10%'}}/>
                                        : null}
                                </IonCol>  
                                <IonCol>
                                    <IonBadge color='primary'>{subject.currentTicket}</IonBadge> 
                                    <IonBadge style={{marginLeft: '50%'}} color='primary'>{subject.callingDesk}</IonBadge> 
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem> 
                </IonCardTitle>  
            </IonCardHeader>
        </IonCard>
    )
}

export default SubjectCard