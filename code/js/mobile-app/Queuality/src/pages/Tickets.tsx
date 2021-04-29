import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterOutlet } from '@ionic/react'
import {Route} from 'react-router-dom'
import TicketDetails from './TicketDetails'

const Tickets: React.FC = () => {
    return (  
        <IonPage>
            <IonRouterOutlet>
                <Route exact path="queuality/tickets/:id">
                    < TicketDetails/>
                </Route>
            </IonRouterOutlet>
        </IonPage>
    )
}

export default Tickets