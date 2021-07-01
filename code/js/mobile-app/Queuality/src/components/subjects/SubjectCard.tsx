/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
import {IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonRow, useIonAlert } from '@ionic/react'
import React, { useState } from 'react'
import { Subject } from '../../model/SubjectModel'
import { accessibilityOutline } from 'ionicons/icons'
import './SubjectCard.css'

type Props = {
    subject: Subject,
    ticketHandler(subjectName: string) : void
}

const SubjectCard: React.FC<Props> = ({subject, ticketHandler})=> {
    const [alert] = useIonAlert()
    const [isDisabled, disable] = useState(false)
    const handleTicketClick = async () => {
        disable(true)
        ticketHandler(subject.name)
    }

    return(
        <IonCard disabled={isDisabled} className='SubjectCard' id ={subject.name} button onClick={() => {
            alert({
                message: `Are you sure you want to get a ticket to ${subject.subject}?`,
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
                                    {subject.name} 
                                </IonCol>
                                <IonCol>
                                    {subject.priority? <IonIcon icon={accessibilityOutline} size='small'/>: null}
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonBadge slot='end' color='medium'>{subject.currentTicket}</IonBadge> 
                    </IonItem> 
                </IonCardTitle>  
            </IonCardHeader>
            <IonCardContent>
                {subject.subject}
            </IonCardContent> 
        </IonCard>
    )
}

export default SubjectCard