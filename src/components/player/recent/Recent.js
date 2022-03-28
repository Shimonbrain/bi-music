import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


export default function Recent() {
 const RECENT_ADDED = useSelector((state) => state.recentList.items)
 const [data, SetData] = useState([]) ;
//  const [songID, SetSongId] = useState(null);


 useEffect(() => {
  SetData(RECENT_ADDED)
 },[RECENT_ADDED])

 
  return (<>
    {
      data ?
        data?.map((item) => 
        <div className={`flex items-center rounded-md px-3 py-2 pr-5 mb-2 cursor-pointer hover:bg-slate-700 transition-all  `}>
          <img src={item?.links?.images[1]?.url} alt="" className="w-10 h-10 rounded-lg mr-3" />
        <div>
          <p className="text-[12px] text-white font-medium ">{item?.name}</p>
          <p className="text-[12px] text-slate-400 font-medium  ">{item?.author}</p>
        </div>
        </div>)
      : <>Data</>
    }</>);
}
