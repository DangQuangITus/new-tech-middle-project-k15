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

// $("#driver_login").click(function () {
//   var data = {
//     driver_username: $("#driver_username").val(),
//     driver_password: $("#driver_password").val(),
//   };
//   console.log(JSON.stringify(data));
//   console.log(data.username);
//
//   $.ajax({
//         type: "POST",
//         dataType: "json",
//         data: data,
//         contentType: "application/json",
//         url: "http://localhost:3000/driver/login",
//         cache: false,
//         timeout: 10000,
//         success: function(data) {
//           console.log(data);
//         },
//         error: function(data) {
//           alert(data);
//         }
//       });
//       ///return false;
//       event.preventDefault();
// });
