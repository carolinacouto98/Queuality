/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { IonCard, IonCardContent, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonRow } from '@ionic/react'
import { arrowBackOutline, closeOutline } from 'ionicons/icons'
import React from 'react'
import { TicketDetails } from '../../model/TicketsModel'

type Props = {
    tickets: TicketDetails[]
}
const TicketsComponent: React.FC<Props> = ({tickets}) => {
    return(
        tickets.length?
            <IonGrid>
                <IonRow>
                    {tickets.map((ticket: TicketDetails) => ( 
                        <IonCard routerLink={`/tickets/${ticket.ticket}`} key={ticket.ticket} >
                            <IonItem>
                                <IonCardTitle color='primary'>{ticket.sectionName}</IonCardTitle>
                                <IonCardTitle slot='end' style={{marginTop:'5%', marginBottom:'5%'}}>{ticket.ticket}</IonCardTitle>
                                
                            </IonItem>
                           
                        </IonCard>   
                    ))}  
                </IonRow> 
            </IonGrid>
            :
            <NoTicketsDisplay />
    )
}

const NoTicketsDisplay: React.FC = () => {
    return(
        <IonGrid style={{'marginTop':'65%'}}>
            <IonRow>
                <IonCol class='ion-text-center'>
                    <h2>You Have No Tickets!</h2>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol class='ion-text-center'>
                    <IonIcon icon ={arrowBackOutline} defaultValue='Swipe Left' />
                    <b>Swipe Left to Add a Ticket</b>
                </IonCol> 
            </IonRow>
        </IonGrid>
    )
}

export default TicketsComponent