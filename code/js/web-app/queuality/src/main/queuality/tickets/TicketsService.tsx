import { QueueTicket } from "./ticketsModel"

export interface TicketsService {
    getTickets: () => Promise<QueueTicket[]>
    setNextTicket: (queueId: string) => Promise<QueueTicket[]>
}

export function getTicketsService(): TicketsService {
    return {
        getTickets: async (): Promise<QueueTicket[]> => {
            return fetch('http://localhost:5000/api/tickets')
                .then(res => res.json())
                .then(tickets => tickets.properties.slice(0, 5))
                .catch(err => console.log(err))
        },

        setNextTicket: async (queueId: string): Promise<QueueTicket[]> => {
            const fetchRes = await fetch(`http://localhost:5000/api/queues/${queueId}/current-ticket`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            const res = await fetchRes.json()
            return res.properties
        }
    }
}
