import { QueueTicket } from "./ticketsModel"

export interface TicketsService {
    getQueueTickets: () => Promise<QueueTicket[]>
    setNextTicket: (queueId: string) => Promise<QueueTicket>
}

export function getTicketsService(): TicketsService {
    return {
        getQueueTickets: async (): Promise<QueueTicket[]> => {
            const fetchRes = await fetch('http://localhost:5000/api/queues')
            const res = await fetchRes.json()
            return res.properties.map((item: {
                nrTicketsAnswered: number; queueTicket?: { nrTicketsAnswered: number} ; priority?: boolean
            }) => {
                item.nrTicketsAnswered = item.queueTicket!!.nrTicketsAnswered
                return item
            })
        },

        setNextTicket: async (queueId: string): Promise<QueueTicket> => {
            const fetchRes = await fetch(`http://localhost:5000/api/queues/${queueId}/current-ticket`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            const res = await fetchRes.json()
            return res.properties.queueTicket.nrTicketsAnswered
        }
    }
}
