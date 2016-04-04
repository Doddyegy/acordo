$("#signup").click(function () {
    navigateTo('signup.html');    
});

$('#signin').click(function() {    

    var _Url = APILink + 'home/signIn';
    var _Type = "post";
    var _Data = JSON.stringify({
        'password': $('#password').val(),        
        'email-field': $('#email-field').val()
    });
    CallAPI(_Url, _Type, _Data, function (data) {
        
        
        
    }, false);

});