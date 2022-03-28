import { createStore, combineReducers} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import getPlaylist  from "./reducers/getPlaylist.reducer";
import getSong from "./reducers/getSong.reducer";
import recentList from './reducers/recentList.reducer';

const rootReducer = combineReducers({
    getPlaylist,
    getSong,
    recentList
})

const store = createStore(rootReducer, composeWithDevTools());

export default store ;