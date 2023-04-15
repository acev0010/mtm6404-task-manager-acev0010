import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import School from './School';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/school" component={School} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
