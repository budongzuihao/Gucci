console.log("加载成功");
// 管理主页引入的模块
require.config({
	paths: {
		"jquery": "jquery-1.11.3",
		"jquery-cookie": "jquery.cookie",
		"index": "index",
		"watchs": "watchs",
		"goodsshow":"goodsshow",
		"check":"check"
	},
	//设置模块之间的依赖关系
	shim: {
		"jquery-cookie": ["jquery"]
	}
})


require(['index', "watchs", "goodsshow", "check"], function(index, watchs, goodsshow, check){
	index.header();
	watchs.show();
	goodsshow.g_show();
	check.check();
})

