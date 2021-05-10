import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import Queues from './pages/Queues'
import Appoitments from './pages/Appointments'
import Tickets from './pages/Tickets'

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
import React from 'react'

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/queuality">
          <Redirect to="/queuality/queues" />
        </Route>
        <Route exact path="/">
          <Redirect to="/queuality/queues" />
        </Route>
        <Route exact path="/queuality/queues">
          <Queues />
        </Route>
        <Route exact path="/queuality/appointments">
          <Appoitments/>
        </Route>
        <Route exact path="/queuality/tickets">
          <Tickets />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="top">
      <IonTabButton tab="queues" href = '/queuality/queues'>
        <IonIcon icon={peopleOutline} />
        <IonLabel>Queues</IonLabel>
      </IonTabButton>

      <IonTabButton tab="tickets" href = '/queuality/tickets'>
        <IonIcon icon={ticketOutline} />
        <IonLabel>Tickets</IonLabel>
      </IonTabButton>

      <IonTabButton tab="appointments" href = 'queuality/appointments'>
        <IonIcon icon={calendarOutline} />
        <IonLabel>Appoiintments</IonLabel>
      </IonTabButton>
    </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
)

export default App
