define(["jquery", "jquery-cookie"], function($){
	function g_show(){
		$(function(){
			check();
			changeimg();
		//鼠标移入更改鼠标样式
			$("#skyblue").on({
				mouseover:function(){
					$(this).css({cursor:"move"});
				}
			});

		// 缩放图片
			$("#changeimg").bind("mousewheel",function() {
   				zoomImg(this);
   				return false;
 			});

		//点击图片，放大镜
			function check(){
				$("#skyblue").click(function(){
					$(document.body).css({"overflow-y":"hidden"});
 					$("#over").css({display:"block"});
				});
				$(document).click(function(e) {
    				if(!$("#skyblue").is(e.target) && $("#skyblue").has(e.target).length === 0 ){  
        				$('#over').css({display:"none"});
        				$(document.body).css({"overflow-y":"auto"});
    				}   
				});

			}

		//图片缩放
			function zoomImg(o) {
  				var zoom = parseInt(o.style.zoom, 10) || 100;
 				zoom += event.wheelDelta / 2; //可适合修改
  				if (zoom > 0 && zoom < 200) o.style.zoom = zoom + '%';
 			}
 			
 		//鼠标移动更改图片	
 			function changeimg(){ 				
 				$("#bigImg, #skyblue").mouseenter(function(){
 					$("#skyblue").css({display:"block"});
 					$("#biggest").css({display:"block"});
 				});
 				$("#bigImg").mousemove(function(e){
                	// var x1 = _e.clientX-this.offsetLeft-$("#skyblue").offsetWidth/2;//事件对象在小盒子内的横向偏移量
                	// var y1 = _e.clientY-this.offsetTop-$("#skyblue").offsetHeight/2;//竖向偏移量
                	var x = - (e.pageX - this.offsetLeft) + 50;
                	var y = - (e.pageY - this.offsetTop) + 220;
                	var x1 = e.pageX - $("#img1").offset().left - $("#skyblue").width()/2;
                	var y1 = e.pageY - $("#img1").offset().top - $("#skyblue").height()/2 ;
                	if(x1<0){
                    	x1 = 0;//当左偏移出小盒子时，设为0
                	}else if(x1 > 241){
                		x1 = 241;
                	}

                	if(y1<0){
                    	y1 = 0;//当上偏移出小盒子时，设为0
                	}else if(y1 > 211){
                		y1 = 211;
                	}
                 
                	$("#skyblue").css({left:x1});
                	$("#skyblue").css({top:y1});
                	$("#bigimg1").css({"left":x});
                	$("#bigimg1").css({"top":y});
 				});
 				$("#bigImg").mouseleave(function(){
 					$("#skyblue").css({display:"none"});
 					$("#biggest").css({display:"none"});
 				});
 			}

 		// //添加购物车
 		// 	$("#getBtns").on("click", function(){
 		// 		var first = $.cookie("goods") == null ? true : false;
 		// 		if(first){
			// 		//第一次添加，直接将cookie存储进去
			// 		$.cookie("goods", `[{ id:0,price:7500,num:1}]`, {
			// 			expires: 7,
			// 			raw: true
			// 		});
			// 	}else{
			// 		//2、判断之前是否添加过商品
			// 		var cookieStr = $.cookie("goods");
			// 		var arr = eval(cookieStr);  
			// 		var same = false; //假设没有添加过
			// 		for(var i = 0; i < arr.length; i++){
			// 			if(arr[i].id == id){
			// 				//之前存储过数量+1
			// 				arr[i].num++;
			// 				same = true;
			// 				break;
			// 			}
			// 		}
			// 		if(!same){
			// 			//4、没有相同的
			// 			var obj = {id: id,price:price,num: 1};
			// 			arr.push(obj);
			// 		}
			// 		$.cookie("goods", JSON.stringify(arr), {
			// 			expires: 7,
			// 			raw: true
			// 		});
			// 	}

 		// 	})

		})
	}
	return {
		g_show: g_show
	}
})