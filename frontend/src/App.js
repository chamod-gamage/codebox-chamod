import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import dotenv from 'dotenv';
import Landing from './pages/Landing';
import Form from './pages/Form';
function App() {
  dotenv.config();
  return (
    <Router>
      <Switch>
        <Route path="/form">
          <Form />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
