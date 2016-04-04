$(window).load(function () {
    // Page is fully loaded .. time to fade out your div with a timer ..
    //$('#new-stack').fadeOut(3000);

    $(this).find("#new-stack").fadeOut("slow", function () {                
        $('.loading-mask').attr("style", "display: none !important");
    });

});

$("#start-app").click(function () {
    navigateTo('login.html');    
});


