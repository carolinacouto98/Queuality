/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/prop-types */
import { IonContent, IonPage, useIonViewWillEnter} from '@ionic/react'
import React, { createContext, useContext, useState } from 'react'
import { AppContext } from '../App'
import { Result } from '../common/FetchUtils'
import { Entity } from '../common/Siren'
import TicketsComponent from '../components/tickets/TicketsComponent'
import { TicketDetails } from '../model/TicketsModel'
import { getTickets, removeTicket } from '../services/TicketsStorage'


export const TicketsContext = createContext({
    tickets: Array<TicketDetails>()
})

const Tickets: React.FC = () => {
    const [tickets, setTickets] = useState<TicketDetails[]>([])
    const context = useContext(AppContext)

    useIonViewWillEnter(() => {
        async function loadTickets() {
            const tickets = await getTickets()
            if(tickets) {
                tickets.map(async ticket =>{
                    const queueTickets = getQueueTicketsValue(await context.subjectService.getQueue(ticket.sectionName).send())!!
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
            <IonContent>
                {tickets?
                    <TicketsContext.Provider value = {{tickets : tickets}}>
                        <TicketsComponent />  
                    </TicketsContext.Provider>
                    :null}
            </IonContent>
        </IonPage>
            
    )
}

export default Tickets

function getQueueTicketsValue(queueInfo? : Result<Entity<string[], void>>) : string[] | undefined {
    return queueInfo?.body?.properties
}