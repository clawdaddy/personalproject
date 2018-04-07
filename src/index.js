import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks/store'
import registerServiceWorker from './registerServiceWorker';
import './main.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render(

<Provider store = {store}>
    <MuiThemeProvider >
        <HashRouter>
            <App />
        </HashRouter>
    </MuiThemeProvider>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
