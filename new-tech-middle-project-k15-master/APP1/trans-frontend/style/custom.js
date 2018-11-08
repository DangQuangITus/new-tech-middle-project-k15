$(document).ready(function () {
    $("#btnSubmit").click(function(e) {
        alert("ok");
        var name = $("#name").val();
        var phone = $("#phone").val();
        var address = $("#address").val();
        var notes = $('textarea#notes').val();
        var link = "http://localhost:3000/api/app1?name=" + name + "&phone=" + phone + "&address=" + address + "&notes=" + notes;
        //alert(link);
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: link ,
            dataType: 'json',
            contentType: "application/json",
            timeout: 10000,
            success: function() {
                // if(data == null){
                //     alert("Mời bạn nhập lại")
                // }
                // console.log(" - data: ");
                // console.log(data);
                // alert('ok');
                                        
            },
            error: function() {
                alert('error');
            }
        });
        
    });
});