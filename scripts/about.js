$(document).ready(function () {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready",     Init(true), false);
    } else {
        Init(true);
    }
});
function Init() 
{    
    loadPage(); 
}


function loadPage(data)
{           
    $.ajax({
        type: "POST",
        url: APILink + 'home/get_about_page',                        
        data: {},            
        dataType: "JSON",
        success: function(data){
            
            if(data.length!=''){                                

                var result = $(jQuery.parseJSON(JSON.stringify(data.details)));                

                $('#page_details').append('<h3 class="pageTitle">'+data.details["title"]+'</h3>'
                    +data.details["details"]                  
                );                                                    
            }                    
        },
    });    
}

