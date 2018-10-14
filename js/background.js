var count = 0;
var winWidth = 400;
var winHeight = 200;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
    console.log(request.winWidth);
    winWidth = request.winWidth;
    winHeight = request.winHeight;
	sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

function timer() {
    if(count <3600){
        count++;
    }
    console.log(count);
    return count/36
}

function refresh(){
    console.log("here");
    chrome.notifications.clear("1",
    (id)=>{
   
      console.log(id);
   
    }    );
    chrome.notifications.create("1", {
        type: 'basic',
        iconUrl: 'img/logo.png',
        title: '这是标题2',
        buttons:[{title:"烤鸭",iconUrl: 'img/logo.png'},{title:"烤鸭",iconUrl: 'img/logo.png'}],
        message: '您刚才点击了自定义右键菜单！'
    },
    (id)=>{
   
      console.log(id);
   
    }    );
    count = 0;
}

function getWandH(){
    var WandH = {winWidth:winWidth,winHeight:winHeight}
    return WandH
}

setInterval(timer, 1000);

