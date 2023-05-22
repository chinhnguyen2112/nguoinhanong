function show_menu(e, type) {
	if (type == 1) {
		$(".header_menu").show();
		$(e).attr("onclick", "show_menu(this,2)");
	} else {
		$(".header_menu").hide();
		$(e).attr("onclick", "show_menu(this,1)");
	}
}



function openList() {
	var sidenav = document.getElementById("input_search_none_pc"),
		main = document.getElementById("btn");
	sidenav.style.height = sidenav.style.height == "30px" ? "0" : "30px";
	document.getElementById("input_search_none_pc").style.display = "block";
	main.style.marginTop = main.style.marginTop === "60px" ? "0" : "60px";
}

function closeList() {
	classList.toggle("change");
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
