$(document).ready(function () {
  document.querySelector("#driverRegisterForm").addEventListener("submit",
    function (event) {
      var data = {
        username: $("#username").val(),
        password: $("#password1").val(),
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        phone: $("#phone").val(),
      };
      console.log(JSON.stringify(data));
      $.ajax({
        type: "POST",
        dataType: "json",
        data: data,
        contentType: "application/json",
        url: "http://localhost:3000/driver",
        // cache: false,
        timeout: 10000,
        success: function (data) {
          console.log(data);
        },
        error: function (data) {
          alert("error");
        }
      });
      ///return false;
      event.preventDefault();
    },
    false
  );
};