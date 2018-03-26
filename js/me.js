$(function(){
//导航切换到相应内容
$('#ad-carousel').carousel();
$('#menu-nav .navbar-collapse a').click(function (e) {
	var href = $(this).attr('href');
	var tabId = $(this).attr('data-tab');
	if ('#' !== href) {
		e.preventDefault();
		$(document).scrollTop($(href).offset().top - 70);
		if (tabId) {
			$('#feature-tab a[href=#' + tabId + ']').tab('show');
		}
	}
	
});
//返回顶部
$(".totop").click(function() {
	$("html,body").animate({scrollTop:0}, 500);
}
); 
})

