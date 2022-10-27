import React from "react";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from "react-dom";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import "./index.css";
import Root from "./components/Root";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
