$(function(){
    $('#my-info').addClass('hidden');

    $('#my-info1').addClass('hidden');

});

$('#first-btn').click(function(){
    var accountId = $('#input-account').val();
    var money = $('#input-money').val();

    var save_req = $.ajax({
        type: "PUT",
        url: "http://148.100.245.85:8080/api/account/deposit",
        data: JSON.stringify({
            account_id: accountId,
            amount: money
        }),
        headers: {
            "Authorization": $.cookie('authorization')
        },
        dataType: "json",
        contentType: "application/json",
        statusCode: {
            200: function(data){
                console.log(data);
                if (data.errcode)
                {
                    console.error(data.errmsg);
                }
                else
                {
                    $('#show-balance').text("your current balance is: " + data.balance);
                    $('#my-info').removeClass('hidden');
                    $('#my-info1').addClass('hidden');
                }
            },
            401: function(data){
                console.error(data.errmsg);
                $('#word1').addClass('hidden');
                $('#word2').text('Please log in first!!');
                $('#my-info1').removeClass('hidden');
                $('#my-info').addClass('hidden');
            }
        }
    })
});

$('#second-btn').click(function(){
    var accountId = $('#input-account').val();
    var money = $('#input-money').val();

    var take_req = $.ajax({
        type: "PUT",
        url: "http://148.100.245.85:8080/api/account/withdraw",
        data: JSON.stringify({
            account_id: accountId,
            amount: money
        }),
        headers: {
            "Authorization": $.cookie('authorization')
        },
        dataType: "json",
        contentType: "application/json",
        statusCode: {
            200: function(data){
                console.log(data);
                $('.alert').addClass('hidden');
                if(data.errcode)
                {
                    console.error(data.errmsg);
                    $('#my-info1').removeClass('hidden');
                    $('#my-info').addClass('hidden');
                }
                else
                {
                    $('#show-balance').text("your current balance is: " + data.balance);
                    $('#my-info').removeClass('hidden');
                    $('#my-info1').addClass('hidden');
                }
            },
            401: function(data)
            {
                console.error(data.errmsg);
                $('#word1').addClass('hidden');
                $('#word2').text('Please log in first!!');
                $('#my-info1').removeClass('hidden');
                $('#my-info').addClass('hidden');
            }
        }
    })
});