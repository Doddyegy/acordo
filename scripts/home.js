$(document).ready(function () {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
        document.addEventListener("deviceready",     Init(true), false);
    } else {
        Init(true);
    }
});
function Init() 
{    
    loadAllSliders(); 
}


function loadAllSliders(data)
{
    $('#mainSlider').empty();    
    
    $.ajax({
        type: "POST",
        url: APILink + 'home/getSliders',                
        dataType: "JSON",

        success: function(list){
            
            if(list.length!=''){                

                $(jQuery.parseJSON(JSON.stringify(list.list))).each(function(){

                    $('#mainSlider').append('<a href="index.html">'
                        +'<img src="http://marketingleader.om'+this.path+'" alt="" />'  
                        +'</a>'
                    );                                    
                });
            }

            // nivo slider functions start
            $('#mainSlider').nivoSlider({
                
                effect: 'random',
                directionNav: true,
                controlNav: false,
                prevText: '',
                nextText: '' 
                
            });
            // nivo slider functions end
        },
    });    
}

/*
function loadAllSliders() 
{    

    var _Url = APILink + 'home/getSliders';
    var _Type = "get";
    //var _Data = { '_Index': 1000000, '_limit': 100, '_OrderBy': "Name", "_lat": _lat, "_lng": _lng }; // AvgRate , Name ,Geolocation
    var _Data = '';
    CallAPI(_Url, _Type, _Data, function (data) {
        
        //if (data.Code == 100) {
            $('#mainSlider').empty();
            console.log(data);
            $(jQuery.parseJSON(JSON.stringify(data))).each(function(){
                            
                $('#mainSlider').append('<a href="index.html">'
                                        +'<img src="images/content/slide-1.jpg" alt="" />'  
                                        +'</a>'
                                    );
                                });                          
       // }
       // else {
        //    console.log(data);
       // }
    }, false);
}
*/
