//Places people
// var hiddenOnLoad = [
// 	'.icon'
// ]
// TweenMax.set(hiddenOnLoad, {alpha:0});
	
//icons
TweenMax.staggerFrom(".icon", 0.2, {x:-50, alpha:0, delay:0.5, ease:Power3.easeIn}, 0.1); 

//nav links
TweenMax.staggerFrom(".nav_links", 0.4, {y:50, alpha:0, delay:0.5, ease:Power3.easeIn}, 0.1);

//logo
TweenMax.fromTo(".logo_container", 0.3, {y:50, opacity:0}, {y:0, opacity:1, ease:Power4.easeIn});

//results

