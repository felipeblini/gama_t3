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
		}, 5500);
	}

	$("#enviar").click(function() {
		var $myForm = $('#leadForm')
		if ($myForm[0].checkValidity()) {
			$('.progress').removeClass('hide');
		}
	})
});






