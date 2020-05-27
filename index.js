$(document).ready(function() {
	var pages = 0; //页码
	var site = 'http://h5.0537ys.com';
	var color = -1;   //颜色
	var industry = -1;  //行业
	//要用事件监听
	//行业选择
	$('#industry').on('click','li a',function(){
		industry = $(this).data('id');
		$('.product').html('');
		pages = 0;
		scrolllist();
	})
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
            // console.log(data.list);
				$.each(data.list, function(index, item) {
					$('#industry').append('<li><a href="javascript:;" data-id="' + index + '">' + item + '</a></li>');
					$('#do-not-say-1').append('<div class="am-panel-bd" data-id="' + index + '">' + item + '</div>')
				});
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
			// console.log(data.list);
				$.each(data.list, function(index, item) {
					$('#color').append('<li data-id="' + index + '"><a href="javascript:;">' + item + '</a></li>');
					$('#do-not-say-2').append('<div class="am-panel-bd" data-id="' + index + '">' + item + '</div>')
				});
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
	function scrolllist() {
		//baidu.com?&industry=industry&a=color&k=pages;
		var s = '';
		var url = site + "/index/index/index";
		
		
		if(industry != -1){
			//&industry=1
			s +="&industry="+industry;
		}
		if(color != -1){
			//&color=2
			s +="&color="+color;
		}
		
		pages += 1;
		if (pages > 1) {
			s +="&page="+pages;
		}
		
		url +='/?'+s;

	
		// console.log(url)
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
					// console.log(data.list)
					$.each(data.list, function(index, item) {
						$('.content ul').append(
							`
		                <li data-am-scrollspy="{animation: 'slide-bottom'}">
						<div class="item-img">
							<a href="details.html?id=${item.id}" target="_blank">
								<img src="${site}${item.thumbnail}">
							</a>
							<div class="btn">
								<a href="details.html?id=${item.id}" target="_blank">点击预览</a>
								
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
			},
			error: function(err) {
				console.log(err);
			}
		});
	}
	scrolllist();

})
