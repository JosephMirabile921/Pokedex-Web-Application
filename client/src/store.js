import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, composeWithDevTools());

const stateSubscriber = () => {
  const newState = store.getState();
  console.log('New State:', newState);
}

store.subscribe(stateSubscriber);

export default store;
