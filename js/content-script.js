var winWidth,winHeight;

if (window.innerWidth)
winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
winWidth = document.body.clientWidth;

if (window.innerHeight)
winHeight = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
winHeight = document.body.clientHeight;

chrome.runtime.sendMessage({winWidth: winWidth,winHeight:winHeight}, function(response) {
	console.log('收到来自后台的回复：' + response);
});