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


export async function removeTicket(ticketId: string): Promise<void> {
    const oldTickets: TicketDetails[] = await store.get(KEY)
    const idx = oldTickets.findIndex(ticket => ticket.ticket === ticketId)
    const newTickets = oldTickets.filter(ticket => ticket.ticket!== ticketId)
        .map((ticket, index) => {
            if(index >= idx)
                ticket.waitingTickets = ticket.waitingTickets-1
            return ticket
        })
    
    await store.set(KEY, newTickets)
}

export async function removeTickets(tickets: TicketDetails[]): Promise<void> {
    const oldTickets: TicketDetails[] = await store.get(KEY)
    const newTickets = oldTickets.filter(ticket => !tickets.includes(ticket))
    await store.set(KEY, newTickets)
}

export async function updateWaitingTime(): Promise<void> {
    const tickets: TicketDetails[] = await store.get(KEY)
    tickets.map( ticket => ticket.waitingTickets = ticket.waitingTickets-1)
    await store.set(KEY, tickets)
}