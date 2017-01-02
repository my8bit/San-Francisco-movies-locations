import React, {Component} from 'react';
import {Controls} from './containers/controls';
import {GoogleMap} from './widgets/map';
import {Provider} from 'react-redux';
import {store} from './reducers/reducer';

export class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <main className="container">
          <Controls/>
          <GoogleMap/>
        </main>
      </Provider>
    );
  }
}
