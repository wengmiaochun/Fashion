$(function(){
	
//返回顶部
$(".totop").click(function() {
	$("html,body").animate({scrollTop:0}, 500);
}); 

//侧滑
$('[data-toggle="offcanvas"]').click(function () {
	$('.row-offcanvas').toggleClass('active')
});

})

