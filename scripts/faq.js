$(document).ready(function () {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready",     Init(true), false);
    } else {
        Init(true);
    }
});
function Init() 
{       
    loadFaq(); 
}


function loadFaq(data)
{
    $('.faq').empty();    
    
    $.ajax({
        type: "POST",
        url: APILink + 'home/get_faq',                
        dataType: "JSON",
        success: function(list){
            
            if(list.length!=''){                

                $(jQuery.parseJSON(JSON.stringify(list.list))).each(function(){

                    $('#faq').append('<div class="accordionItemWrapper"> '
                        +'<a href="faq.html" class="accordionButton">'  
                        +'<span class="accordionButtonIcon"></span>'
                        +'<span class="accordionButtonTitle">'+this.question+'</span>'
                        +'</a>'
                        +'<div class="accordionContentWrapper">'
                        +'<div class="accordionContent">'
                        +'<p>'+this.answer+'</p>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                    );                                    
                });
            }

            $('.accordionButton').click(function(e){
         
        if($(this).hasClass('currentAccordion')){
            
             $(this).parent().find('.accordionContentWrapper').stop(true, true).animate({height:'hide'}, 300, 'easeOutCubic', function(){$(this).parent().find('.accordionButton').removeClass('currentAccordion');});
             
        }else{
             
            $(this).parent().find('.accordionContentWrapper').stop(true, true).animate({height:'show'}, 300, 'easeOutCubic', function(){$(this).parent().find('.accordionButton').addClass('currentAccordion');});
         
        };
         
        return false;
        
    });

        },
    }); 


}

