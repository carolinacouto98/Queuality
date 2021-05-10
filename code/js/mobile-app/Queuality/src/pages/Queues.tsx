import { IonContent,IonPage } from '@ionic/react'
import QueueComponent from '../components/QueueComponent'
const Queues: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
            <QueueComponent /> 
            </IonContent>
        </IonPage>
    )
}

export default Queues