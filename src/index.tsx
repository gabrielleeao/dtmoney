import { createServer } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';



createServer({
  routes() {
    this.namespace = 'api';

    this.get('/trasactions', () => {
      return [
        {
          id: 1,
          title:'Trasaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date()
        }
      ]
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);