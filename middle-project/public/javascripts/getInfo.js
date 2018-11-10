// var geneID = require("../../repos/customerRepo");

$(document).ready(function() {
  // action form input infor
  document.querySelector("#formInfo").addEventListener(
    "submit",
    function(event) {
      var info = {
        name: $("#username").val(),
        sdt: $("#phonenumber").val(),
        address: $("#address").val(),
        note: $("#note").val()
      };
      console.log(JSON.stringify(info));
      // var link = "http://localhost:3000/apicaller";
      $.ajax({
        type: "POST",
        dataType: "json",
        data: JSON.stringify(info),
        contentType: "application/json",
        url: "http://localhost:3000/apicaller",
        // cache: false,
        // timeout: 10000,
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
      ///return false;
      event.preventDefault();
    },
    false
  );

  onKeypress = () => {
    var info = {
      name: $("#username").val(),
      sdt: $("#phonenumber").val(),
      address: $("#address").val(),
      note: $("#note").val()
    };
    // console.log(info);
  };
  onChange = () => {
    var info = {
      name: $("#username").val(),
      sdt: $("#phonenumber").val(),
      address: $("#address").val(),
      note: $("#note").val()
    };
    //console.log(info);
  };
});
