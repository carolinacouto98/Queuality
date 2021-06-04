/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import Queues from './pages/Queues'
import Appoitments from './pages/Appointments'
import Tickets from './pages/Tickets'
import {createQueuesService, QueuesService} from './services/QueueServices'
import {createTicketsService, TicketsService} from './services/TicketServices'
import './App.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import { peopleOutline, ticketOutline, calendarOutline } from 'ionicons/icons'
import React, { createContext } from 'react'
import Ticket from './pages/Ticket'
export const NGROK_PATH = 'https://7edc6b229736.ngrok.io'

export const AppContext = createContext({
    queueService: {} as QueuesService,
    ticketService: {} as TicketsService,
})
const App: React.FC = () => { 
    const appContextValues = {
        queueService: createQueuesService(),
        ticketService: createTicketsService(),
    }
    return (
        <IonApp className='App'>
            <AppContext.Provider value={appContextValues}>
                <AppRouter />
            </AppContext.Provider>
        </IonApp>
    )
}

const AppRouter: React.FC = () => { 
    return(
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact from='/' to='/queues' />
                    <Route exact path='/queues'>
                        <Queues />
                    </Route>
                    <Route exact path='/tickets'  component={Tickets} />
                    <Route path='/tickets/:ticket' component={Ticket} />
                    <Route exact path='/appointments'>
                        <Appoitments/>
                    </Route>
                    
                </IonRouterOutlet>
                <IonTabBar slot='top'>
                    <IonTabButton tab='queues' href = '/queues'>
                        <IonIcon icon={peopleOutline} />
                        <IonLabel>Queues</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab='tickets' href = '/tickets'>
                        <IonIcon icon={ticketOutline} />
                        <IonLabel>Tickets</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab='appointments' href = '/appointments'>
                        <IonIcon icon={calendarOutline} />
                        <IonLabel>Appointments</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    )
}

export default App
