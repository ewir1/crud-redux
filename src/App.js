import './bootstrap.min.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import EditarProducto from './components/EditarProducto';
import Header from './components/Header';
import NuevoProducto from './components/NuevoProducto';
import Productos from './components/Productos';
// Redux
import { Provider } from 'react-redux';
import React from 'react';
import store from './store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route
              exact
              path="/productos/editar/:id"
              component={EditarProducto}
            />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
