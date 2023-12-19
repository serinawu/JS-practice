let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let palyPause_btn = document.querySelector(".playPause-track");
let prevTrack = document.querySelector(".prev-track");
let nextTrack = document.querySelector(".next-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

//定義播放清單歌曲
let track_list = [
    {
        name: "Night Owl",
        artist: "Broke For Free",
        image: "Image URL",
        path: "Night_Owl.mp3"
    },
    {
        name: "Enthusiast",
        artist: "Tours",
        image: "Image URL",
        path: "Enthusiast.mp3"
    },
    {
        name: "Shipping Lanes",
        artist: "Chad Crouch",
        path: "Shipping_Lanes.mp3"
    },
];

//從曲清單載入新曲目
function loadTrack(track_index) {
    //情除先前歌曲
    clearInterval(updateTimer);
    resetValues();

    //載入新歌曲
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    //更新歌曲資訊
    track_art.computedStyleMap.backgroundImage = "url("+ track_list[track_index].image +")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING" + (track_index + 1) + " OF " + track_list.length;

    updateTimer = setInterval(seekUpdate, 1000);

     curr_track.addEventListener("ended", nextTrack);

     random_bg_color();
}

function random_bg_color() {
    //取得隨機偏亮的背景色
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

    //設置新的背景色
    document.querySelector(".player_block").style.background = bgColor;
}

//重置所有資料
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

//設定播放按鈕
function playPauseTrack() {
    //根據當前狀態切換撥放或暫停
    if ( !isPlaying ) {
        playPauseTrack()
    } else {
        playPauseTrack()
    };
}

function palyTrack() {
    curr_track.play();
    isPlaying = true;

    //換icon
    palyPause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;

    //換icon
    palyPause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
}

function nextTrack() {
    //播放下一首(如果是最後一首再從第一首開始)
    if (track_index < track_list.length - 1) {
        track_index += 1;
    } else {
        track_index = 0;
    }

    loadTrack(track_index);
    palyTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = track_list.length - 1;
    }

    loadTrack(track_index);
    palyTrack();
}

function seekTo() {
    //計算滑桿的當前位置占全部的幾%
}