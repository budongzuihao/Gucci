define(["jquery", "jquery-cookie"], function($){
	function show(){
		$(function(){
			$("#more").click(function(){
				$("#Goods3").css({display:"block"});
				$("#more").css({display:"none"});
				$("#more1").css({display:"block"});
			});
			$("#more1").click(function(){
				$("#Goods3").css({display:"none"});
				$("#more").css({display:"block"});
				$("#more1").css({display:"none"});
			});
		// 获取商品信息
			$.ajax({
				url: '../data/watchs.json',
				type: "GET",
				success: function(res){
					// alert(res);
					//将数据通过循环遍历，添加到页面上
					var html1 = "";
					var html2 = "";
					for(var i = 0; i < res.length; i++){
						if(i != 3){
							html1 += `
						<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12" href=""}' style="border-right:2px solid #fff;background:#e7e7e7;margin-top:10px">
							<img class="col-lg-12 col-md-12 col-sm-12 col-xs-12" src="${res[i].images1}" alt="" style="height:100%;">
							<h1 class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="color:black;font-size:14px;text-align:center">${res[i].title}</h1>
							<h2 class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="color:#7e161d;font-size:14px;text-align:center">￥${res[i].price}</h2>
							<h3  class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="color:red;font-size:14px;text-align:center"><button id="${res[i].id}" value="${res[i].price}">加入购物车</button></h3>
						</div>
						`;
						}else{
							html2 += `
						<h1 style="font-size:16px;text-align:center;padding-top:20px" class="col-lg-12">${res[i].title}</h1>
						<span style="font-size:14px;text-align:center;padding-top:20px" class="col-lg-12">${res[i].dec}</span>
						<a href="" class="col-lg-12" style="display:block;text-align:center;padding-top:20px">立即购买</a>
						<a href="" id = '${res[i].id}'><img src="${res[i].images1}" alt="" class="col-lg-12" style="height:100%;margin-top:12px"></a>
						`
						}
					}
					$("#Goods1-l").html(html1);
					$("#Goods1-r").html(html2);

					$("#Goods2-l").html(html2);
					$("#Goods2-r").html(html1);

					$("#Goods3-l").html(html1);
					$("#Goods3-r").html(html2);

					$("#Goods3-l1").html(html2);
					$("#Goods3-r1").html(html1);
					
				},
				error: function(msg){
					alert(msg);
				}
			});
		
		//页面刷新时也获得数据
			sc_msg();
			sc_car();

		//清除cookie
			$("#clean").click(function(){
				$.cookie("goods", "", {expires: -1});
				$("#buy-p").css({display:"block"});
				$("#Buylist").css({display:"none"});
			})

		// 添加购物车,cookie
			$("#Goods").on("click", "button", function(){
				var id = this.id;
				var price = this.value;
				var first = $.cookie("goods") == null ? true : false;
				if(first){
					//第一次添加，直接将cookie存储进去
					$.cookie("goods", `[{ id:${id},price:${price},num:1}]`, {
						expires: 7,
						raw: true
					});
				}else{
					//2、判断之前是否添加过商品
					var cookieStr = $.cookie("goods");
					var arr = eval(cookieStr);  
					var same = false; //假设没有添加过
					for(var i = 0; i < arr.length; i++){
						if(arr[i].id == id){
							//之前存储过数量+1
							arr[i].num++;
							same = true;
							break;
						}
					}
					if(!same){
						//4、没有相同的
						var obj = {id: id,price:price,num: 1};
						arr.push(obj);
					}
					$.cookie("goods", JSON.stringify(arr), {
						expires: 7,
						raw: true
					});
				}
				sc_car();
			});
			
		//鼠标移入获取购物车信息
			$("#buybeg1").mouseover(function(){
				sc_msg();
				//有cookie时显示内容，无cookie购物车为空
				 if($.cookie("goods")!=null){
				 	$("#Buylist").css({display:"block"});
				 	$("#buy-p").css({display:"none"});
				 }else{
				 	$("#buy-p").css({display:"block"});
				 }
			});

		//加载进入购物车的商品
			function sc_msg(){
				$.ajax({
					url: "../data/watchs.json",
					type: "get",
					success: function(res){
						// alert(res);
						var sc_arr = eval($.cookie("goods"));
						// alert(sc_arr);
						var html = '';
						if(sc_arr){
							for(var i = 0; i < sc_arr.length; i++){
								html += `<li style="height:120px;border-bottom:1px solid #fff">
					<div class = 'sc_goodsPic' style="float:left;margin-top:10px">
						<img src="${res[sc_arr[i].id].images1}" alt="" style="width:100px;height:100px">
					</div>
					<div class = 'sc_goodsTitle'style="margin-top:20px;text-align:center">
						<p>${res[sc_arr[i].id].title}</p>
						<div class = 'sc_goodsNum' style="">商品数量:${sc_arr[i].num}</div>
						<div class = 'sc_goodsNum'>商品价格:${res[sc_arr[i].id].price}</div>
					</div>
				</li>`;
							}
							$("#buylist").html(html);
						}

					},
					error:function(msg){
						// alert(msg);
					}
				})
			}
		
		//购物车内商品数量
			function sc_car(){
				var sc_str = $.cookie("goods");
				if(sc_str){
					var sc_arr = eval(sc_str);
					var sum = 0;
					var add = 0;			
					for(var i = 0; i < sc_arr.length; i++){
						sum += sc_arr[i].num;
					}
					// 计算商品总价
					for(var i = 0; i < sc_arr.length; i++){
						add += sc_arr[i].num * sc_arr[i].price ;
					}
					$(".sc_num").html(sum);
					$("#total").html(add);
				}
			}

		})
	}
	return {
		show: show
	}
});