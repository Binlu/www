$(function(){
	$('.mtpright img').click(function(){

		if($('.mtpright dl').css("display")=="none"){
			$('.mtpright dl').show(200);
			$('.nummainbg').show();
		}else{
		
			$('.mtpright dl').hide(200);
		}
	})
	$('.nummainbg').click(function(){
			$('.mtpright dl').hide(200);
			$('.nummainbg').hide();
		})
})
var topScroll = {
	scrollTop:function(screens){
		if(screens>=1000){
			$(window).scroll(function(){
				var sTop = $(document).scrollTop();
				var imgTop = $('.banners').height();
				if(sTop>imgTop){
					$('#oTOP').css({
						'position':'fixed',
						'top':'0',
						'left':'0',
						'z-index':'999'
					});
					$(".banner-index").css('padding-top',70);
				}else{
					$('#oTOP').css('position','static');
					$(".banner-index").css('padding-top',0);
				}
			})
		}
		
	}
}
topScroll.scrollTop(window.screen.width);