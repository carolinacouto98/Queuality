// eslint-disable-next-line
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { QueuesControl } from './queuality/queues/QueueControlPage'
import { TicketsControl } from './queuality/tickets/TicketsControlPage'
import { getTicketsService } from './queuality/tickets/TicketsService'

function PageRouter() {
  return (
    <Router basename='/queuality'>
      <Switch>
        <Route exact path='/queues'>
          <QueuesControl.Page />
        </Route>
        <Route exact path='/tickets'>
          <TicketsControl.Page ticketsService = {getTicketsService()}/>
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
