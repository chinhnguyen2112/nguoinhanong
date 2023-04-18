function show_menu(e, type) {
	if (type == 1) {
		$(".header_menu").show();
		$(e).attr("onclick", "show_menu(this,2)");
	} else {
		$(".header_menu").hide();
		$(e).attr("onclick", "show_menu(this,1)");
	}
}
$('#search').validate({
	onclick: false,
	rules: {
		search: {
			required: true,
		},
	},
	messages: {
		search: {
			required: "Vui lòng nhập từ khóa",
		},
	},
	submitHandler: function() {
		var formData = new FromData($('#search'));
		$.ajax({
			url: "/search",
			type: "GET",
			cache: false,
			contentType: false,
			processData: false,
			dataType: "json",
			data: formData,
			success: function(data) {
				if (data.status == 1) {
					
				} else {
					
				}
			}
		})
	}
});
// })
// if (isset($_REQUEST['search'])) {
// 	$search = addslashes($_GET['search']);
// 	if (empty($search)) {
// 		echo "Vui lòng nhập từ khóa";
// 	} else {
// 		$query = "SELECT * FROM blogs WHERE name LIKE '%$search%'";
// 	}
// }
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
