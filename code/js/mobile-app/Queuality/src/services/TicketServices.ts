import {NGROK_PATH} from '../App'

export interface TicketsService {
    removeTicket: (ticket: string) => Promise<void>,
    getWaitingTickets: (ticket: string) => Promise<number>
}

export function createTicketsService() : TicketsService {
    return {
        removeTicket: async (ticket: string) : Promise<void> => {
            const path = `${NGROK_PATH}/api/tickets/`
            fetch(path,
                {
                    method: 'PUT',
                    headers: {
                        'accept' : 'application/json',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ticket: ticket})
                }
            )
        },
        getWaitingTickets: async (ticket: string): Promise<number> => {
            const path = `${NGROK_PATH}/api/tickets/waiting-tickets?ticket=${ticket}`
            return  fetch (path)
                .then(res => res.json())
                .then(data => data.properties)
        }
    }
}