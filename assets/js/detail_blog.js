$(document).ready(function () {
	$("#list_mucluc").toc({
		content: "div.content_blog",
		headings: "h2,h3,h4",
		indexingFormats: {
			h2: "number",
			h3: "number",
			h4: "number",
		},
	});
});
var check_click = 0;
$(".box_title_ml").click(function () {
	if (check_click % 2 == 0) {
		$(".list_mucluc").hide(100);
		$(".img_show_ml").css("rotate", "0deg");
	} else {
		$(".list_mucluc").show(100);
		$(".img_show_ml").css("rotate", "90deg");
	}
	++check_click;
});
var click_pass = 0;
var val = $("#mk_show").val();
var time = 30;
$(".text_show_pass").click(function () {
	if (click_pass == 0) {
		click_pass = ++click_pass;
		$(this).text("Chờ 30s");
		start = setInterval(function () {
			time = --time;
			console.log(1);
			$(".text_show_pass").html("Chờ " + time + "s");
			if (time <= 0) {
				$(".text_show_pass").html(val);
				clearInterval(start);
			}
		}, 1000);
	}
});
$(document).on("visibilitychange", function () {
	if (click_pass > 0) {
		if (document.visibilityState == "hidden") {
			clearInterval(start);
		} else {
			start = setInterval(function () {
				time = --time;
				$(".text_show_pass").html("Chờ " + time + "s");
				if (time <= 0) {
					$(".text_show_pass").html(val);
					clearInterval(start);
				}
			}, 1000);
		}
	}
});
