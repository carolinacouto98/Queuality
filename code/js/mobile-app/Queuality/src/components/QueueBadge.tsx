import { Plugins } from "@capacitor/core"
import { IonBadge } from "@ionic/react"
import { useEffect, useState } from "react"

interface CurrTicket{
    ticket: number
}
interface QueueBadgeProps{
    queueId: string
}
const QueueBadge: React.FC<QueueBadgeProps> = props => {
    const { Http } = Plugins
    const[currTicket, setCurrTicket] = useState<CurrTicket>()

        useEffect( () => {
        async function loadCurrentTicket() {
            const path = `http://localhost:3000/api/queues/${props.queueId}/current-ticket`
            await Http.request (
                {
                    method: 'GET',
                    url: path,
                    headers: {
                        'accept' : 'application/json',
                        'content-type': 'application/json',
                    },
                    
                }
            )
                .then(res => res.data)
                .then(data => setCurrTicket(data.properties))
                .catch(e => console.log(e))
        }
        loadCurrentTicket()
        },[currTicket])

    return(
        <IonBadge>
            {currTicket}
        </IonBadge>
    )
}

    export default QueueBadge