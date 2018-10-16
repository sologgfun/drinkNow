var bg = chrome.extension.getBackgroundPage();
var getHtml = document.getElementsByTagName("html")[0];
var getClock = document.getElementById("img");
var getImg = document.getElementById("clock");
var progressbar = document.getElementById("progressbar");
var light = bg.checklight();
var check = document.getElementById("toggle");
//true为黑夜

if (!light) {
    getImg.innerText = `大魔法让时间停止了！`;
    check.checked = true;
    getHtml.id = "htmlbg2";
    progressbar.id = "progressbar2";
}
//自适应窗口大小
var WandH = bg.getWandH();
getHtml.style.width = WandH.winWidth * 1 / 5 + "px";
getHtml.style.height = WandH.winHeight * 1 / 7 + "px";
console.log(getHtml.style.width);
//文字提示和小鸭子
getClock.style.left = `${bg.timer()-10}%`;
// getImg.style.left = `${bg.timer()}%`;
// getImg.innerText = `${Math.floor(bg.timer()*36/60)}min！(ˊ˘ˋ*)♡`;

if (Math.ceil(bg.timer() * 36 / 60 > 30)) {
    // getImg.className = "clockleft";
    // getImg.style.left = `${bg.timer()-20}%`;
    // getImg.innerText = `${Math.floor(bg.timer()*36/60)}min！(ˊ˘ˋ*)♡`;
}

if (Math.ceil(bg.timer() * 36 / 60 == 60)) {
    getImg.innerText = `快给我水给我水给我水！`;
    getClock.src = "../img/dead.png";
}

//进度条
document.getElementsByClassName("bar")[0].style.width = `${bg.timer()}%`;

document.getElementById("refresh").addEventListener("click", function (e) {
    bg.refresh();
    getClock.src = "../img/imok.png";
    getImg.innerText = `哧溜哧溜～喝水了！`;
    getClock.style.left = `-10%`;
    // getImg.style.left = `0%`;
    document.getElementsByClassName("bar")[0].style.width = `0%`;
    // getImg.className = "clockright";
});

document.getElementById("sun").addEventListener("click", function (e) {
    bg.turnlight();
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