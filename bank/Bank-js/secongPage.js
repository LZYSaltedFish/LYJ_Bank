$(function(){
    $('#my-info').addClass('hidden');

    $('#my-info1').addClass('hidden');

})

$('#create').click(function(){
    var accountId = $('#firstInput>input').val();
    var iniMoney = $('#secondInput>input').val();

    var create_req = $.ajax({
        type: "POST",
        url: "http://148.100.245.85:8080/api/account",
        data: JSON.stringify({
            account_id: accountId,
            balance: iniMoney
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
                    $('#my-info1').removeClass('hidden');
                    $('#my-info').addClass('hidden');
                }
                else
                {
                    $('#show-balance').text("Your current balance is: " + data.balance);
                    $('#my-info').removeClass('hidden');
                    $('#my-info1').addClass('hidden');
                }   
            },
            401: function(data){
                console.error(data.errmsg);
                $('#my-info1>div').text('Please log in first!');
                $('#my-info1').removeClass('hidden');
                $('#my-info').addClass('hidden');
            },
        }
    })
});
