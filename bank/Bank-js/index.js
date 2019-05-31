$(function(){
    $('#customer').addClass('my-hidden');

    $('#my-info1').addClass('my-hidden');

    $('#logout-link').click(function(){
        $('#log-in').removeClass('my-hidden');
        $('#register').removeClass('my-hidden');
        $('#customer').addClass('my-hidden');
        $.removeCookie('authorization');
    })
});


$('#yes').click(function(){
    var customer_id = $('#input-id>input').val();
    var login_password = $('#input-password>input').val();

    var login_req = $.ajax({
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
                    $('#log-in').removeClass('my-hidden');    //登陆按钮出现
                    $('#my-info1').removeClass('my-hidden');  //错误信息出现
                    $('#customer').addClass('my-hidden');     //用户信息按钮隐藏
                }
                else
                {
                    $('#username').text('Welcome ' + data.username)
                    $('#my-info1').addClass('my-hidden');            //错误信息隐藏
                    $('#customer').removeClass('my-hidden');         //用户信息出现
                    $('#log-in').addClass('my-hidden');              //登录按钮隐藏
                    var jqxhr = jqXHR.getResponseHeader("Authorization");
                    $.cookie('authorization', jqxhr);
                    $.cookie('username', customer_id);
                }
                
            }
        }
    })
});

$('#register-confirm').click(function(){
    var customerID = $('#register-input-id>input').val();
    var register_password = $('#register-input-password>input').val();
    var confirm_password = $('#input-password1>input').val();

    if(register_password !== confirm_password)
    {
        $('#input-password1>input').val('');
        $('#register-input-password>input').val('');
        var node = $('#input-password1');
        node.after('<div class="alert alert-danger" role="alert" id="my-info1">Two passwords are not the same.<div>');
    }
    else
    {
        var register_req = $.ajax({
            type: "POST",
            url: "http://148.100.245.85:8080/api/register",
            data: JSON.stringify({
                username: customerID,
                password: register_password
            }),
            dataType: "json",
            contentType: "application/json",
            statusCode: {
                200: function(data, statusText, jqXHR){
                    console.log(data);
                    if (data.errcode)
                    {
                        console.error('login failed');
                        $('#customer').addClass('my-hidden');     //用户信息按钮隐藏
                        var node1 = $('#input-password1');
                        node1.after('<div class="alert alert-danger" role="alert" id="my-info1">This customer has already existed!<div>');
                    }
                    else
                    {
                        $('#username').text('Welcome ' + data.username)
                        $('#my-info1').addClass('my-hidden');            //错误信息隐藏
                        $('#customer').removeClass('my-hidden');         //用户信息出现
                        $('#log-in').addClass('my-hidden');              //登录按钮隐藏
                        $('#register').addClass('my-hidden');            //注册按钮隐藏
                        var jqxhr = jqXHR.getResponseHeader("Authorization");
                        $.cookie('authorization', jqxhr);
                        $.cookie('username', customerID);
                        $('#myModal1').modal('hide');
                    }
                    
                }
            }
        })
    }
});

$(function(){
    if($.cookie('authorization')!==undefined && $.cookie('username')!==undefined){
        $('#customer').removeClass('my-hidden');
        $('#log-in').addClass('my-hidden');
        $('#username').text('Welcome ' + $.cookie('username'));
    }
})