// eslint-disable-next-line
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SectionsPage from './queuality/sections/SectionsPage'
import SectionPage from './queuality/section/SectionPage'
import EmployeesPage from './queuality/employees/EmployeesPage'
import { TicketsControl } from './queuality/tickets/TicketsControlPage'
import { getTicketsService } from './queuality/tickets/TicketsService'
import QueuePage from './queuality/tickets/QueuePage'
import { getQueueService } from './common/services/QueueService'
import { getSectionsService } from './common/services/SectionsService'
import { getSubjectsService } from './common/services/SubjectsService'
import { getEmployeesService } from './common/services/EmployeesService'

export const API_BASE_URL = 'http://localhost:5000/queuality'

function PageRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path='/queuality/sections'>
          <SectionsPage service={getSectionsService()}/>
        </Route>
        <Route exact path='/queuality/sections/:sectionId'>
          <SectionPage sectionsService={getSectionsService()} subjectsService={getSubjectsService()}/>
        </Route>
        <Route exact path='/tickets'>
          <TicketsControl.Page ticketsService = {getTicketsService()}/>
        </Route>
        <Route exact path='/employees'>
          <EmployeesPage service = {getEmployeesService()}/>
        </Route>
        <Route exact path='/queuality/sections/:sectionId/tickets'>
          <QueuePage queueService = {getQueueService()} subjectsService = {getSubjectsService()}/>
        </Route>
      </Switch>
    </Router>
  )
}

function App() {
  return (
    <div className="App">
      <PageRouter />
    </div>
  )
}

export default App;
