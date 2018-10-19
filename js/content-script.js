var winWidth, winHeight;

//屏幕分辨率版本
winWidth = window.screen.width;
winHeight = window.screen.height;

chrome.runtime.sendMessage({
	winWidth: winWidth,
	winHeight: winHeight
}, function (response) {
});