let now_playing = document.querySelector(".nowPlaying");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let palyPause_btn = document.querySelector(".playPause");
let prev_btn = document.querySelector(".prev-track");
let next_btn = document.querySelector(".next-track");

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
        image: "https://source.unsplash.com/Qrspubmx6kE/640x360",
        path: "../music/Broke For Free - Night Owl.mp3",
    },
    {
        name: "Enthusiast",
        artist: "Tours",
        image: "https://www.aimm.edu/hubfs/Blog%20Images/Top%2010%20Album%20Covers%20of%202017/Tyler%20the%20Creator-%20Flower%20boy.jpg",
        path: "https://soundcloud.com/tokitoh/enthusias?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    },
    {
        name: "Shipping Lanes",
        artist: "Chad Crouch",
        image: "https://images.theconversation.com/files/512871/original/file-20230301-26-ryosag.jpg?ixlib=rb-1.1.0&rect=97%2C79%2C5799%2C5817&q=45&auto=format&w=926&fit=clip",
        path: "https://soundcloud.com/arrivals-and-departures-811819221/shipping-lanes?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    },
];

//從曲清單載入新曲目
function loadTrack(track_index) {
    //情除先前歌曲
    clearInterval(updateTimer);
    resetValues();

    if (track_list[track_index]) {
        
        //載入新歌曲
        curr_track.src = track_list[track_index].path;
        curr_track.load();

        //更新歌曲資訊
        if (track_art) {
            track_art.style.backgroundImage = "url("+ track_list[track_index].image +")";
        }
        if (track_name) {
            track_name.textContent = track_list[track_index].name;
        }
        if (track_artist) {
            track_artist.textContent = track_list[track_index].artist;
        }
        if (now_playing) {
            now_playing.textContent = "PLAYING" + (track_index + 1) + " OF " + (track_list.length);
        }

        updateTimer = setInterval(seekUpdate, 1000);

        curr_track.addEventListener("ended", nextTrack);

        random_bg_color();
    } else {
        console.error("Invalid track index or missing track data.");
    }

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
function playPause() {
    //根據當前狀態切換撥放或暫停
    if ( !isPlaying ) {
        playTrack();
    } else {
        pauseTrack();
    }
}

function playTrack() {
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
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = track_list.length - 1;
    }

    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    //計算滑桿的當前位置占全部的幾%
    let seekPosition = parseFloat(seek_slider.value);

    let seekToTime = (seekPosition / 100) * curr_track.duration;

    curr_track.currentTime = seekToTime;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadTrack(0);


//後續增加音樂清單分頁