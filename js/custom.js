/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////// Variables Start                                                                                    */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
var $ = jQuery.noConflict();
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////// Variables End                                                                                      */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/



/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*////////////////////// Window Load Function Starts                                                                                                                              */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
jQuery(window).load(function(){
	
	jQuery('.preloader').stop(true, true).fadeOut(300, function(){jQuery(this).remove();});
	
});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*////////////////////// Window Load Function Ends                                                                                                                                */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/



/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////// Document Ready Function Starts                                                                     */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
jQuery(document).ready(function($){
			
	
	
	'use strict';
	
	
	
	// initial settings start
	var sidebarStatus = 'closed';
	var sidebarAnimation = 'complete';
	
	var windowWidth = $(window).width() - 48;
		
	var lightboxInitialWidth = windowWidth;
	var lightboxInitialHeight = 220;
	// initial settings end


     
	// main menu functions start
	$('.mainMenuButton').click(function(){
		
		if(sidebarStatus == 'closed' && sidebarAnimation == 'complete'){
			
			sidebarAnimation = 'incomplete';
			
			$('.sidebarWrapper').stop(true, true).animate({right: '0px'}, 300, 'easeOutQuart', function(){});
			
			$('.websiteWrapper').stop(true, true).delay(30).animate({left: '-240px'}, 300, 'easeOutQuart', function(){sidebarAnimation = 'complete'; sidebarStatus = 'open';});
			
			
		}else if(sidebarStatus == 'open' && sidebarAnimation == 'complete'){
			
			sidebarAnimation = 'incomplete';
			
			$('.sidebarWrapper').stop(true, true).delay(30).animate({right: '-240px'}, 300, 'easeOutQuart', function(){sidebarAnimation = 'complete'; sidebarStatus = 'closed';});
			
			$('.websiteWrapper').stop(true, true).animate({left: '0px'}, 300, 'easeOutQuart', function(){});
			
		};
		
		return false;
		
	});	
	// main menu functions end	
	
	
	
	// adapt portfolio function starts
	
	// adapt portfolio function ends
	
	
	
	// filterable portfolio functions start
	$('#portfolioMenuWrapper > li > a').click(function(){
		
		var filterVal = $(this).attr('data-type');
		
		if(filterVal != 'all'){
			
			$('.currentPortfolioFilter').removeClass('currentPortfolioFilter');
			
			$(this).addClass('currentPortfolioFilter');
			
			$('.portfolioFilterableItemWrapper').each(function(){
	            
				var itemCategories = $(this).attr("data-type").split(",");
				  
				if($.inArray(filterVal, itemCategories) > -1){
					
					$(this).addClass('filteredPortfolioItem');
					
					$('.filteredPortfolioItem').stop(true, true).animate({opacity:1}, 300, 'easeOutCubic');
					
				}else{
						
					$(this).removeClass('filteredPortfolioItem');
					
					if(!$(this).hasClass('filteredPortfolioItem')){
						
						$(this).stop(true, true).animate({opacity:0.3}, 300, 'easeOutCubic');
					
					};
					
				};
					
			});
		
		}else{
			
			$('.currentPortfolioFilter').removeClass('currentPortfolioFilter');
			
			$(this).addClass('currentPortfolioFilter');
			
			$('.filteredPortfolioItem').removeClass('filteredPortfolioItem');
			
			$('.portfolioFilterableItemWrapper').stop(true, true).animate({opacity:1}, 300, 'easeOutCubic');
			
		}
			
		return false;
	
	});
	// filterable portfolio functions end
	
	
	
	// alert box widget function starts
	$('.alertBoxButton').click(function(){
		
		$(this).parent().fadeOut(300, function(){$(this).remove();});
		
		return false;
		
	});
	// alert box widget function ends
	
	
	
	// accordion widget function starts
	
	// accordion widget function ends

	
	
	// back to top function starts
	$('.backToTopButton').click(function(){
								   
	    $('body, html').stop(true, true).animate({scrollTop:0}, 1200,'easeOutCubic'); 
		
		return false;
	
    });
	// back to top function ends 
	
	
	
	// window resize functions start
	$(window).resize(function(){
		
		windowWidth = $(window).width() - 48;
		
		lightboxInitialWidth = windowWidth;
		
		lightbox();
					
	//	adaptPortfolio();
				
	});
	// window resize functions end	
	
	
	
	// lightbox functions start
	function lightbox(){
		
		$('.portfolioOneExpandButton, .portfolioFilterableExpandButton, .singleProjectExpandButton').colorbox({
		
			maxWidth: windowWidth,
			initialWidth: lightboxInitialWidth,
			initialHeight: lightboxInitialHeight
			
		});
		
	};
	
	lightbox();
	// lightbox functions end



});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////// Document Ready Function Ends                                                                       */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/