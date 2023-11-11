import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Registration from './components/Registration'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" exact component={LoginForm} />
      <Route path="/register" exact component={Registration} />
      <Route path="/" exact component={Home} />
    </Switch>
  </Router>
)

export default App
