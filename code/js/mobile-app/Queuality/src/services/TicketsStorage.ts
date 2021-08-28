/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import { Storage } from '@ionic/storage'
import { TicketDetails } from '../model/TicketsModel'
const store = new Storage()
store.create()
const KEY = 'tickets'
export async function setTicket(ticket: TicketDetails): Promise<void> {
    const tickets: TicketDetails[] = await store.get(KEY)
    if(tickets) {
        tickets.push(ticket)
        await store.set(KEY,tickets)
    } else 
        await store.set(KEY,[ticket])

}

export async function getTickets(): Promise<TicketDetails[]> {
    return await store.get(KEY)
}

export async function getTicket(ticket: string): Promise<TicketDetails> {
    return await store.get(KEY)
        .then(tickets => tickets
            .find((tick: TicketDetails)  => tick.ticket === ticket))
}

/*export async function removeTickets() {
    store.clear()
}*/

export async function removeTicket(ticketId: string): Promise<void> {
    const oldTickets: TicketDetails[] = await store.get(KEY)
    const newTickets = oldTickets.filter(ticket => ticket.ticket!== ticketId)
    await store.set(KEY, newTickets)
}

export async function updateWaitingTickets(waiting: number, ticket: TicketDetails): Promise<void> {
    const tickets: TicketDetails[] = await store.get(KEY)
        .then(ticks => 
            ticks.map((t: TicketDetails) => {
                if(ticket.ticket ===t.ticket){
                     t!!.waitingTickets = waiting 
                }
                return t
            }))
    
    await store.set(KEY, tickets)
}

export async function updateCurrentTicket(current: number, ticket: TicketDetails): Promise<void> {
    const tickets: TicketDetails[] = await store.get(KEY)
        .then(ticks => 
            ticks.map((t: TicketDetails) => {
                if(ticket.ticket ===t.ticket){
                    t!!.subject.currentTicket = current
                }
                return t
            }))
    
    await store.set(KEY, tickets)
}
