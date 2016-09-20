$(document).ready(function () {
	$(window).scroll(function () {
		$(".slideanim").each(function () {
			var pos = $(this).offset().top;

			var winTop = $(window).scrollTop();
			if (pos < winTop + 600) {
				$(this).addClass("slide");
			}
		});
	});

	var erromessage = $('.erromessage').html();

	if (erromessage) {
		$('.error').removeClass('hide');

		window.setTimeout(function () {
			$('.error').fadeOut();
		}, 3500);
	}
});






