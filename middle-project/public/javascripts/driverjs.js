$("#driver_register").click(function () {
  var phone = $("#driver_phone").val();
  
  if (isNaN(phone)) {
    alert("Phone number must be number");
    return false;
  }
  
  var password1 = $("#driver_password").val();
  var password2 = $("#driver_password2").val();
  
  if (password1 !== password2) {
    alert("Retry confirm password");
    return false;
  }
});

var map;
var MAX_DIS = 100; // m

function showMap(lat, lng) {
  /**
   * Boilerplate map initialization code starts below:
   */
  
  console.log('updated');
  //Step 1: initialize communication with the platform
  var platform = new H.service.Platform({
    app_id: "XWlu7av4mIl9LiVOkizU",
    app_code: "SWPg1es3nHq226fb1B6DMQ",
    useCIT: true,
    useHTTPS: true
  });
  var defaultLayers = platform.createDefaultLayers();
  
  //Step 2: initialize a map - this map is centered over California
  var map = new H.Map(
    document.getElementById("driver-map-api"),
    defaultLayers.normal.map,
    {
      center: {lat: lat, lng: lng},
      zoom: 20
    }
  );
  
  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
  map.addEventListener('tap', function (evt) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }
    
    //Get the latitude and the longitude;
    function successFunction(position) {
      coords1 = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
      
      coords2 = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      haversine = haversineDistance(coords1, coords2);
      if (haversine > MAX_DIS) {
        alert("Haversine distance great than " + MAX_DIS);
        return
      }
      
      console.log(coords2);
      map.setCenter(coords2);
    }
    
    function errorFunction() {
      alert("Geocoder failed");
    }
  });
  
  return map;
}

$(document).ready(function () {
  map = showMap(10.832142, 106.645863);
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }
  
  //Get the latitude and the longitude;
  function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    
    coord = {lat: lat, lng: lng};
    
    var centerMarker = new H.map.Marker(coord);
    map.addObject(centerMarker);
    map.setCenter(coord);
    updateLocation(coord)
  }
  
  function errorFunction() {
    alert("Geocoder failed");
  }
  
  status = getStatus();
  console.log('Status', status);
  
  if (status != null)
    $("#driverStatus").text(status);
});

$("#updateDriverLocation").click(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }
  
  //Get the latitude and the longitude;
  function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    
    coord = {lat: lat, lng: lng};
    
    var centerMarker = new H.map.Marker(coord);
    map.addObject(centerMarker);
    map.setCenter(coord);
    updateLocation(coord)
  }
  
  function errorFunction() {
    alert("Geocoder failed");
  }
});

function haversineDistance(coords1, coords2) {
  function toRad(x) {
    return x * Math.PI / 180;
  }
  
  var R = 6371; // km
  
  //has a problem with the .toRad() method below.
  var dLat = toRad(coords2.lat - coords1.lat);
  var dLon = toRad(coords2.lng - coords1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var dis = R * c;
  
  return dis * 1000; // km => m
};

function getLocation() {
  $.ajax({
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    url: "http://localhost:3000/driver/location",
    timeout: 10000,
    success: function (data) {
      return data.coord
    },
    error: function (data) {
      alert("Ajax failed");
    }
  });
  return null
};

function updateLocation(location) {
  $.ajax({
    type: "PUT",
    dataType: "json",
    data: JSON.stringify({'location': location}),
    contentType: "application/json",
    url: "http://localhost:3000/driver/location",
    timeout: 10000,
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      alert("Ajax failed");
    }
  });
};

function getStatus(){
  $.ajax({
    type: "GET",
    dataType: "json",
    contentType: "application/json",
    url: "http://localhost:3000/driver/status",
    timeout: 10000,
    success: function (data) {
      return data.status
    },
    error: function (data) {
      alert("Ajax failed");
    }
  });
  
  return null
}

$("#updateDriverStatusBtn").click(function () {
  $.ajax({
    type: "PUT",
    dataType: "json",
    contentType: "application/json",
    url: "http://localhost:3000/driver/status",
    timeout: 10000,
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      alert("Ajax failed");
    }
  });
});


