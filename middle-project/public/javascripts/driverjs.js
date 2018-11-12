$("#driver_register").click(function () {
  var phone = $("#driver_phone").val();
  
  if (isNaN(phone)) {
    alert("Phone number must be number");
    return false;
  }
  
  var password1 = $("#driver_password1").val();
  var password2 = $("#driver_password2").val();
  
  if (password1 !== password2) {
    alert("Retry confirm password");
    return false;
  }
});


$("#driver_login").click(function () {
  var body = {
    username: $("#driver_username").val(),
    password: $("#driver_password").val(),
  };
  $.ajax({
    type: "POST",
    dataType: "json",
    data: body,
    contentType: "application/json",
    url: "http://localhost:3000/driver/login",
    timeout: 10000,
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      alert("error");
    }
  });
});