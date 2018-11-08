$(document).ready(function() {
  /**
   * Moves the map to display over Berlin
   *
   * @param  {H.Map} map      A HERE Map instance within the application
   */
  function moveMapToBerlin(map) {
    map.setCenter({ lat: 52.5159, lng: 13.3777 });
    map.setZoom(14);
  }
  /**
   * Boilerplate map initialization code starts below:
   */
  //Step 1: initialize communication with the platform
  var platform = new H.service.Platform({
    app_id: "devportal-demo-20180625",
    app_code: "9v2BkviRwi9Ot26kp2IysQ",
    useHTTPS: true
  });
  var pixelRatio = window.devicePixelRatio || 1;
  var defaultLayers = platform.createDefaultLayers({
    tileSize: pixelRatio === 1 ? 256 : 512,
    ppi: pixelRatio === 1 ? undefined : 320
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
  moveMapToBerlin(map);

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
      console.log(info);
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
