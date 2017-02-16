// 管理dialogDrag的js函数组件

// 获取元素对象
function gId(id){
	return document.getElementById(id);
}

var pageWidth, pageHeight;

// 自动居中 - 登录浮层
function autoCenter( el ){
	//兼容IE6，混杂模式取得视口大小
	pageWidth  = window.innerWidth;
	pageHeight = window.innerHeight;

	if (typeof pageWidth != 'number'){
	    if (document.compatMode == 'number'){ 
	        pageWidth  = document.documentElement.clientWidht;
	        pageHeight = document.documentElement.clientHeight;
	    } else {
	        pageWidth  = document.body.clientWidht;
	        pageHeight = document.body.clientHeight;
	    }
	}

	var elW = el.offsetWidth;
	var elH = el.offsetHeight;

	el.style.left = ( pageWidth - elW ) / 2 + 'px';
	el.style.top  = ( pageHeight - elH ) / 2 + 'px';
}

var mouseOffsetX = 0;    // 偏移
var mouseOffsetY = 0;

var isDragging = false;  // 是否可拖动(true可拖，false不可)
// 鼠标事件1 - 会话框标题区域按下时计算距离左上角距离，并标记为可拖动
document.querySelector('.ui-dialog-title').addEventListener('mousedown',function(e){
	var e = e || window.event;
	
	mouseOffsetX = e.pageX - gId('dialog').offsetLeft;
	mouseOffsetY = e.pageY - gId('dialog').offsetTop;

	isDragging = true;
})

// 鼠标事件2 - 鼠标移动时（检测是否为可标记，若果是，变更元素位置）
document.addEventListener('mousemove',function(e){
	var e = e || window.event;

	var moveX = e.pageX - mouseOffsetX;
	var moveY = e.pageY - mouseOffsetY;

	var maxX = pageWidth - gId('dialog').offsetWidth;
	var maxY = pageHeight - gId('dialog').offsetHeight;

	moveX = Math.max( 0, Math.min( maxX, moveX ) );  //限定X坐标
	moveY = Math.max( 0, Math.min( maxY, moveY ) );  //限定Y坐标

	if ( isDragging === true ) {
		gId('dialog').style.left = moveX + 'px';
		gId('dialog').style.top  = moveY + 'px';
	}

})

// 鼠标事件3 - 鼠标松开的时候（标记为不可拖动）
document.addEventListener('mouseup',function(){
	isDragging = false;
})

// 显示dialog和mask遮罩
function showDialog(){
	var el = gId('dialog');
	el.style.display = 'block';
	gId('mask').style.display = 'block';
	autoCenter(el);
}

// 关闭dialog和mask遮罩
function hideDialog(){
	gId('dialog').style.display = 'none';
	gId('mask').style.display = 'none';
}

window.onresize = function(){
	autoCenter(gId('dialog'));
}