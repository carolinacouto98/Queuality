/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/prop-types */
import { IonContent, IonPage, IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react'
import React, { useContext, useState } from 'react'
import { AppContext } from '../App'
import { Entity } from '../common/Siren'
import TicketsComponent from '../components/tickets/TicketsComponent'
import { TicketDetails } from '../model/TicketsModel'
import { getTickets, removeTicket } from '../services/TicketsStorage'


const Tickets: React.FC = () => {
    const [tickets, setTickets] = useState<TicketDetails[]>([])
    const context = useContext(AppContext)

    useIonViewWillEnter(() => {
        async function loadTickets() {
            const tickets = await getTickets()
            if(tickets) {
                tickets.map(async ticket => {
                    const queueTickets = getQueueTicketsValue(await context.subjectService.getQueue(ticket.sectionName))!!
                    if(!queueTickets.includes(ticket.ticket))
                        await removeTicket(ticket.ticket)
                })
                await getTickets().then(tickets => setTickets(tickets))
            }
        } 
        loadTickets() 
    })
    
    return (  
       
        <IonPage>
            <IonToolbar>
                <IonTitle color='primary'>My Tickets</IonTitle>         
            </IonToolbar>
            <IonContent>
                {tickets?
                    <TicketsComponent tickets={tickets}/>  
                    :null}
            </IonContent>
        </IonPage>
            
    )
}

export default Tickets

function getQueueTicketsValue(queueInfo? : Entity<string[], void>) : string[] | undefined {
    return queueInfo?.properties
}