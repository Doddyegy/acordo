var $ = jQuery.noConflict(); 
var formSubmitted = 'false';

$(document).ready(function () {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready",     Init(true), false);
    } else {
        Init(true);
    }
});
function Init() 
{    
    loadPortfolio(); 
}

function loadPortfolio(data)
{       
    var id = localStorage.getItem('portfolio');
    $.ajax({
        type: "POST",
        url: APILink + 'home/get_portfolio',                        
        data: { id: id},            
        dataType: "JSON",
        success: function(portfolio){
            
            if(portfolio.length!=''){                                

                var result = $(jQuery.parseJSON(JSON.stringify(portfolio.portfolio)));                

                $('#single_project').append('<div class="pageContentWrapper">'
                    +'<div class="singleProjectImageWrapper">'                                    
                    +'<img src="http://localhost'+portfolio.portfolio["path"]+'" class="singleProjectImage" alt=""/> '
                    +'</div>'
                    +'<div class="pageContentWrapper">'
                    +'<h3 class="pageTitle">'+portfolio.portfolio["title"]+'</h3>'
                    +''+portfolio.portfolio["desc"]+''
                    +'<div class="pageBreak"></div>'
                    +'</div>'
                    +'<div class="singleProjectItemButtonsWrapper">'
                    +'<a href="http://localhost'+portfolio.portfolio["path"]+'" class="singleProjectExpandButton">expand</a>'
                    +'</div>'
                );                                                    
            }

            lightbox();
        },
    });    
}

function before_navigate(id)
{
    localStorage.setItem('portfolio', id);

    navigateTo("singlePost.html");
}


function lightbox(){
        
    $('.portfolioOneExpandButton, .portfolioFilterableExpandButton, .singleProjectExpandButton').colorbox({

        maxWidth: windowWidth,
        initialWidth: lightboxInitialWidth,
        initialHeight: lightboxInitialHeight
        
    });

};
    
    


