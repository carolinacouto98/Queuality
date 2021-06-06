/* eslint-disable react/prop-types */
import { IonContent, IonPage, useIonViewWillEnter} from '@ionic/react'
import React, { createContext, useContext, useState } from 'react'
import { AppContext } from '../App'
import TicketsComponent from '../components/tickets/TicketsComponent'
import { TicketDetails } from '../model/TicketsModel'
import { getTickets, removeTickets } from '../services/TicketsStorage'


export const TicketsContext = createContext({
    tickets: Array<TicketDetails>()
})

const Tickets: React.FC = () => {
    const [tickets, setTickets] = useState<TicketDetails[]>()
    const context = useContext(AppContext)

    

    useIonViewWillEnter(() => {
        async function loadTickets() {
            const queues = await context.queueService.getQueues()
            const tickets = await getTickets()
            if(tickets) {
                queues.map(async queue => {
                    await removeTickets(tickets.filter(ticket => 
                        ticket.queueSubject === queue.subject &&
                        ticket.queueNumber < queue.nrTicketsAnswered
                    ))
                    await getTickets().then(tickets => setTickets(tickets))
                })
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