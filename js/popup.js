var bg = chrome.extension.getBackgroundPage();
var getHtml = document.getElementsByTagName("html")[0];
var getClock = document.getElementById("img");
var getImg = document.getElementById("clock");
var progressbar = document.getElementById("progressbar");
var light = bg.checklight();
var check = document.getElementById("toggle");
var duckwidth = bg.getduckwidth();
//true为黑夜
getClock.style.width = duckwidth + "%";

if (!light) {
    getImg.innerText = `大魔法让时间停止了!`;
    check.checked = true;
    getHtml.id = "htmlbg2";
    progressbar.id = "progressbar2";
}
//自适应窗口大小
var WandH = bg.getWandH();
getHtml.style.width = WandH.winWidth * 1 / 5 + "px";
getHtml.style.height = WandH.winHeight * 1 / 7 + "px";
console.log(getHtml.style.width);

//文字提示和小鸭子前进
getClock.style.left = `${bg.timer() - 10}%`;

if (Math.floor(bg.timer() * 36 / 60) == 60) {
    getImg.innerText = `快给我水给我水给我水！`;
    getClock.src = "../img/dead.png";
}

//水向前变色
document.getElementsByClassName("bar")[0].style.width = `${bg.timer()}%`;

document.getElementById("refresh").addEventListener("click", function (e) {
    //刷新计数，小鸭子跑回去
    bg.refresh();
    if (!light) {
        getClock.style.width = duckwidth - 2 + "%";
        bg.smallduck();
        duckwidth = duckwidth - 2;
    } else {
        getClock.style.width = duckwidth + 2 + "%";
        bg.duckbecomefat();
        duckwidth = duckwidth + 2;
    }
    getClock.src = "../img/imok.png";
    getImg.innerText = `哧溜哧溜～喝水了！`;
    getClock.style.left = `-10%`;
    document.getElementsByClassName("bar")[0].style.width = `0%`;
});
//点击太阳时改变样式，并且让background.js中的计数暂停
document.getElementById("sun").addEventListener("click", function (e) {
    //暂停计数
    bg.turnlight();
    light = !light;
    //样式改变
    if (bg.checklight()) {
        getImg.innerText = ``;
        check.checked = false;
        getHtml.id = "htmlbg";
        progressbar.id = "progressbar";
    } else {
        getImg.innerText = `大魔法让时间停止了！`;
        check.checked = true;
        getHtml.id = "htmlbg2";
        progressbar.id = "progressbar2";
    }
});