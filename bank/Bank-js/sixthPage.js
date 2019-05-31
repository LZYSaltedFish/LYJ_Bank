$(function(){
    $('#my-info').addClass('hidden');
    $('#my-info-1').addClass('hidden');

    $('#yes').click(function(){
        var item = $('#'+$(this).data("item-id"));
        var account = $('#accountID').val();
        var finance_id = item.data("finance-id");
        var delete_req = $.ajax({
            type: "DELETE",
            url: "http://148.100.245.85:8080/api/account/finance/" + finance_id +"?account_id=" + account,
            headers: {
                "Authorization": $.cookie('authorization')
            },
            dataType: "json",
            statusCode: {
                200: function(data){
                    console.log(data);
                    if(data.errcode)
                    {
                        console.error(data.errmsg);
                    }
                    else
                    {
                        item.remove();
                    }
                }
            }
        })
    });

    $('#service').click(function(){
        var account = $('#accountID').val();
    
        var service_req = $.ajax({
            type: "GET",
            url: "http://148.100.245.85:8080/api/account/finance?account_id=" + account,
            headers: {
                "Authorization": $.cookie('authorization')
            },
            dataType: "json",
            statusCode: {
                200: function(data){
                    console.log(data);
                    if (data.errcode)
                    {
                        console.error(data.errmsg);
                    }
                    else
                    {
                        if(data.length === 0)
                        {
                            $('#my-info-1').removeClass('hidden');
                            $('#my-info').addClass('hidden');
                        }
                        else
                        {
                            $('#my-info').removeClass('hidden');
                            $('#my-info-1').addClass('hidden');
                            var tpl = $('#fia-service-tpl>div');
                            var root = $('#my-info');
                            for (var i = 0; i < data.length; i++)
                            {
                                var newNode = tpl.clone();
                                newNode.attr('id', 'fia-service-item-' + i);
                                newNode.find('.product-type').text(data[i].product_type);
                                newNode.find('.term').text(data[i].term);
                                newNode.find('.amount').text(data[i].amount);
                                newNode.data("finance-id", data[i]._id);
                                root.append(newNode);
                            }
                            $('.delete-btn').click(function (){
                            $('#yes').data("item-id", $(this).parent().attr("id"));
                            $('#myModal').modal();
                        })
                    }
                        
                    }
                },
                401: function(data){
                    console.error(data.errmsg);
                    $('#my-info-1>div').text('Please log in first!!');
                    $('#my-info-1').removeClass('hidden');
                }
            }
        })
    });
});




