$(document).ready(function() {
	$(window).scroll(function() {
		$(".slideanim").each(function(){
			var pos = $(this).offset().top;

			var winTop = $(window).scrollTop();
			if (pos < winTop + 600) {
				$(this).addClass("slide");
			}
		});

		// $(document).on("load", function() {
		// 	var erro = $('.error').html();

		// 	if(erro != "") {
		// 		$('this').show().setTimeout(function() {

		// 		}, 3500);
		// 	}
		// });

		$('.error').show();
		setTimeout(function() {
			$('.error').fadeOut();
		}, 3500);
	});
});






