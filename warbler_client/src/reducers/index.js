import {combineReducers} from 'redux';
import currentUser, {getCurrentUser} from './currentUser';
import messages from './messages';

export {getCurrentUser};


const rootReducers = combineReducers({
    currentUser,
    messages
})

export default rootReducers;