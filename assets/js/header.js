function show_menu(e, type) {
	if (type == 1) {
		$(".header_menu").show();
		$(e).attr("onclick", "show_menu(this,2)");
	} else {
		$(".header_menu").hide();
		$(e).attr("onclick", "show_menu(this,1)");
	}
}
// function show_menu1(e) {
// 	$(".box_menu").show();
// }
// if ($(window).width() <= 1024) {
// 	$(document).click(function (event) {
// 		$target = $(event.target);
// 		if (
// 			!$target.closest(".box_menu").length &&
// 			$(".box_menu").is(":visible") &&
// 			!$target.closest(".img_show_2").length
// 		) {
// 			$(".box_menu").hide(100);
// 		}
// 	});
// }
