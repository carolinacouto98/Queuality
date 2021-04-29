import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet } from '@ionic/react'
import {Route} from 'react-router-dom'
import AppointmentDetails from './AppointmentDetails'

const Appointments: React.FC = () => {
    return (
        <IonPage>
        <IonRouterOutlet>
            <Route exact path="queuality/appontments/:id">
                < AppointmentDetails/>
            </Route>
        </IonRouterOutlet>
    </IonPage>
    )
}

export default Appointments