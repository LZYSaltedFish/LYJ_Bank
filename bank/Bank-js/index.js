$(function(){
    $('#customer').addClass('my-hidden');

    $('#my-info1').addClass('my-hidden');

    $('#logout-link').click(function(){
        $('#log-in').removeClass('my-hidden');
        $('#customer').addClass('my-hidden');
        $.removeCookie('authorization');
    })
});


$('#yes').click(function(){
    var customer_id = $('#input-id>input').val();
    var login_password = $('#input-password>input').val();

    var register_req = $.ajax({
        type: "POST",
        url: "http://148.100.245.85:8080/api/login",
        data: JSON.stringify({
            username: customer_id,
            password: login_password
        }),
        dataType: "json",
        contentType: "application/json",
        statusCode: {
            200: function(data, statusText, jqXHR){
                console.log(data);
                if (data.errcode)
                {
                    console.error('login failed');
                    $('#my-info1').removeClass('my-hidden');
                }
                $('#username').text('Welcome ' + data.username)
                $('#customer').removeClass('my-hidden');
                $('#log-in').addClass('my-hidden');
                var jqxhr = jqXHR.getResponseHeader("Authorization");
                $.cookie('authorization', jqxhr);
                $.cookie('username', customer_id);
            }
        }
    })
});

$(function(){
    if($.cookie('authorization')!==undefined && $.cookie('username')!==undefined){
        $('#customer').removeClass('my-hidden');
        $('#log-in').addClass('my-hidden');
        $('#username').text('Welcome ' + $.cookie('username'));
    }
})