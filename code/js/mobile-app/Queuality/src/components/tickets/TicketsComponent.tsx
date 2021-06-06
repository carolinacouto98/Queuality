import { IonCard, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonRow } from '@ionic/react'
import { arrowBackOutline, close } from 'ionicons/icons'
import React, { useContext } from 'react'
import { AppContext } from '../../App'
import { TicketDetails } from '../../model/TicketsModel'
import { TicketsContext } from '../../pages/Tickets'
import { removeTicket } from '../../services/TicketsStorage'

const TicketsComponent: React.FC = () => {
    const tickets = useContext(TicketsContext).tickets
    const context = useContext(AppContext)
    
    return(
        tickets.length?
            <IonGrid>
                <IonRow>
                    {tickets.map((ticket: TicketDetails) => ( 
                        <IonCard routerLink={`/tickets/${ticket.ticket}`} key={ticket.ticket}>
                            <IonItem>
                                <IonCardTitle style={{marginTop:'5%', marginBottom:'5%'}}>{ticket.ticket}</IonCardTitle>
                                <IonIcon slot='end' icon={close} onClick={() => {
                                    removeTicket(ticket.ticket)
                                    context.ticketService.removeTicket(ticket.ticket)
                                }}></IonIcon>
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