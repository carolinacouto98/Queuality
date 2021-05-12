import {IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react"
import React, { useState } from "react"
import {QueueAlert} from "./QueueAlert"


interface QueueCardProps{
    id: string,
    name: string,
    subject: string,
    priority: boolean
}

const QueueCard: React.FC<QueueCardProps> = props => {
    const [alert, setAlert] = useState<string>()

    return(
        <IonCard id ={props.id} button onClick={() => {
            setAlert(`Are you sure you want to get a ticket from ${props.name}?`)}}>
            <IonCardHeader>
                <IonCardTitle>
                     {props.name}
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {props.subject}
                <IonBadge></IonBadge>
            </IonCardContent> 
            <QueueAlert alert={alert} queueName={props.name} />
            </IonCard>
    )
}

export default QueueCard