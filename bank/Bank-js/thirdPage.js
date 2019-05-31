$(function(){
    $('#my-info').addClass('hidden');

    $('#my-info1').addClass('hidden');

});

$('#inquiry').click(function(){
    var accountId = $('#firstInput>input').val();

    var inquiry_req = $.ajax({
        type: "GET",
        url: "http://148.100.245.85:8080/api/account?account_id="+accountId,
        headers: {
            "Authorization": $.cookie('authorization')
        },
        dataType: "json",
        statusCode: {
            200: function(data){
                console.log(data);
                if (data.errcode)
                {
                    console.error('inquiry failed');
                    $('my-info1').removeClass('hidden');
                }
                else
                {
                    $('#show-balance').text("Dear customer, your current balance is: " + data.balance);
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
            },
            403: function(data){
                console.error(data.errmsg);
                $('#word1').addClass('hidden');
                $('#word2').text('You do not have the right to operate this account!!');
                $('#my-info1').removeClass('hidden');
                $('#my-info').addClass('hidden');
            }
        }
    })
});