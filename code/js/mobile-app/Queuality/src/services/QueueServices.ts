import { Queue, QueueType } from '../model/QueuesModel'
import {NGROK_PATH} from '../App' 
export type QueuesService = {
    getQueues: () => Promise<Queue[]>,
    getQueueTicket: (queueId: string) => Promise<string>
}

export function createQueuesService() :QueuesService {

    return{
        getQueues: async () : Promise<Queue[]> => {
            const path = `${NGROK_PATH}/api/queues/`
            return  fetch(path)
                .then(res => res.json())
                .then(data => 
                    data.properties.map((queue: QueueType) => 
                        new Queue(queue._id, queue.name, queue.subject, queue.priority, queue.queueTicket.nrTicketsAnswered)
                    )
                )
        },
        getQueueTicket: async (queueId: string ) : Promise<string> => {
            const path = `${NGROK_PATH}/api/tickets`
            
            return fetch(path,
                {
                    method: 'POST',
                    headers: {
                        'accept' : 'application/json',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        queueId: queueId
                    })
                })
                .then(res => res.json())
                .then(data => data.properties)
        }
    }
}