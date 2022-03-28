export const GET_PLAYLIST = 'GET_PLAYLIST' ;
export const SONG_SELECTED = 'SONG_SELECTED';
export const RECENT_ADDED = 'RECENT_ADDED';



export const getPlaylist = (result) => ({
    type: GET_PLAYLIST,
    playload: {result}
});

export const songSelected = (result) => ({
    type: SONG_SELECTED,
    playload: {result}
});

export const recentAdded = (result) => ({
    type: RECENT_ADDED,
    playload: {result}
});