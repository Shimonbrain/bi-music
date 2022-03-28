import { GET_PLAYLIST, SONG_SELECTED } from "../actions/player.action";

const initialStage = {
    items: [],
};


export default function getPlaylist(state = initialStage, action) {

    switch (action.type) {
        case GET_PLAYLIST:
            return {
                ...state,
                items: action.result,
            };
                        
        default:
            return state;
    }
}
