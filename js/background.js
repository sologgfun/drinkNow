var count = 0;
var winWidth = 1440;
var winHeight = 860;
var notificationId;
var countdownId = 0;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request.winWidth);
    winWidth = request.winWidth;
    winHeight = request.winHeight;
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

function timer() {
    if (count < 3600) {
        count++;
        chrome.browserAction.setBadgeText({
                text: Math.floor(count++/ 60)+''
                }); chrome.browserAction.setBadgeBackgroundColor({
                color: "#70d2c9"
                // # 70 d2c9
            });
        }
        if (count == 3600) {
            //通知
            notificationAction();
            count++;
        }
        if (count >= 3600) {
            chrome.browserAction.setBadgeText({
                text: 'sos'
            });
            chrome.browserAction.setBadgeBackgroundColor({
                color: [255, 0, 0, 255]
            });
        }
        // console.log(count);
        return count / 36
    }

    function refresh() {
        count = 0;
        //清除五分钟倒计时
        window.clearInterval(countdownId);

        //test
        notificationAction();
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
        chrome.notifications.clear("1",
            (id) => {

                console.log(id);

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

    //按钮事件触发
    chrome.notifications.onButtonClicked.addListener(function (x, y) {
        if (y == 0) {
            count = 0;
            //清除五分钟倒计时
            window.clearInterval(countdownId);
        } else {
            //如果不喝水，就开始五分钟倒计时
            var countdownId = setInterval(Countdown, 1000);
        }
    });

    function getWandH() {
        var WandH = {
            winWidth: winWidth,
            winHeight: winHeight
        }
        console.log(WandH);
        return WandH
    }

    setInterval(timer, 1000);