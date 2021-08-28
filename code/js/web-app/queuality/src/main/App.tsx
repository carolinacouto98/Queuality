// eslint-disable-next-line
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import SectionsPage from './queuality/sections/SectionsPage'
import SectionPage from './queuality/section/SectionPage'
import EmployeesPage from './queuality/employees/EmployeesPage'
import QueuePage from './queuality/tickets/QueuePage'
import { getQueueService } from './common/services/QueueService'
import { getSectionsService } from './common/services/SectionsService'
import { getSubjectsService } from './common/services/SubjectsService'
import AppointmentsPage from './queuality/appointments/AppointmentsPage'
import { getAppointmentsService } from './common/services/AppointmentsService'
import { getEmployeesService } from './common/services/EmployeesService'
import Navbar from './queuality/navbar/Navbar'
import HomePage from './queuality/home/HomePage'
import { useState } from 'react'

export const API_BASE_URL = 'http://localhost:5000/queuality'

function PageRouter() {
  const [fixed, setFixed] = useState<boolean>(false)
  return (
    <Router>
      <Switch>
        <Redirect exact from='/' to='/queuality' />
        <Route exact path='/queuality'>
          <Navbar fixed={fixed} noMargin/>
          <HomePage setFixed={setFixed}/>
        </Route>
        <Route exact path='/queuality/sections'>
          <Navbar />
          <SectionsPage service={getSectionsService()}/>
        </Route>
        <Route exact path='/queuality/sections/:sectionId'>
          <Navbar />
          <SectionPage sectionsService={getSectionsService()} subjectsService={getSubjectsService()}/>
        </Route>
        <Route exact path='/queuality/employees'>
          <Navbar />
          <EmployeesPage service = {getEmployeesService()} sectionsService={getSectionsService()}/>
        </Route>
        <Route exact path='/queuality/sections/:sectionId/tickets'>
          <Navbar />
          <QueuePage queueService = {getQueueService()} subjectsService = {getSubjectsService()}/>
        </Route>
        <Route exact path='/queuality/sections/:sectionId/appointments'>
          <Navbar />
          <AppointmentsPage service = {getAppointmentsService()} subject='Test Subject 3' desk='Desk1'/>
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
