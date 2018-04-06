import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import reducer from './reducer';
import promiseMiddleware from 'redux-promise-middleware';

const middleware = applyMiddleware(promiseMiddleware())
export default createStore(reducer,middleware);