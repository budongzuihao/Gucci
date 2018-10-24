define(["jquery", "jquery-cookie"], function($){
	function check(){
		$(function(){
		//获取json
			$.ajax({
				url: '../data/watchs.json',
				type: "GET",
				success:function(res){
					// alert(res);
					//获取当前页面的cookie，添加数据
					var sc_arr = eval($.cookie("goods"));
					var html = "";
					for(var i = 0; i < sc_arr.length; i++){
						html += `<li class="col-lg-12" style="margin-bottom:20px;border-top:1px solid #545454;border-bottom:1px solid #545454;">
							<img class="col-lg-4" style="height:100%" src="${res[sc_arr[i].id].images1}" alt="" />
						<div class="col-lg-8"style="line-height:203px" >
							<p class="col-lg-6">${res[sc_arr[i].id].title}</p>
							<div class="col-lg-3" style="">数量:${sc_arr[i].num}</div>
							<div class="col-lg-3">￥:${res[sc_arr[i].id].price}</div>
						</div>
						<button id="${res[sc_arr[i].id].id}i" style="border:none;padding:10px;margin-left:200px;background:black;color:#fff" class="bbtn">删除</button>
						</li>`
					}
					$("#wares").html(html);
				},
				error: function(msg){
					alert(msg);
				}
			});

		// 删除商品
			$("#wares").on("click", ".bbtn", function(){
				var id = parseInt(this.id);	
				var str = $.cookie('goods');
				var arr = eval(str);
				for(var i = 0; i < arr.length; i++){
					if(arr[i].id == id){
						var removed = arr.splice(i,1);
						// alert(removed);
						var cookieStr = JSON.stringify(removed);
						alert(cookieStr);
						$.cookie('goods', cookieStr, {expires: 7}); 
					}
					break;
				}               
			})

		// 有无cookie
			if($.cookie("goods")!=null){
				$("#wares, #wares1").css({display:"block"});
				$("#nobeg").css({display:"none"});
			}else{
				$("#wares, #wares1").css({display:"none"});
				$("#nobeg").css({display:"block"});
			}
			sc_car();
		//购物车内商品数量
			function sc_car(){
				var sc_str = $.cookie("goods");
				if(sc_str){
					var sc_arr = eval(sc_str);
					var add = 0;			
					// 计算商品总价
					for(var i = 0; i < sc_arr.length; i++){
						add += sc_arr[i].num * sc_arr[i].price ;
					}
					$("#ware-span").html("￥" + add);
				}
			}

		})
	}
	return {
		check: check
	}
})