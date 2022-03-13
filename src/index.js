import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import {persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import createSagaMiddleware from 'redux-saga'
import './index.css';
import App from './page/App';
import rootReducer from './reduce';
import reportWebVitals from './reportWebVitals';
import rootSaga from './saga';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,
  compose(applyMiddleware(sagaMiddleware)))
  sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

ReactDOM.render(
  <BrowserRouter>
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
