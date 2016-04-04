$(document).ready(function () {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready",     Init(true), false);
    } else {
        Init(true);
    }
});
function Init() 
{    
    loadPortfolios(); 
}


function loadPortfolios(data)
{
    //$('#portfolioFilterableItemsWrapper').empty();    
    
    $.ajax({
        type: "POST",
        url: APILink + 'home/get_portfolios',                
        dataType: "JSON",

        success: function(list){
            
            if(list.length!=''){                

                $(jQuery.parseJSON(JSON.stringify(list.list))).each(function(){                    
                    
                    $('#portfolios').append('<div class="portfolioFilterableItemWrapper" data-type="'+this.tags+'"> '
                        +'<a href="javascript:void(0);" onclick="before_navigate('+this.id+');" class="portfolioFilterableItemImageWrapper">'  
                        +'<img src="http://marketingleader.om'+this.path+'" alt=""/>'
                        +'</a>'
                        +'<div class="portfolioFilterableItemInfoWrapper">'
                        +'<h4 class="portfolioFilterableItemTitle">'+this.title+'</h4>'
                        +'</div>'
                        +'</div>'                        
                        );                                                                    
                });
                
                adaptPortfolio();
            }            
        },
    });    
}


var sIndex = 4, offSet = 4, isPreviousEventComplete = true, isDataAvailable = true;
  
$(window).scroll(function () {
 if ($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
  if (isPreviousEventComplete && isDataAvailable) {
   
    isPreviousEventComplete = false;
    $(".LoaderImage").css("display", "block");

    $.ajax({
      type: "POST",
      url: APILink + 'home/get_more_portfolios',
      data: { index: sIndex, offset: offSet},      
      dataType: "JSON",
      success: function (list) {
        //$(".blogPostsWrapper").append(result);

        if(list.length!=''){  
            $(jQuery.parseJSON(JSON.stringify(list.list))).each(function(){

                $('#portfolios').append('<div class="portfolioFilterableItemWrapper" data-type="'+this.tags+'"> '
                        +'<a href="javascript:void(0);" onclick="before_navigate('+this.id+');" class="portfolioFilterableItemImageWrapper">'  
                        +'<img src="http://marketingleader.om'+this.path+'" alt=""/>'
                        +'</a>'
                        +'<div class="portfolioFilterableItemInfoWrapper">'
                        +'<h4 class="portfolioFilterableItemTitle">'+this.title+'</h4>'
                        +'</div>'
                        +'</div>'                               
                );                                    
            });
            
            adaptPortfolio();            

            sIndex = sIndex + offSet;
            isPreviousEventComplete = true;
        }
        if (list.length == '') //When data is not available
            isDataAvailable = false;

        $(".LoaderImage").css("display", "none");
      },
      error: function (error) {
          alert(error);
      }
    });

  }
 }
});


function before_navigate(id)
{
    localStorage.setItem('portfolio', id);

    navigateTo("singleProject.html");
}



function adaptPortfolio(){

    $('.portfolioTwoWrapper').css('width', $('.portfolioTwoPageWrapper').width() - 12);
    $('.portfolioTwoFilterableWrapper .portfolioFilterableItemsWrapper').css('width', $('.portfolioTwoFilterablePageWrapper').width() - 12);
    $('.recentProjects').css('width', $('.recentProjectsOuterWrapper').width() + 36);

    var portfolioTwoItemWidth = ($('.portfolioTwoPageWrapper').width() - 48 - 36)/2;
    var portfolioTwoFilterableItemWidth = ($('.portfolioTwoFilterablePageWrapper').width() - 48 - 36)/2;
    var recentProjectItemWidth = ($('.recentProjectsOuterWrapper').width() - 36)/2;

    $('.portfolioTwoItemWrapper').css('width', portfolioTwoItemWidth);
    $('.portfolioTwoFilterableWrapper .portfolioFilterableItemWrapper').css('width', portfolioTwoFilterableItemWidth);
    $('.recentProject').css('width', recentProjectItemWidth);

};
    
