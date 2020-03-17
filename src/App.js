import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetail from './components/project/ProjectDetail';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/project/CreateProject';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path='/project/:id' component={ProjectDetail}/>
          <PublicRoute restricted path='/signin' component={SignIn} />
          <PublicRoute restricted path='/signup' component={SignUp} />
          <PrivateRoute path='/create' component={CreateProject} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
