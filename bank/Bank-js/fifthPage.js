$(function(){
    $('#my-info').addClass('hidden');

    $('#my-info1').addClass('hidden');

    $('#my-info2').addClass('hidden');
});

$('#yes').click(function(){
    var source = $('#source-account').val();
    var target = $('#target-account').val();
    var money = $('#money').val();

    transfer_req = $.ajax({
        type: "PUT",
        url: "http://148.100.245.85:8080/api/account/transfer",
        data: JSON.stringify({
            account_id: source,
            recipient_id: target,
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
                if(data.errcode === 2)
                {
                    console.error(data.errmsg);
                    $('#my-info1').removeClass('hidden');
                    $('#failText').text('Your balance of your current account is not enough.');
                    $('#my-info').addClass('hidden');
                    $('#my-info2').addClass('hidden');
                }
                else if(data.errcode === 3)
                {
                    console.error(data.errmsg);
                    $('#my-info2').removeClass('hidden');
                    $('#my-info').addClass('hidden');
                    $('#my-info1').addClass('hidden');
                }
                else
                {
                    $('#show-balance').text("your current balance is: " + data.balance);
                    $('#my-info').removeClass('hidden');
                    $('#my-info1').addClass('hidden');
                    $('#my-info2').addClass('hidden');
                }
            },
            400: function(data){
                $('#my-info1').removeClass('hidden');
                $('#failText').text('Wrong input!!!');
                $('#my-info').addClass('hidden');
                $('#my-info2').addClass('hidden');
            },
            401: function(data)
            {
                console.error(data.errmsg);
                $('#word1').addClass('hidden');
                $('#failText').text('Please log in first!!');
                $('#my-info1').removeClass('hidden');
                $('#my-info').addClass('hidden');
                $('#my-info2').addClass('hidden');
            }
        }
    })

})