var grab = document.querySelector("section#about .about-container"),
	span = document.querySelector("span#mouseMove"),
	slider = document.querySelector("section#about .about-body"),
    dragging = !1,
    startX = 0,
    translateX = 0;

function touchCancel() {
    dragging = !1
}

function touchStart(e) {
    dragging = !0, startX = e.clientX || e.touches[0].pageX
}

function touchMove(e) {
    var t;
    dragging && (t = e.touches[0].pageX, (e = translateX + (t - startX)) <= 0 && grab.offsetWidth - window.screen.width >= Math.abs(e) && (grab.style.transform = "translateX(" + translateX + "px)", translateX = e), startX = t)
}

function mouseMove(e) {
    var t;
    dragging && (t = e.clientX, (e = translateX + (t - startX)) <= 0 && grab.offsetWidth - window.screen.width >= Math.abs(e) && (grab.style.transform = "translateX(" + translateX + "px)", translateX = e), startX = t)
}


function spanMove(e){
	span.style.transform = "translate("+e.pageX+"px,"+e.pageY+"px)";

	var sliderRect = slider.getBoundingClientRect();
    var mouseY = e.clientY || e.pageY;

	const modal = document.querySelector(".modal-form");


	if (!modal.classList.contains('toggled')) {
		span.classList.remove('swipe');
		return
	}
    if (mouseY >= sliderRect.top && mouseY <= sliderRect.bottom ) {
        span.classList.add('swipe');
    } else {
        span.classList.remove('swipe');
    }
}

grab.addEventListener("mousedown", function(e) {
    touchStart(e)
}), document.addEventListener("mouseup", function() {
    touchCancel()
}), document.addEventListener("mousemove", function(e) {
    spanMove(e);mouseMove(e);
}), grab.addEventListener("touchstart", function(e) {
    touchStart(e)
}), document.addEventListener("touchend", function() {
    touchCancel()
}), document.addEventListener("touchcancel", function() {
    touchCancel()
}), document.addEventListener("touchmove", function(e) {
    touchMove(e)
});

document.querySelectorAll('section#answers .answer-box').forEach(function(el){
	el.addEventListener('click', function(){
		this.classList.toggle('active');
		let pText = this.querySelector('p');
		if (this.classList.contains('active')){
			pText.style.height = "0px";
			pText.style.height = pText.scrollHeight * 1.8 + "px";
		} else {
			pText.style.height = 0;
		}
	});
});

function animate(){
	document.querySelectorAll('h1, section#about .about-container > div, section#steps .step, section#answers .answer-box').forEach(function(elem){
		let posTop = elem.getBoundingClientRect().top;
		if(posTop + elem.clientHeight <= window.innerHeight && posTop >= 0){
			elem.classList.add('animated');
		}
	});
}

animate();
document.addEventListener('scroll',function(){animate()})


document.querySelector("svg.burger").addEventListener("click", function(){
	this.classList.toggle('active');
	document.querySelector(".side-menu").classList.toggle('active');
	// document.querySelector("header").classList.toggle('active');
	document.querySelector(".overlay").classList.toggle('active');
});

document.querySelectorAll(".side-menu > span").forEach(function(el){
	el.addEventListener("click",function(){
		document.querySelector("svg.burger").classList.toggle('active');
		document.querySelector(".side-menu").classList.toggle('active');
		// document.querySelector("header").classList.toggle('active');
		document.querySelector(".overlay").classList.toggle('active');
		
		document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
	});
});


function showForm(){
	document.querySelector('.modal-form').classList.remove('toggled');

	document.querySelector('.modal-form').addEventListener('click', function(el){
		 var clickedElement = el.target;
		  if (clickedElement.classList.contains('modal-form')) {
			document.querySelector('.modal-form').classList.add('toggled');
		  }
	});

	document.querySelector('.modal-form .close').addEventListener('click', () => {
		document.querySelector('.modal-form').classList.add('toggled');
	})
	
}

