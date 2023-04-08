$("#cate_blog").change(function () {
	window.location.href = $(this).find(":selected").data("alias");
});
var mucluc = document.getElementById("mucluc_blog");
var input1 = document.getElementById("content_blog");
var contentmucluc = document.getElementById("list_mucluc");
var ml = document.getElementById("right_detail");
var title_mucluc = document.getElementById("title_mucluc");
if (mucluc != null && input1 != null) {
	var input2 = input1.getElementsByTagName("*");
	var h2 = input1.getElementsByTagName("H2").length;
	var h3 = input1.getElementsByTagName("H3").length;
	var h4 = input1.getElementsByTagName("H4").length;
	var h5 = input1.getElementsByTagName("H5").length;
	if (h2 > 0 || h3 > 0 || h4 > 0 || h5 > 0) {
		var tieudemucluc = document.getElementById("title_mucluc");
		var strong = document.createElement("strong");
		tieudemucluc.appendChild(strong);
	} else {
		mucluc.style.display = "none";
	}
	for (i = 0; i < input2.length; i++) {
		if (
			input2[i].tagName == "H1" ||
			input2[i].tagName == "IMG" ||
			input2[i].tagName == "H2" ||
			input2[i].tagName == "H3" ||
			input2[i].tagName == "H4" ||
			input2[i].tagName == "H5" ||
			input2[i].tagName == "H6"
		) {
			var uri_ct = input2[i].textContent;
			if (input2[i].tagName == "H1") {
				input2[i].setAttribute("id", uri_ct + i);
				var li = document.createElement("div");
				var href = document.createElement("a");
				if (input2[i].hasAttribute("img")) {
				}
				href.href = "#" + uri_ct + i;
				href.innerHTML = uri_ct;
				href.className = "H1abc";
				li.appendChild(href);
				contentmucluc.appendChild(li);
			}
			if (input2[i].tagName == "H2") {
				input2[i].setAttribute("id", uri_ct + i);
				var li = document.createElement("li");
				var href = document.createElement("a");
				href.href = "#" + uri_ct + i;
				href.innerHTML = uri_ct;
				href.className = "H2abc";
				li.appendChild(href);
				contentmucluc.appendChild(li);
				input2[i].style.marginLeft = "20px";
			}
			if (input2[i].tagName == "H3") {
				input2[i].setAttribute("id", uri_ct + i);
				var li = document.createElement("li");
				var href = document.createElement("a");
				href.href = "#" + uri_ct + i;
				href.className = "H3abc";
				href.innerHTML = uri_ct;
				li.appendChild(href);
				contentmucluc.appendChild(li);
			}
			if (input2[i].tagName == "H4") {
				input2[i].setAttribute("id", uri_ct + i);
				var li = document.createElement("li");
				var href = document.createElement("a");
				href.href = "#" + uri_ct + i;
				href.className = "H4abc";
				href.innerHTML = uri_ct;
				li.appendChild(href);
				contentmucluc.appendChild(li);
			}
		}
		// if (input2[i].tagName == 'IMG') {
		//   input2[i].setAttribute("class", "view");
		// }
	}
}
