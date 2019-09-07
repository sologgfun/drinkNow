var count = 0;
var winWidth = 1440;
var winHeight = 860;
var notificationId;
var countdownId = 0;
var light = true;
var duckwidth = 15;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    winWidth = request.winWidth;
    winHeight = request.winHeight;
    sendResponse('');
});

function duckbecomeslim() {
    duckwidth = duckwidth - 4;
}

function duckbecomefat() {
    duckwidth = duckwidth + 2;
}

function smallduck() {
    duckwidth = duckwidth - 2;
}

function getduckwidth() {
    return duckwidth;
}

function checklight() {
    return light
}

function turnlight() {
    light = !light;
}
//计时器，在后台默默计时
function timer() {
    //黑夜停止计时
    if (!light) {
        return count / 36
    }
    if (count < 3600) {
        count++;
        //给浏览器右上角图标加上计时badge
        chrome.browserAction.setBadgeText({
            text: Math.floor(count / 60) + ''
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: "#70d2c9"
        });
    }
    //60分钟通知喝水！
    if (count == 3600) {
        duckbecomeslim();
        notificationAction();
        count++;
    }
    if (count >= 3600) {
        //图标改成红色和sos文案！
        chrome.browserAction.setBadgeText({
            text: 'sos'
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: [255, 0, 0, 255]
        });
    }
    return count / 36
}

function refresh() {
    count = 0;
    //清除五分钟倒计时
    window.clearInterval(countdownId);
}

var fivemin = 0;
var Countdown = function () {
    fivemin++;
    if (fivemin == 300) {
        notificationAction();
        fivemin = 0;
    }
};

function notificationAction() {
    //notification的id要清空，否则create的时候之前id没有清空则会失效
    chrome.notifications.clear("1",
        (id) => {

        });
    chrome.notifications.create("1", {
        type: 'basic',
        iconUrl: 'img/logo.png',
        title: '快喝水！',
        buttons: [{
            title: "喝水",
            iconUrl: 'img/yellowsmile.png'
        }, {
            title: "等会儿",
            iconUrl: 'img/redsmile.png'
        }],
        message: '已经一个小时没喝水了！小鸭子渴死了！'
    });
}

chrome.notifications.onButtonClicked.addListener(function (id, btnIndex) {
    count = btnIndex ? count : 0;
});

function getWandH() {
    var WandH = {
        winWidth: winWidth,
        winHeight: winHeight
    }
    return WandH
}

setInterval(timer, 1000);