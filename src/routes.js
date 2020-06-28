import React from 'react';
import { Table } from './components/Table';
import { Home } from './components/Home';
import {   } from 'react-router-dom';
import { Redirect,Route,Switch } from 'react-router'
export const Routes = () => {
  return (
    <div>
      <Home />
      <Switch>
        <Route exact path="/">
          <Redirect to="/Home" component={Home} />
        </Route>
        <Route exact path="/Table" component={Table} />
      </Switch>
    </div>
  );
};
