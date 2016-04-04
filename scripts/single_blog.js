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
    loadBlog(); 
}

function loadBlog(data)
{       
    var id = localStorage.getItem('blog');
    $.ajax({
        type: "POST",
        url: APILink + 'home/get_blog',                        
        data: { id: id},            
        dataType: "JSON",
        success: function(blog){
            
            if(blog.length!=''){                                

                var result = $(jQuery.parseJSON(JSON.stringify(blog.blog)));                

                $('#single_post').append('<div class="singlePostContentWrapper"> '
                    +'<h3 class="pageTitle">'+blog.blog["title"]+'</h3>'
                    +'<div class="pageSpacer"></div>'
                    +'<img src="http://marketingleader.om'+blog.blog["path"]+'" class="largeImage" alt=""/>'  
                    +'<p>'+blog.blog["desc"]+'</p>'                    
                    +'<div class="textBreak"></div>'
                    +'</div>'
                    +'<div class="singlePostInfoWrapper">'
                    +'<span class="singleIconWrapper singleIconText iconCalendarDark postInfo postDate">'+blog.blog["date"]+'</span>'                    
                    +'</div>'
                    +'<div class="postLinksWrapper"> '

                    +( blog.blog["next"] > 0 ?                         
                        '<a href="javascript:void(0);" onclick="before_navigate('+blog.blog["next"]+');" class="postLink nextPost">Next Post &raquo;</a>'
                    :
                        ''
                    ) +

                    ( blog.blog["prev"] > 0 ?    
                        '<a href="javascript:void(0);" onclick="before_navigate('+blog.blog["prev"]+');" class="postLink previousPost">&laquo; Previous Post</a>'  
                    :
                        ''                
                    )

                    +'</div>'

                );                                                    
            }

            if(comments.length!=''){  
                $(jQuery.parseJSON(JSON.stringify(blog.comments))).each(function(){

                    $('#comments').append('<div class="commentWrapper">'
                        +'<a href="#" class="commentAvatar">'  
                        +'<img src="images/common/commentAvatarBg.png" alt=""/>'
                        +'</a>'
                        +'<p class="commentInfoWrapper">by '
                        +'<a href="singlePost.html" class="">'+this.user+'</a> on '+this.date+''                        
                        +'</p>'
                        +'<div class="clear"></div>'
                        +'<div class="comment">'
                        +'<p>'+this.body+'.</p>'
                        +'</div>'
                        +'</div>'
                    );
                                                        
                });                
            }         
        },
    });    
}

function before_navigate(id)
{
    localStorage.setItem('blog', id);

    navigateTo("singlePost.html");
}




// validate form function starts
function validateForm(currentForm, formType){
    
    // hide any error messages starts
    $('.formValidationError').hide();
    $('.fieldHasError').removeClass('fieldHasError');
    // hide any error messages ends
    
    $('#' + currentForm + ' .requiredField').each(function(i){
         
        if($(this).val() == '' || $(this).val() == $(this).attr('data-placeholder')){
            
            $(this).val($(this).attr('data-placeholder'));  
            $(this).focus();
            $(this).addClass('fieldHasError');
            $('#' + $(this).attr('id') + 'Error').fadeIn(300);
            return false;
                   
        };                
        
        if(formSubmitted == 'false' && i == $('#' + currentForm + ' .requiredField').length - 1){
            //submitData(currentForm, formType);
            var name = $('#commentNameField').val();
            var comment = $('#commentCommentTextarea').val();
            var objectID = localStorage.getItem('blog');

            $.ajax({
                type: "POST",
                url: APILink + 'home/add_comment',                        
                data: { name: name , comment: comment , objectID: objectID},            
                dataType: "JSON",
                success: function(data){                            
                    if(data.status =="success"){                                                                      
                        $("#commentsForm") [0].reset();
                        $("#success").show();  

                        var comment = $(jQuery.parseJSON(JSON.stringify(data.comment)));  
                        console.log(data.comment);
                        $('#comments').append('<div class="commentWrapper">'
                            +'<a href="#" class="commentAvatar">'
                            +'<img src="images/common/commentAvatarBg.png" alt=""/>'
                            +'</a>'
                            +'<p class="commentInfoWrapper">by '+data.comment["name"]+' '
                            +'<div class="clear"></div>'
                            +'<div class="comment">'
                            +'<p>'+data.comment["comment"]+'.</p>'
                            +'</div>'
                            +'</div>'
                        );

                     //$("#success-message").show();
                    }
                },
            }); 
        };
          
    });
    
};
// validate form function ends



// contact button function starts
$('#commentSubmitButton').click(function() {

    validateForm($(this).attr('data-form-id')); 
    return false;
    
});
// contact button function ends

var sIndex = 2, offSet = 2, isPreviousEventComplete = true, isDataAvailable = true,objectID = localStorage.getItem('blog');;

$('#more_comments').click(function() {
    
    $.ajax({
      type: "POST",
      url: APILink + 'home/get_more_comments',
      data: { index: sIndex, offset: offSet,objectID: objectID},      
      dataType: "JSON",
      success: function (list) {        

        if(list.success==1){  
            $(jQuery.parseJSON(JSON.stringify(list.list))).each(function(){

                $('#comments').append('<div class="commentWrapper">'
                    +'<a href="#" class="commentAvatar">'
                    +'<img src="images/common/commentAvatarBg.png" alt=""/>'
                    +'</a>'
                    +'<p class="commentInfoWrapper">by '
                    +'<a href="singlePost.html" class="">'+this.name+'</a> on '+this.date+''
                    +'<div class="clear"></div>'
                    +'<div class="comment">'
                    +'<p>'+this.comment+'.</p>'
                    +'</div>'
                    +'</div>'
                );

            });

            sIndex = sIndex + offSet;
            isPreviousEventComplete = true;
        }else{
            $("#more_comments").text("There is no more comments");
            isDataAvailable = false;                
            $(".LoaderImage").css("display", "none");
        }
        //if (list.length == '') //When data is not available
            
            
      },
      error: function (error) {
          alert(error);
      }
    });
    
});



