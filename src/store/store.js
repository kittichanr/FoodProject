import { createStore, combineReducers ,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import menuReducer from '../reducers/menuReducer';
import routesReducer from '../reducers/routesReducer';

const rootReducer = combineReducers({
  routesReducer,
  menu: menuReducer
});

const configureStore = () => {
  const middleware = [thunk];
  return createStore(rootReducer,applyMiddleware(...middleware));
}

export default configureStore;