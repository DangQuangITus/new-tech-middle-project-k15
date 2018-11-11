$("#driver_register").click(function () {
  var phone = $("#driver_phone").val();
  
  if (isNaN(phone)) {
    alert("Phone number must be number");
    return false;
  }
  
  var password1 = $("#driver_password1").val();
  var password2 = $("#driver_password2").val();
  
  if (password1 !== password2){
    alert("Retry confirm password");
    return false;
  }
});