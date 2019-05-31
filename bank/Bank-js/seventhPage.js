$(function(){
    $('.debt').addClass('hidden');

    $('#my-info1').addClass('hidden');

    $('#thirdInput').addClass('hidden');

    $('#my-info').addClass('hidden');

    $('#my-debt').click(function(){
        $('.debt').removeClass('hidden');
        $('#thirdInput').addClass('hidden');
        $('#financial').text('National debt');
        $('#financial').data('product-type', 'National debt');
        
    });

    $('#my-deposit').click(function(){
        $('#thirdInput').removeClass('hidden');
        $('.debt').addClass('hidden');
        $('#financial').text('Time deposit');
        $('#financial').data('product-type', 'Time deposit');
        
    });

});

$('#yes').click(function(){
    var accountID = $('#account').val();
    var money = $('#money').val();
    var type = $('#financial').data('product-type');
    var select_term;
    if(type === 'National debt')
    {
        select_term = $('input:checked').val();
    }
    else if(type === 'Time deposit')
    {
        select_term = $('#input-term').val();
    }

    buyService_req = $.ajax({
        type: "PUT",
        url: "http://148.100.245.85:8080/api/account/finance",
        data: JSON.stringify({
            account_id: accountID,
            amount: money,
            product_type: type,
            term: select_term
        }),
        headers: {
            "Authorization": $.cookie('authorization')
        },
        dataType: "json",
        contentType: "application/json",
        statusCode: {
            200: function(data){
                console.log(data);
                if(data.errcode)
                {
                    console.error(data.errmsg);
                    $('#my-info1').removeClass('hidden');
                    $('#my-info').addClass('hidden');
                }
                else
                {
                    $('#my-info1').addClass('hidden');
                    $('#my-info').removeClass('hidden');
                    var tpl = $('#fia-service-tpl>div');
                    var root = $('#my-info');
                    var newNode = tpl.clone();
                    newNode.find('.product-type').text(data.product_type);
                    newNode.find('.term').text(data.term);
                    newNode.find('.amount').text(data.amount);
                    newNode.find('.estimated-money').text(data.estimated_money);
                    root.append(newNode);
                }
            },
            401: function(data){
                console.error(data.errmsg);
                $('#my-info1>div').text('Please log in first!!');
                $('#my-info1').removeClass('hidden');
                $('#my-info').addClass('hidden');
            },
            400: function(data){
                console.error(data.errmsg);
                $('#my-info1>div').text('Please enter as required!!!');
                $('#my-info1').removeClass('hidden');
                $('#my-info').addClass('hidden');
            }
        }
    })
})