import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 * globals: rootReducer, middlewares
 * @function storeFactory
 * @param {object} initialState Initial state for store
 * @returns {Store} redux store
 */

export const storeFactory = initialState => {
  const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleWare(rootReducer, initialState);
};
