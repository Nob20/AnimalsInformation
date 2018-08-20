import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import AnimalsIndex from './components/animals_index';
import AnimalsNew from './components/animals_new';
import AnimalsShow from './components/animals_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore); //passing the promise into applyMiddleware call here


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch> {/*takes in a collection of different routes and wants you to put the most specific route on the top*/}
          <Route path="/animals/new" component={AnimalsNew} />
          <Route path="/animals/:id" component={AnimalsShow} />
          
          <Route path="/animals" component={AnimalsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
