//var APILink = 'http://localhost:51923/';
var APILink = 'http://localhost/acordo/';
var hidden = false;

var windowWidth = $(window).width() - 48;
        
var lightboxInitialWidth = windowWidth;
var lightboxInitialHeight = 220;

function navigateTo(_link) {
    location.href = _link;
}

function CallAPI(_url, _type, _data) {
    $.ajax({
        url: _url,
        type: _type,
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
           /* var Cashed = localStorage.getItem(_url);
            if (cashed == false || Cashed === null) {
                $.loader({
                    className: "blue-with-image",
                    content: ''
                });
            }
            else {
                onsuccess(JSON.parse(Cashed));
            }*/
        },
        success: function (data) {
          //  localStorage.setItem(_url, JSON.stringify(data));
         //   onsuccess(data);
        //    $.loader('close');
        },
        complete: function () {
          //  $.loader('close');
        },
        error: function (request, status, err) {
            console.debug(request);
            console.debug(status);
            console.debug(err);
            console.log('warning', 'Connection error , please try again later ');
        }
    });
}

function signout()
{
    localStorage.clear();
    location.href = "index.html";
}


$(".about").click(function () {
    navigateTo("typography.html");
});
$(".contact").click(function () {
    navigateTo("contact.html");
});
$(".blog").click(function () {
    navigateTo("blog.html");
});

$(".portfolio").click(function () {
    navigateTo("portfolioTwoColumnsFilterable.html");
});
$(".home").click(function () {
    navigateTo("index.html");
});
$(".faq").click(function () {
    navigateTo("faq.html");
});


jQuery(document).on("mobileinit", function () {
    jQuery.mobile.autoInitializePage = false;
});


//Get URL Parameters
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


//get from local storage
var currentUser = JSON.parse(localStorage.getItem('userObject'));



/*
function sort(_commonClass, _attribute, _container) {
    var divList = $("." + _commonClass);
    var sortedSet = divList.toArray().sort(function (a, b) {
        return $(b).data(_attribute) - $(a).data(_attribute);
    });
    $("#" + _container).html(sortedSet);
    $(".sortable").click(function () {
        $('.dvHome').fadeOut(200, function () {
            $('.dvProfile').removeClass("hidden");
            $('.dvProfile').show();
        });
    })
}

function InitSideBar() {
    var _Url = APILink + 'api/Menu/GetAll';
    var _Type = "get";
    var _Data = {};
    CallAPI(_Url, _Type, _Data, function (data) {
        if (data.Code == 100) {
            $('.sidebar-nav').empty();
            $('.sidebar-nav').append('<li class="sidebar-brand"></li>');
            $.each(data.Data, function (index, Obj) {
                $('.sidebar-nav').append('\
                                    <li>\
                                    <a href="#" onclick="window.open(\''+Obj.lINK+'\', \'_blank\',\'location=yes\');" target="_blank"> <span style="color:' + Obj.Color + '" class="glyphicon glyphicon-' + Obj.Icon + '"></span> ' + Obj.Title + '</a>\
                                     </li>');
            });
            $('.sidebar-nav').append('\
                                    <li>\
                                    <a href="javascript:signout();"> <span style="color:#ff24499" class="glyphicon glyphicon-user"></span> Sign Out</a>\
                                     </li>');
        }
    }, false);
}
function sortAscendeing(_commonClass, _attribute, _container) {
    var divList = $("." + _commonClass);
    var sortedSet = divList.toArray().sort(function (a, b) {
        return $(a).data(_attribute) - $(b).data(_attribute);
    });
    $("#" + _container).html(sortedSet);
    $(".sortable").click(function () {
        $('.dvHome').fadeOut(200, function () {
            $('.dvProfile').removeClass("hidden");
            $('.dvProfile').show();
        });
    })
}
$("#menuDv").click(function (e) {
    e.preventDefault();
    hidden = !hidden;
    if (hidden == true) {
        $("#page-content-wrapper").toggle();
        $("#wrapper").toggleClass("toggled");
        $('#sidebar-wrapper').css('border-left', 'solid 5px  #a73135')

    }
    else {
        $("#wrapper").toggleClass("toggled");
        setTimeout(function () { $("#page-content-wrapper").toggle(); }, 200);
        $('#sidebar-wrapper').css('border-left', 'none 5px  #a73135')
    }
});*/