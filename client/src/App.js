import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Vacations from './components/Vacations';
import AddVacation from './components/AddVacation';
import EditPage from './components/EditPage';
import Reports from './components/Reports';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/vacations" component={Vacations} />
          <Route path="/add" component={AddVacation} />
          <Route path="/edit/:id" component={EditPage} />
          <Route path="/reports" component={Reports} />
          <Route path="*" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
