// var geneID = require("../../repos/customerRepo");

$(document).ready(function() {
  /**
   * Moves the map to display over Berlin
   *
   * @param  {H.Map} map      A HERE Map instance within the application
   *
   * 11.718197, 106.345740
   * 10.232559, 106.713967
   */
  // function moveMapToBerlin(map) {
  //   map.setCenter({ lat: 52.5159, lng: 13.3777 });
  //   map.setZoom(14);
  // }

  function setMapViewBounds(map) {
    var bbox = new H.geo.Rect(11.718197, 106.34574, 10.232559, 106.713967);
    map.setViewBounds(bbox);
  }

  /**
   * Boilerplate map initialization code starts below:
   */
  //Step 1: initialize communication with the platform
  var platform = new H.service.Platform({
    app_id: "XWlu7av4mIl9LiVOkizU",
    app_code: "SWPg1es3nHq226fb1B6DMQ",
    useHTTPS: true
  });
  var pixelRatio = window.devicePixelRatio || 1;
  var defaultLayers = platform.createDefaultLayers({
    tileSize: pixelRatio === 1 ? 256 : 512,
    ppi: pixelRatio === 1 ? undefined : 320,
    lg: "vie"
  });

  //Step 2: initialize a map  - not specificing a location will give a whole world view.
  var map = new H.Map(
    document.getElementById("google-map-api"),
    defaultLayers.normal.map,
    { pixelRatio: pixelRatio }
  );

  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  // Now use the map as required...
  // moveMapToBerlin(map);
  setMapViewBounds(map);
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
