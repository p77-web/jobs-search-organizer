$(document).on("scroll", function () {
	if ($(document).scrollTop() > 86) {
		$("#banner").addClass("shrink");
	} else {
		$("#banner").removeClass("shrink");
	}
});
function getEventTarget(e) {
	e = e || window.event;
	return e.target || e.srcElement;
}

let ul = document.getElementById("list");
let link = document.getElementsByClassName("nav-item");
$(link).on("mouseover", function (event) {
	var target = getEventTarget(event);
	$(this).addClass(target.innerHTML);
});

$(link).on("mouseout", function (event) {
	var target = getEventTarget(event);
	$(this).removeClass(target.innerHTML);
});
