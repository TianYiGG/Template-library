$(document).ready(function() {
	var pages = 0; //页码
	var site = 'http://h5.0537ys.com';
	var color = -1;
	var industry = -1;
	//动态添加的元素要用事件监听
	//当选择行业的时候 吧行业id提取出来 然后清空 product列表 最后吧页码初始化为0    调用请求数据函数
	$('#industry').on('click','li a',function(){
		industry = $(this).data('id');
		$('.product').html('');
		pages = 0;
		scrolllist();
	})
	//同上
	$('#color').on('click','li',function(){
		color = $(this).data('id');
		$('.product').html('');
		pages = 0;
		scrolllist();
	})
	//获取行业
	$.ajax({
		type: "post",
		url: site + "/index/index/ajaxIndustry",
		dataType: "json",
		async: true,
		// 允许携带证书
		xhrFields: {
			withCredentials: true
		},
		// 允许跨域
		crossDomain: true,
		success: function(data) {
			var data = JSON.parse(data);
			if (data.code == 2) {
				// alert('请先登录');
				// window.location.href = "/dome/login.html";
			} else if (data.code == 1) {
				alert(data.msg);
			} else {
				$.each(data.list, function(index, item) {
					$('#industry').append('<li><a href="javascript:;" data-id="' + index + '">' + item + '</a></li>');
					$('#do-not-say-1').append('<div class="am-panel-bd" data-id="' + index + '">' + item + '</div>')
				});
			}
		},
		error: function(err) {
			console.log(err);
		}
	});

	//获取颜色
	$.ajax({
		type: "post",
		url: site + "/index/index/ajaxColor",
		dataType: "json",
		async: true,
		// 允许携带证书
		xhrFields: {
			withCredentials: true
		},
		// 允许跨域
		crossDomain: true,
		success: function(data) {
			var data = JSON.parse(data);
			console.log(data.list);
			if (data.code == 2) {
				alert('请先登录');
				window.location.href = "/login.html";
			} else if (data.code == 1) {
				alert(data.msg);
			} else {
				$.each(data.list, function(index, item) {
					$('#color').append('<li data-id="' + index + '"><a href="javascript:;">' + item + '</a></li>');
					$('#do-not-say-2').append('<div class="am-panel-bd" data-id="' + index + '">' + item + '</div>')
				});
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
	//懒加载
	$(window).scroll(function() {
		//z总高度
		var height = $(document).height();
		//页面高度
		var h = $(this).height();
		//滑动的高度
		var scrolltop = $(this).scrollTop();
		if (h + scrolltop >= height) {
			scrolllist()
		}
	})
	//请求数据函数
	function scrolllist() {
		pages += 1;
		//baidu.com?&industry=industry&a=color&k=pages;
		var s = ''; //初始化一个变量
		var url = site + "/index/index/index";
		//如果行业id 不等于 -1 就把行业id赋值给 s 变量
		if(industry != -1){
			//&industry=1
			s +="&industry="+industry; //拼接url
		}
		//如果颜色id 不等于 -1 就把颜色id赋值给 s 变量
		if(color != -1){
			//&color=2
			s +="&color="+color;    //拼接url
		}
		//如果页码id 不等于 >1 就把页码值赋值给 s 变量
		
		if (pages > 1) {
			s +="&pages"+pages;    //拼接url
		}
		url +='/?'+s;    //最终拼接url
		console.log(url)
		// alert(pages)

		$.ajax({
			type: "get",
			url: url,
			dataType: "json",
			async: true,
			// 允许携带证书
			xhrFields: {
				withCredentials: true
			},
			// 允许跨域
			crossDomain: true,
			success: function(data) {
				//var data = JSON.parse(data);
				if (data.code == 2) {
					alert('请先登录');
					window.location.href = "/dome/login.html";
				} else if (data.code == 1) {
					alert(data.msg);
				} else {
					// console.log(data.list)

					$.each(data.list, function(index, item) {
						$('.content ul').append(
							`
		                <li data-am-scrollspy="{animation: 'slide-bottom'}">
						<div class="item-img">
							<a href="#">
								<img src="${site}${item.thumbnail}">
							</a>
							<div class="btn">
								<a href="details.html?id=${item.id}">点击预览</a>
							</div>
						</div>
						<div class="item-wrapper">
							<p>${item.number}</p>
							<p>${item.industry}</p>
						</div>
					</li>                    
		                `
						);
					});
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	}
	scrolllist();

})
