var wakeUpTime = 7;
const noon = 12;
const lunchTime = 12;
const napTime = lunchTime + 2;
let partyTime;
const evening = 18;

var showCurrentTime = function() {
    const clock = document.getElementById('currentTime');

    const currentTime = new Date();

    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    let meridian = "AM";

    //set hours
    if (hours >= noon) {
        meridian = "PM"; //切換早晚
        hours = hours % 12;
    }

    //set minutes 小於十分鐘數字前面補0
    if (hours < 10) {
        hours = "0" + hours;
    }

    //set minutes 小於十分鐘數字前面補0
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    //set Seconds 小於十秒鐘數字前面補0
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    //組裝在一起
    var clockTime = hours + ':' + minutes + ':' + seconds + ' ' + meridian + '!';

    clock.innerText = clockTime;
};

// Getting the clock to increment on its own and change out messages and pictures
var updateClock = function () {
    var time = new Date().getHours();
    var messageText;
    var image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";
    
    var timeEventsJS = document.getElementById('timeEvent');
    var lolcatImageJS = document.getElementById('lolcatImage');

    if (time == partyTime) {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/partyTime.jpg";
        messageText = "Let's party!";
    } else if (time == wakeUpTime) {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat1.jpg";
        messageText = "Wake up!";
    } else if (time == lunchTime) {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat2.jpg";
        messageText = "Let's have some lunch!";
    } else if (time == napTime) {
        image ="https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat3.jpg";
        messageText = "Sleep tight!";
    } else if (time < noon) {
        image = "https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg";
        message = 'Good morning!';
    } else if (time >= evening) {
        image = "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cat_sleep.jpg";
        messageText = "Good afternoon!";
    }

    console.log(messageText);
    timeEventsJS.innerText = messageText;
    lolcatImage.src = image;
    
};

updateClock();

window.onload = function() {
    showCurrentTime();

    setInterval(showCurrentTime, 1000);
}

var partyButton = document.getElementById('partyTimeButton');

var partyEvent = function() {
    if (partyTime < 0) {
        partyTime = new Date().getHours();
        partyButton.innerText = "Party Over!";
        partyButton.style.backgroundColor = "#0A8DAB";
    } else {
        partyTime = -1;
        partyButton.innerText = "Party Time!";
        partyButton.style.backgroundColor = '#222';
    }
};

partyButton.addEventListener("click", partyEvent);
partyEvent();

//設置起床選擇器
var wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector");

var wakeUpEvent = function() {
    wakeUpTime = wakeUpTimeSelector.value;
};

wakeUpTimeSelector.addEventListener("change", wakeUpEvent);

//設置午餐選擇器
var lunchTimeSelector = document.getElementById("lunchTimeSelector");

var lunchEvent = function() {
    lunchTime = lunchTimeSelector.value;
}

//預計改成簡易工作打卡-個人桌面
//顯示當前日期(星期),時間 (逢六日顯示今天放大假) //額外有時間:串API得到國慶假日提示今天要補班or特殊節日
//可以打卡->打卡後顯示下班倒數計時 (自動計時9hr)，下班打卡後顯示下班 //額外有時間: 下班倒數5分鐘提示記得打卡
//自由的午休時間 (1hr 下午三點前都可以用) > 午休中顯示提示圖片

