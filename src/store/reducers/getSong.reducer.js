import {  SONG_SELECTED } from "../actions/player.action";


const initialStage = {
    items: [],
};


export default function getSong(state = initialStage, action) {
    switch (action.type) {
        case SONG_SELECTED:
            return {
                ...state,
                items: action.result,
                // items: [...state.items, action.result],
            };
            
        default:
            return state;
    }
}