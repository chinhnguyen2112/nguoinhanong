var page = 2;
$(".load_more").click(function () {
	var form_data = new FormData();
	form_data.append("page", page);
	$.ajax({
		url: "/load_more",
		type: "POST",
		processData: false,
		contentType: false,
		dataType: "json",
		data: form_data,
		success: function (data) {
			++page;
			if (data.status == 0) {
				$(".load_more").remove();
			} else if (data.status == 1) {
				$(".list_blog_home").append(data.html);
				if (data.next == 0) {
					$(".load_more").remove();
				}
			}
		},
		error: function () {
			alert("error");
		},
	});
});
var check = 1;
$(window).scroll(function () {
	if ($(".load_more").length) {
		if ($(this).scrollTop() > $(".right_home").height() - 500) {
			if (check == 1) {
				console.log(1);
				check = 0;
				var form_data = new FormData();
				form_data.append("page", page);
				$.ajax({
					url: "/load_more",
					type: "POST",
					processData: false,
					contentType: false,
					dataType: "json",
					data: form_data,
					success: function (data) {
						++page;
						if (data.status == 0) {
							$(".load_more").remove();
						} else if (data.status == 1) {
							$(".list_blog_home").append(data.html);
							if (data.next == 0) {
								$(".load_more").remove();
							}
						}
						check = 1;
					},
					error: function () {
						alert("error");
					},
				});
			}
		}
	}
});
$(".slick_banner").slick({
	slidesToShow: 1,
	arrows: false,
	slidesToScroll: 1,
	adaptiveHeight: true,
	autoplay: true,
	infinite: true,
	autoplaySpeed: 2000,
});
