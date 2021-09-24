import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Landing from './pages/Landing';
import Form from './pages/Form';
function App() {
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
