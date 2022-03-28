import {  RECENT_ADDED } from "../actions/player.action";


const initialStage = {
    items: [],
};


export default function recentList(state = initialStage, action) {
    switch (action.type) {
        case RECENT_ADDED:
            return {
                ...state,
                // items: action.result,
                items: [...state.items, action.result],
            };
            
        default:
            return state;
    }
}