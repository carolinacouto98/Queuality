/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import Section from './pages/Section'
import Appoitments from './pages/Appointments'
import Tickets from './pages/Tickets'
import { getSectionService, SectionService } from './services/SectionService'
import {getTicketsService, TicketsService} from './services/TicketService'
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
import React, { createContext, useEffect } from 'react'
import Ticket from './pages/Ticket'
import Sections from './pages/Sections'
import { getSectionsService, SectionsService } from './services/SectionsService'
import AddAppointment from './pages/AddAppointment'
import { AppointmentsService, getAppointmentService } from './services/AppointmentsService'
import Appointment from './pages/Appointment'

export const NGROK_PATH = 'https://d73a-2001-8a0-6d15-6500-443e-5651-ea77-e320.ngrok.io'
export const API_BASE_URL = '/queuality/api'

export const AppContext = createContext({
    subjectService: {} as SectionService,
    ticketService: {} as TicketsService,
    sectionService: {} as SectionsService,
    appointmentService: {} as AppointmentsService
})
const App: React.FC = () => { 
    const appContextValues = {
        subjectService: getSectionService(),
        ticketService: getTicketsService(),
        sectionService: getSectionsService(),
        appointmentService: getAppointmentService()
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
                    <Redirect exact from='/' to='/sections' />
                    <Route exact path='/sections' component={Sections}/>
                    <Route exact path='/sections/:sectionId' component={Section} />
                    <Route exact path='/tickets'  component={Tickets} />
                    <Route path='/tickets/:ticket' component={Ticket} />
                    <Route exact path='/appointments' component={Appoitments}/>  
                    <Route exact path='/appointments/:appointment' component={Appointment} />
                    <Route exact path='/add-appointment' component={AddAppointment} />
                </IonRouterOutlet>
                <IonTabBar slot='top'>
                    <IonTabButton tab='queues' href = '/sections'>
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
