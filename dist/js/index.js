define(["jquery", "jquery-cookie"], function($){
	function header(){
		$(function(){
		// 登陆
			mouseoverOut("#login,#login-list", "#login-list");
		//导航栏
			getNav("#show","#goods3", "#goods3", "../data/goods1.json");
			mouseoverOut("#lady,#goods2", "#goods2");
			getNav("#man","#goods3", "#goods3","../data/goods3.json");
			getNav("#watch","#goods3","#goods3","../data/goods4.json");
			getNav("#ornament","#goods3","#goods3","../data/goods5.json");
		//购物袋
			mouseoverOut("#buybeg, #buycar", "#buycar");

		//搜索栏焦点
			focuBlur("#search", "#search-button");
		//登陆注册
			login("#login-in", "#login-page", "#login-pagespan", "#login-in, #login-page");
			loginform();
			registe("#registe","#registe-page","#registe-pagespan", "#registe, #registe-page");
			registeform();
			code();

		//淡入淡出封装
			function mouseoverOut(id1,id2){
				$(id1).on({
					mouseover:function(){
						$(id2).stop().fadeIn(1000).css({display: "block"});
					},
					mouseout:function(){
						$(id2).css({display: "none"})
					}
				})
			}

		//轮播图
			var oBtns = $("#play").find("ol").find("li");
			var oUl = $("#play").find("ul");
			var aLis = oUl.find("li");
			//记录当前图片的下标
			var iNow = 0;
			var timer = null;

			oBtns.click(function(){
				iNow = $(this).index();
				tab();
			})
			//自动滚动
			timer = setInterval(timerInner, 2000);
			function timerInner(){
				iNow++;
				tab();
			}
			//鼠标移入移出
			$("#play").hover(function(){
					clearInterval(timer);
				}, function(){
					timer = setInterval(timerInner, 2000);
			})
			//点击按钮切换图片
			function tab(){
				//先让去除所有按钮active再让当前按钮class = active
				oBtns.attr("class", "").eq(iNow).attr("class", "active");

				oUl.stop().animate({
						top: -230 * iNow
				}, 500, function(){
					if(iNow == aLis.size() - 1){
						oUl.css("top", 0);
						iNow = 0;
					}
				});
			}
			
		//导航栏获取数据
			function getNav(id1,id2,id3,data){
				$(id3).html("");
				$(id1).on({
					mouseover:function(){
						$(id3).stop().fadeIn(1000).css({display: "block"});
						//鼠标移入获取数据
						$.ajax({
							url:data,
							type: "GET",
							success:function(res){
								var html = "";
								for(var i = 0;i < res.length; i++){
									html+=`${res[i].show}`;
								}
								$(id3).html(html);
							},
							error:function(msg){
								alert(msg);
							}
						})
					},
					mouseout:function(){
						$(id3).css({display: "none"})
						$.ajax({
							url:data,
							type: "GET",
							success:function(res){
								var html = "";
								for(var i = 0;i < res.length; i++){
									html+=`${res[i].show}`;
								}
								$("#goods3").html(html);
							},
							error:function(msg){
								alert(msg);
							}
						})

					}
				})
				$(id2).on({
					mouseover:function(){
						$(id3).css({display: "block"});
					},
					mouseout:function(){
						$(id3).css({display: "none"})
					}
				})
			}

		//搜索栏事件
			function focuBlur(id1,id2){
				var swidth = $(id1).width();
				$(id1).focus(function(){
					$(id1).css({background:"#fff",color:"black"})
					$(id1).stop().animate({width:(swidth + 150) + "px"},1000);
					$(id1).attr('placeholder',"搜索商品");
				});
				$(id1).blur(function(){
					$(id1).stop().animate({width:swidth + "px"},1000);
					$(id1).css({background:"#1e1e1e",color:"#fff"});
					$(id1).attr('placeholder',"搜索");
				});
				$(id2).click(function(){
					$(id1).attr('placeholder',"搜索商品");
				})
			}

		//登录/注册
			function login(id1,id2,id3,id4){
				$(id1).click(function(){
					$(id2).css({display:"block"});
					// $(document.body).css({"overflow-y":"hidden"});
					var docHeight = $(document).height(); //获取窗口高度
 					$('body').append('<div id="overlay"></div>');
					$('#overlay').height(docHeight).css({
						'opacity': .9, //透明度
						'display':'block',
						'position': 'absolute',
						'top': 0,
						'left': 0,
						'background-color': 'black',
						'width': '100%',
						'z-index': 50 //保证这个悬浮层位于其它内容之上
 					});
				});
				$(document).click(function(e) {
    				if(!$(id4).is(e.target) && $(id4).has(e.target).length === 0 ){  
        				$(id2).hide();
        				$('#overlay').remove();
    				}   
				});
				$(id3).click(function(){
					$(id2).hide();
        			$('#overlay').remove();
				});
			}
			function registe(id1,id2,id3,id4){
				$(id1).click(function(){
					$(id2).css({display:"block"});
					// $(document.body).css({"overflow-y":"hidden"});
					var docHeight = $(document).height(); //获取窗口高度
 					$('body').append('<div id="overla"></div>');
					$('#overla').height(docHeight).css({
						'opacity': .9, //透明度
						'display':'block',
						'position': 'absolute',
						'top': 0,
						'left': 0,
						'background-color': 'black',
						'width': '100%',
						'z-index': 50 //保证这个悬浮层位于其它内容之上
 					});
				});
				$(document).click(function(e) {
    				if(!$(id4).is(e.target) && $(id4).has(e.target).length === 0 ){  
        				$(id2).hide();
        				$('#overla').remove();
    				}   
				});
				$(id3).click(function(){
					$(id2).hide();
        			$('#overla').remove();
				});

			}
			
		// 登陆注册表单验证
			//登陆
			function loginform(){
				$("#login-txt").blur(function(){
					var oValue = $("#login-txt").val().replace(/ /ig, "");
					if(!oValue){
						$("#txt-i").html('用户名不能为空');
					}else if( /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(oValue) || /^[1][3,4,5,7,8][0-9]{9}$/.test(oValue)){
						$("#txt-i").html('');
					}else{
						$("#txt-i").html('请输入正确的邮箱/手机号');
					}
				});
				$("#login-pwd").blur(function(){
					var oValue = $("#login-pwd").val().replace(/ /ig, "");
					if(!oValue){
						$("#pwd-i").html('密码不能为空');
					}else if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(oValue) && (oValue.length > 6)){
						$("#pwd-i").html('');
					}else{
						$("#pwd-i").html('至少6个字符含数字大小写字母');
					}
				})
			}

		//注册表单验证
			function registeform(){
				$("#registe-txt").blur(function(){
					var oValue = $("#registe-txt").val().replace(/ /ig, "");
					if(!oValue){
						$("#txtI").html('手机号不能为空');
					}else if(/^[1][3,4,5,7,8][0-9]{9}$/.test(oValue)){
						$("#txtI").html('');
					}else{
						$("#txtI").html('手机号为11位纯数字');
					}
				});
				$("#registe-code").blur(function(){
					var oValue = $("#registe-code").val().replace(/ /ig, "");
					var oCode = $("#code").html();
					if(!oValue){
						$("#codeI").html('验证码不能为空');
					}else if(oValue == oCode){
						$("#codeI").html('');
					}else{
						$("#codeI").html('验证码输入错误');
					}
				});
				$("#set-pwd").blur(function(){
					var oValue = $("#set-pwd").val().replace(/ /ig, "");
					if(!oValue){
						$("#pwdI").html('密码不能为空');
					}else if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(oValue) && (oValue.length > 6)){
						$("#pwdI").html('');
					}else{
						$("#pwdI").html('至少6个字符含数字大小写字母');
					}
				});
				$("#confirm-pwd").blur(function(){
					if($("#set-pwd").val() == $("#confirm-pwd")){
						$("#pwdI").html('');
					}else{
						$("#pwdI").html('两次密码输入不一致');
					}
				});
			}

		//验证码
			function code(){
				$("#registe").click(function(){
					$("#code").html(testCode(5));
				});
				$("#code").click(function(){
					$("#code").html(testCode(5));
				});
				$("#changecode").click(function(){
					$("#code").html(testCode(5));
				});
			}
			//生成验证码
			function testCode(n){
				var arr = [];
				for(var i = 0; i < n; i++){
					var num = parseInt(Math.random() * 100);
					if(num >= 0 && num <= 9){
						arr.push(num);
					}else if(num >= 65 && num <= 90){
						var str = String.fromCharCode(num);
						arr.push(str);
					}else if(num >= 17 && num <= 42){
						var str = String.fromCharCode(num + 80);
						arr.push(str);
					}else{
						i--;
					}
				}
				return arr.join("");
			}

		//注册数据库
		
		})
	}
	return {
		header: header
	}
})