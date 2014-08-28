$(document).ready(function() {	
	   
	$(function() {$('#tabs_news').tabs({ fxFade: true, fxSpeed: 'fast' });});
						   
	$("ul.sf-menu").superfish({
		autoArrows:  false,
		delay:       400,                             // one second delay on mouseout 
		animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
		speed:       'fast',                          // faster animation speed 
		autoArrows:  false,                           // disable generation of arrow mark-up 
		dropShadows: false                            // disable drop shadows 			
	}); 
	
	$('ul.list li').each(function() {
	  var a = $(this).children('a');
	  var aClass = a.attr('rel');
	  if (a.hasClass('active')) {     
	   $('.'+aClass).css({'display':'block'});
	  } else {
	   $('.'+aClass).css({'display':'none'});
	  }
	 });
	 $('ul.list li a').click(function () {             
	  var thisaClass = $(this).attr('rel');
	  $(this).parent('li').parent('ul').children('li').each(function() {
	   var a = $(this).children('a');
	   var aClass = a.attr('rel');
	   if (thisaClass == aClass) {
		$('.'+aClass).show();
		a.attr('class','active');
	   } else {
		$('.'+aClass).hide();
		a.attr('class','');
	   }
	  });
	  return false;
	});
	 
	// wrap 'span' to nav page link
	$('.topnav ul').children('li').each(function() {
		$(this).children('a').html('<span>'+$(this).children('a').text()+'</span>'); // add tags span to a href
	});

		
			// radius Box
	$('.wp-pagenavi a, .wp-pagenavi .current').css({"border-radius": "3px", "-moz-border-radius":"3px", "-webkit-border-radius":"3px"});
	$('.post-commets a ').css({"border-radius": "3px", "-moz-border-radius":"3px", "-webkit-border-radius":"3px"});	
	
});
