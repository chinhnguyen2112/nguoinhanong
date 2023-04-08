$(".name_top").hover(function () {
	var id = $(this).data("id");
	var active = $(".active").data("id");
	if (id != active) {
		$(".active").removeClass("active");
		$(this).addClass("active");
		if (id == 1) {
			$(".box_top").show();
			$(".box_hay").hide();
			$(".box_hot").hide();
		}
		if (id == 2) {
			$(".box_top").hide();
			$(".box_hay").show();
			$(".box_hot").hide();
		}
		if (id == 3) {
			$(".box_top").hide();
			$(".box_hay").hide();
			$(".box_hot").show();
		}
	}
});
