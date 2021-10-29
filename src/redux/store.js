import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import profile from './actions/profile.js';
import lobby from './actions/lobby.js';
import game from './actions/game.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    profile,
    lobby,
    game
})
  

const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)))

export default store