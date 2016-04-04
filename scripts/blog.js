$(document).ready(function () {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready",     Init(true), false);
    } else {
        Init(true);
    }
});
function Init() 
{    
    loadBlogs(); 
}


function loadBlogs(data)
{
    $('.blogPostsWrapper').empty();    
    
    $.ajax({
        type: "POST",
        url: APILink + 'home/get_blogs',                
        dataType: "JSON",

        success: function(list){
            
            if(list.length!=''){                

                $(jQuery.parseJSON(JSON.stringify(list.list))).each(function(){

                    $('.blogPostsWrapper').append('<div class="smallPostWrapper">'
                        +'<a href="" class="postThumbnailWrapper">'  
                        +'<img src="http://localhost'+this.path+'" alt=""/>'
                        +'</a>'
                        +'<div class="postExcerptWrapper">'
                        +'<h4 class="smallPostTitle">"'+this.title+'"</h4>'
                        +'<p>"'+this.description+'"</p>'
                        +'</div>'
                        +'<div class="smallPostInfoWrapper">'
                        +'<span class="singleIconWrapper singleIconText iconCalendarDark postInfo postDate postInfoNoMargin">"'+this.date+'"</span>'
                        +'<a href="javascript:void(0);" data="'+this.id+'" onclick="before_navigate('+this.id+');" class="smallPostMoreButton">read more</a>'
                        +'</div>'
                        +'</div>'
                    );                                    
                });
            }            
        },
    });    
}


var sIndex = 2, offSet = 2, isPreviousEventComplete = true, isDataAvailable = true;
  
$(window).scroll(function () {
 if ($(document).height() - 50 <= $(window).scrollTop() + $(window).height()) {
  if (isPreviousEventComplete && isDataAvailable) {
   
    isPreviousEventComplete = false;
    $(".LoaderImage").css("display", "block");

    $.ajax({
      type: "POST",
      url: APILink + 'home/get_more_blogs',
      data: { index: sIndex, offset: offSet},      
      dataType: "JSON",
      success: function (list) {
        //$(".blogPostsWrapper").append(result);

        if(list.length!=''){  
            $(jQuery.parseJSON(JSON.stringify(list.list))).each(function(){

                $('.blogPostsWrapper').append('<div class="smallPostWrapper">'
                    +'<a href="" class="postThumbnailWrapper">'  
                    +'<img src="http://localhost'+this.path+'" alt=""/>'
                    +'</a>'
                    +'<div class="postExcerptWrapper">'
                    +'<h4 class="smallPostTitle">"'+this.title+'"</h4>'
                    +'<p>"'+this.description+'"</p>'
                    +'</div>'
                    +'<div class="smallPostInfoWrapper">'
                    +'<span class="singleIconWrapper singleIconText iconCalendarDark postInfo postDate postInfoNoMargin">"'+this.date+'"</span>'
                    +'<a href="javascript:void(0);" onclick="before_navigate('+this.id+');" data="'+this.id+'" class="smallPostMoreButton">read more</a>'
                    +'</div>'
                    +'</div>'
                );                                    
            });

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
    localStorage.setItem('blog', id);

    navigateTo("singlePost.html");
}