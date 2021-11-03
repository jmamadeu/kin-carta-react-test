import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { history } from './helpers';
import { PrivateRoute } from './PrivateRoute';

export function App() {
  return (
    <div className='container'>
      <div className='col-sm-8 col-sm-offset-2'>
        <Router history={history}>
          <Switch>
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <PrivateRoute path='/' exact={true} component={HomePage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
/* 
function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}
*/
