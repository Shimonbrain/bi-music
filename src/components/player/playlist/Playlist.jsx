import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


export default function Playlist() {
 const GET_PLAYLIST = useSelector((state) => state.getPlaylist.items);
 const GET_CURRENTSONG = useSelector((state) => state.getSong.items);

 const [data, SetData] = useState([]) ;
 const [songID, SetSongId] = useState(null);
 const dispatch = useDispatch();


 useEffect(() => {
  SetData(GET_PLAYLIST)
 },[GET_PLAYLIST]);

 useEffect( ()=> {
    SetSongId(GET_CURRENTSONG.id);
    dispatch({
      type: "RECENT_ADDED",
      result: GET_CURRENTSONG,
    })
 }, [GET_CURRENTSONG]);


 const playSong = (e) => {
  dispatch({
    type: "SONG_SELECTED",
    result: e,
  })
  dispatch({
    type: "RECENT_ADDED",
    result: e,
  })
 } 



 
  return (<>
    {
      data ?
        data?.map((item) => 
        <div className={`flex items-center rounded-md px-3 py-2 mb-2 cursor-pointer hover:bg-slate-700 transition-all ` + (songID == (item.id) ? 'bg-slate-700': 'bg-slate-900'  )  } 
        onClick={(e) => {playSong(item)}}>
          <img src={item?.links?.images[1]?.url} alt="" className="w-10 h-10 rounded-lg mr-3" />
        <div>
          <p className="text-[12px] text-white font-medium">{item?.name}</p>
          <p className="text-[12px] text-slate-400 font-medium  ">{item?.author}</p>
        </div>
        <i className={`fa-solid  text-white ml-auto cursor-pointer fa-` + (songID == (item.id) ? 'pause': 'play'  ) }></i>
        </div>)
      : <>Data</>
    }</>);
}
