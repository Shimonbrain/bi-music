import React, { useEffect, useState, useRef } from "react";
import Playlist from "./playlist/Playlist";
import Recent from "./recent/Recent";

import Logo from "../../assets/img/Logo.png";
import DefaultAlbum from "../../assets/img/bg.png";
import { useSelector, useDispatch } from "react-redux";

export default function Player() {
  const [rightMenu, SetRightMenu] = useState("w-[6%]");
  const [innerRightMenu, SetInnerRightMenu] = useState("hidden");
  const [activeRightMenu, SetActiveRightMenu] = useState(false);

  const [recentMenu, SetRecentMenu] = useState("h-[0px] p-0");
  const [data, SetData] = useState("");
  const [isSongplaying, SetIsSongplaying] = useState(false);
  const [currentTime, SetCurrentTime] = useState(null);
  const [rangeCurrentTime, SetRangeCurrentTime] = useState(0);
  const [songDuration, SetSongDuration] = useState(null);
  const [repeatStatus, SetRepeatStatus] = useState(false);

  const GET_CURRENTSONG = useSelector((state) => state.getSong.items);
  const GET_PLAYLIST = useSelector((state) => state.getPlaylist.items);

  const dispatch = useDispatch();

  const Audio = useRef(null);
  const SongSlider = useRef(null);

  useEffect(() => {
    SetData(GET_CURRENTSONG);
    console.log(GET_CURRENTSONG);
    SetIsSongplaying(true);
    var minutes = Math.floor(Audio?.current?.duration / 60);
    var seconds = Audio?.current?.duration - minutes * 60;
    minutes = minutes.toString().padStart(2, "0");
    seconds = ~~seconds;
    SetSongDuration(`${minutes}:${seconds}`);
  }, [GET_CURRENTSONG]);

  const playPause = () => {
    if (isSongplaying == true) {
      SetIsSongplaying(false);
      Audio.current.pause();
    } else {
      SetIsSongplaying(true);
      Audio.current.play();
    }
  };

  const changeVolume = (value) => {
    Audio.current.volume = value;
  };

  setInterval(() => {
    var minutes = Math.floor(Audio?.current?.currentTime / 60);
    var seconds = Audio?.current?.currentTime - minutes * 60;
    minutes = minutes.toString().padStart(2, "0");
    seconds = ~~seconds;
    SetCurrentTime(`${minutes}:${seconds}`);
    SetRangeCurrentTime(Audio?.current?.currentTime);

    // SongSlider.onInput(() => {
    //   var value = (this.value-this.min)/(this.max-this.min)*100
    //   this.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + value + '%, #fff ' + value + '%, white 100%)'
    // })
  });

  const handleSongSlider = (target) => {
    console.log(target.value);
    Audio.current.currentTime = target.value;
  };

  const repeatSong = () => {
    if (!repeatStatus) {
      Audio.current.loop = true;
      SetRepeatStatus(true);
    } else {
      Audio.current.loop = false;
      SetRepeatStatus(false);
    }
  };

  const nextSong = (id) => {
    const currentIndex = GET_PLAYLIST.findIndex((song) => song.id === id);
    console.log(currentIndex);
    const nextSongIndex = currentIndex + 1;
    const nextSong = GET_PLAYLIST[nextSongIndex];
    dispatch({
      type: "SONG_SELECTED",
      result: nextSong,
    });
  };

  const prevSong = (id) => {
    const currentIndex = GET_PLAYLIST.findIndex((song) => song.id === id);
    console.log(currentIndex);
    const prevSongIndex = currentIndex - 1;
    const prevSong = GET_PLAYLIST[prevSongIndex];
    dispatch({
      type: "SONG_SELECTED",
      result: prevSong,
    });
  };

  const openPlaylist = () => {
    SetRightMenu("w-[33%]");
    SetActiveRightMenu(true);
    SetInnerRightMenu("block");
  };

  const closePlaylist = () => {
    SetRightMenu("w-[6%]");
    SetActiveRightMenu(false);
    setTimeout(() => {
      SetInnerRightMenu("hidden");
    }, 1000);
  };

  const searchMusic = (e) => {
    console.log(e);
  }

  return (
    <div className="bg-player transition-all">
      <img
        src={data?.links?.images[1]?.url}
        alt=""
        className="player-bg-img z-10 "
      />
      <div className=" text-white h-screen overflow-x-hidden w-max-screen relative z-20">
        <img src={Logo} className="w-24 absolute" />

        <div className="flex h-screen">
          <div className="w-[94%] h-screen p-20 flex items-center relative">
          <div className="border-white border-bottom rounded-3xl w-[300px] absolute bg-transparent right-4 top-2 flex items-center  px-2">
            <i className="fa fa-search"></i>
            <input type="text" className="bg-transparent py-2 px-3 w-full" placeholder="Search music"
            onChange={(e) => {
              searchMusic(e.target.value)
            }} />
           </div>
            <div className="w-full">
              <div className="flex items-center w-full">
                <div>
                  <img
                    src={data?.links?.images[1]?.url}
                    className="w-[600px] h-[400px] min-w-[600px] max-w-[600px] rounded-md drop-shadow-2xl"
                  />
                </div>
                <div className="ml-20 relative w-full">
                  <div className="h-[200px]">
                    <p className="text-[40px] text-white font-semibold">
                      {data.name}
                    </p>
                    <div className="flex items-center">
                      <p className="text-[20px] text-orange-200 font-semibold">
                        {data.author}
                      </p>
                      <audio
                        preload="auto"
                        autoPlay={true}
                        src={data.url}
                        type="audio/mpeg"
                        ref={Audio}
                      ></audio>
                    </div>
                  </div>

                  {/* control buttons */}
                  <div className="flex items-center mt-20">
                    <button
                      className="bg-red-400 h-10 w-10 rounded-full flex items-center justify-center mr-2 hover:bg-red-500"
                      onClick={() => {
                        prevSong(data.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                        />
                      </svg>
                    </button>

                    {isSongplaying ? (
                      <button
                        className="bg-red-600 h-14 w-14 rounded-full flex items-center justify-center mr-2"
                        onClick={playPause}
                      >
                        <i className="fa-solid fa-pause"></i>
                      </button>
                    ) : (
                      <button
                        className=" bg-red-500 h-14 w-14 rounded-full flex items-center justify-center mr-2 transition-all"
                        onClick={playPause}
                      >
                        <i className="fa-brands fa-google-play  ml-1"></i>
                      </button>
                    )}

                    <button
                      className="bg-red-400 h-10 w-10 rounded-full flex items-center justify-center mr-2 hover:bg-red-500"
                      onClick={() => {
                        nextSong(data.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* media volume */}
                  <div className="mt-8 flex items-center justify-start">
                    <input
                      type="range"
                      className="volume-slider w-[150px]"
                      id="vol"
                      max="1"
                      min="0"
                      step="0.01"
                      orient="vertical"
                      defaultValue="0.5"
                      onChange={(e) => {
                        changeVolume(e.target.value);
                      }}
                    />
                    <i className="fa-solid fa-volume-high ml-5"></i>
                  </div>
                  {/* ends */}
                </div>
              </div>

              {/* song slider */}
              <div className="flex items-center justify-start mt-16">
                <span className="text-sm text-slate-400 w-[50px]">
                  {currentTime}
                </span>
                <input
                  type="range"
                  className="volume-slider w-[500px]"
                  max={songDuration}
                  min="0"
                  step="0.01"
                  // defaultValue={0}
                  value={rangeCurrentTime}
                  ref={SongSlider}
                  onChange={(e) => {
                    handleSongSlider(e.target);
                  }}
                />
                <span className="text-sm ml-3 text-slate-400">
                  {songDuration}
                </span>
                <i className="fa-solid fa-shuffle ml-24 cursor-pointer h-10 w-10 flex items-center justify-center"></i>
                {repeatStatus ? (
                  <button
                    className="bg-red-400 h-10 w-10 rounded-full flex items-center justify-center ml-5"
                    onClick={repeatSong}
                  >
                    <i className="fa-solid fa-repeat cursor-pointer"></i>
                  </button>
                ) : (
                  <i
                    className="fa-solid fa-repeat ml-5 cursor-pointer h-10 w-10 flex items-center justify-center"
                    onClick={repeatSong}
                  ></i>
                )}

                {activeRightMenu ? (
                  <button
                    className="bg-red-400 h-10 w-10 rounded-full flex items-center justify-center ml-5"
                    onClick={openPlaylist}
                  >
                    <i className="fa-solid fa-list cursor-pointer"></i>
                  </button>
                ) : (
                  <i
                    className="fa-solid fa-list ml-5 cursor-pointer h-10 w-10 flex items-center justify-center"
                    onClick={openPlaylist}
                  ></i>
                )}
              </div>
              {/* song slider ends */}
            </div>
          </div>

          <div
            className={`h-screen bg-white text-center rounded-tl-3xl drop-shadow-md flex transition-all ${rightMenu}`}
          >
            <div className="p-5">
              <img
                src={DefaultAlbum}
                className="h-14 w-14 rounded-full mx-auto mt-5 border-[3px] border-red-400"
              />
              <div className="mt-10">
                <div
                  className="border border-x-0 border-slate-300  cursor-pointer px-5"
                  onClick={openPlaylist}
                >
                  <i
                    className={`fa-solid fa-list hover:text-red-600 cursor-pointer  py-4 w-full ${
                      activeRightMenu ? "text-red-600" : "text-slate-600"
                    }`}
                  ></i>
                </div>
                <div
                  className="border border-x-0 border-slate-300 border-t-0 cursor-pointer px-5"
                  onClick={(e) => {
                    SetRecentMenu("h-[600px] p-4");
                  }}
                >
                  <i className="fa-solid fa-clock-rotate-left text-slate-600 hover:text-red-600 cursor-pointer  py-4 w-full"></i>
                </div>
                <div className="border border-x-0 border-slate-300 py-4 px-5 border-t-0">
                  <i className="fa-solid fa-heart text-slate-600 hover:text-red-600 cursor-pointer"></i>
                </div>
                <div className="border border-x-0 border-slate-300 py-4 px-5 border-t-0">
                  <i className="fa-solid fa-download text-slate-600 hover:text-red-600 cursor-pointer">
                    <a href={data?.url} download={data?.url}></a>
                  </i>
                </div>

                {/* {isSongplaying ? (
                        <div className="now playing" id="music">
                          <span className="bar n1">A</span>
                          <span className="bar n2">B</span>
                          <span className="bar n3">c</span>
                          <span className="bar n4">D</span>
                          <span className="bar n5">E</span>
                          <span className="bar n6">F</span>
                          <span className="bar n7">G</span>
                          <span className="bar n8">H</span>
                        </div>
                      ) : null} */}
              </div>
            </div>

            {/* playlist starts */}
            <div
              className={`min-h-screen overflow-hidden  bg-slate-900 rounded-tl-3xl drop-shadow-2xl w-full p-4 ${innerRightMenu}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[17px] text-white font-semibold relative text-left">
                  <i className="fa-solid fa-list text-white mr-3"></i>
                  Playlist
                </p>
                <button onClick={closePlaylist}>
                  <i className="fa-solid fa-times text-white mr-3 text-2xl"></i>
                </button>
              </div>

              <div className="mt-3 max-h-[40rem] overflow-auto custom-scrollbar text-left">
                <Playlist />
              </div>
            </div>

            {/*  */}
          </div>
        </div>
        {/* screen ends */}

        {/*Open Recent music */}
        <div
          className={`absolute min-w-full overflow-hidden transition-all recent-bg bottom-0 w-full rounded-t-3xl ${recentMenu} `}
        >
          <p className="text-[17px] text-white font-semibold relative ">
            <i className="fa-solid fa-clock-rotate-left text-white mr-3"></i>
            Recently played
          </p>
          <button
            onClick={(e) => {
              SetRecentMenu("h-[0px] p-0");
            }}
          >
            <i className="fa-solid fa-times text-white mr-3 absolute right-2 top-3 text-2xl"></i>
          </button>

          <div className="mt-3 max-h-[30rem] overflow-auto custom-scrollbar">
            <Recent />
          </div>
        </div>
      </div>
    </div>
  );
}
