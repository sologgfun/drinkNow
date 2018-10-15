var bg = chrome.extension.getBackgroundPage();
var getHtml = document.getElementsByTagName("html")[0];
var getClock = document.getElementById("img");
var getImg = document.getElementById("clock");
//自适应窗口大小
var WandH = bg.getWandH();
getHtml.style.width = WandH.winWidth * 1 / 5 + "px";
getHtml.style.height = WandH.winHeight * 1 / 5 + "px";
console.log(getHtml.style.width);
//文字提示和小鸭子
getClock.style.left = `${bg.timer()-10}%`;
getImg.style.left = `${bg.timer()}%`;
getImg.innerText = `已经${Math.floor(bg.timer()*36/60)}min没有喝水了`;

if (Math.ceil(bg.timer() * 36 / 60 > 30)) {
    getImg.className = "clockleft";
    getImg.style.left = `${bg.timer()-20}%`;
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
    getImg.innerText = `吃饱喝足没吱吱吱吱吱！`;
    getClock.style.left = `-10%`;
    getImg.style.left = `0%`;
    document.getElementsByClassName("bar")[0].style.width = `0%`;
    getImg.className = "clockright";
});