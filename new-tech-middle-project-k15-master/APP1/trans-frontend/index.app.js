$(document).ready(function() {
  $("#btnSubmit").click(function(e) {
    //alert("hello" +  $("#name").val());

    var name = $("#name").val();
    var phone = $("#phone").val();
    var address = $("#address").val();
    var notes = $("textarea#notes").val();
    var ret = {
      name: name,
      phone: phone,
      address: address,
      notes: notes
    };
    //console.log(ret);
    //     // var link = "http://localhost:3000/api/app1?name=" + name + "&phone=" + phone + "&address=" + address + "&notes=" + notes;
    //    // alert(link);
    var link = "http://localhost:3000/api/app1";
    e.preventDefault();
    $.ajax({
      type: "post",
      url: link,
      cache: false,
      dataType: "json",
      contentType: "application/json",
      timeout: 10000,
      data: JSON.stringify(ret),
      success: function(data) {
        // if(data == null){
        //     alert("Mời bạn nhập lại")
        // }
        // console.log(" - data: ");
        console.log(data);
        // alert('ok');
      },
      error: function(data) {
        alert("error");
      }
    });
  });
});
