// var geocodemap = import("./geocode.js");
$(document).ready(function () {
  $('body').bootstrapMaterialDesign();
  $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  // action form input infor
  document.querySelector("#formInfo").addEventListener(
    "submit",
    function (event) {
      var date = new Date();
      var d = date.getDate();
      var y = date.getFullYear();
      var m = date.getMonth();
      var h = date.getHours();
      var mi = date.getMinutes();
      var s = date.getSeconds();
      console.log(y + "-" + (m + 1) + "-" + d);
      var info = {
        name: $("#username").val(),
        sdt: $("#phonenumber").val(),
        address: $("#address").val(),
        note: $("#note").val(),
        status: "1",
        createddate: y + "-" + (m + 1) + "-" + d + " " + h + ":" + mi + ":" + s
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

  $(".getdemo").on('click', function (event) {
    var id = event.target.value;
    //alert(id);
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://localhost:3000/apicaller/useraddress/" + id,
      // cache: false,
      timeout: 10000,
      success: function (json) {
        console.log(json.searchtext);
        $("#google-map-api").empty();
        $("#panel").empty();
        geocodemap(json.searchtext, id);
        $("#google-map-api").load();
      },
      error: function (data) {
        alert("error");
      }
    });
    //  console.log(event.target.value);
  })

});

///=============================================================================

function geocodemap(searchtext, id) {
  // alert("SEARCH:" + searchtext);
  function geocode(platform) {
    var geocoder = platform.getGeocodingService(),
      geocodingParameters = {
        searchText: searchtext,
        jsonattributes: 1
      };

    geocoder.geocode(geocodingParameters, onSuccess, onError);
  }

  function onSuccess(result) {
    var locations = result.response.view[0].result;
    addLocationsToMap(locations);
    addLocationsToPanel(locations);
    // ... etc.
  }

  function onError(error) {
    alert("Ooops!");
  }

  /**
   * Boilerplate map initialization code starts below:
   */

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
    document.getElementById("google-map-api"),
    defaultLayers.normal.map,
    {
      center: { lat: 37.376, lng: -122.034 },
      zoom: 15
    }
  );

  var locationsContainer = document.getElementById("panel");

  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  // Hold a reference to any infobubble opened
  var bubble;

  /**
   * Opens/Closes a infobubble
   * @param  {H.geo.Point} position     The location on the map.
   * @param  {String} text              The contents of the infobubble.
   */
  function openBubble(position, text) {
    if (!bubble) {
      bubble = new H.ui.InfoBubble(position, { content: text });
      ui.addBubble(bubble);
    } else {
      bubble.setPosition(position);
      bubble.setContent(text);
      bubble.open();
    }
  }

  function addLocationsToPanel(locations) {
    var nodeOL = document.createElement("ul"),
      i;

    nodeOL.style.fontSize = "small";
    nodeOL.style.marginLeft = "5%";
    nodeOL.style.marginRight = "5%";

    for (i = 0; i < locations.length; i += 1) {
      var li = document.createElement("li"),
        divLabel = document.createElement("div"),
        address = locations[i].location.address,
        content =
          address.label +
          "</br>";
      position = {
        lat: locations[i].location.displayPosition.latitude,
        lng: locations[i].location.displayPosition.longitude
      };

      // content +=
      //   "<strong>houseNumber:</strong> " + address.houseNumber + "<br/>";
      // content += "<strong>street:</strong> " + address.street + "<br/>";
      // content += "<strong>district:</strong> " + address.district + "<br/>";
      // content += "<strong>city:</strong> " + address.city + "<br/>";
      // content += "<strong>postalCode:</strong> " + address.postalCode + "<br/>";
      // content += "<strong>county:</strong> " + address.county + "<br/>";
      // content += "<strong>country:</strong> " + address.country + "<br/>";
      // content +=
      //   "<br/><strong>position:</strong> " +
      //   Math.abs(position.lat.toFixed(4)) +
      //   (position.lat > 0 ? "N" : "S") +
      //   " " +
      //   Math.abs(position.lng.toFixed(4)) +
      //   (position.lng > 0 ? "E" : "W");

      divLabel.innerHTML = content;
      li.appendChild(divLabel);

      nodeOL.appendChild(li);
    }

    locationsContainer.appendChild(nodeOL);
  }

  function addLocationsToMap(locations) {
    var group = new H.map.Group(),
      position,
      i;

    // Add a marker for each location found
    for (i = 0; i < locations.length; i += 1) {
      position = {
        lat: locations[i].location.displayPosition.latitude,
        lng: locations[i].location.displayPosition.longitude
      };
      marker = new H.map.Marker(position);
      marker.label = locations[i].location.address.label;
      group.addObject(marker);
      //--------------------- add -----------------------
      marker.draggable = true;

      //--------------------- end -----------------------
    }

    // Add the locations group to the map
    map.addObject(group);
    map.setCenter(group.getBounds().getCenter());
  }

  map.addEventListener(
    "dragstart",
    function (ev) {
      var target = ev.target;
      var pointer = ev.currentPointer;
      console.log("start pointer: ", pointer);
      if (target instanceof H.map.Marker) {
        behavior.disable();
      }
    },
    false
  );

  // re-enable the default draggability of the underlying map
  // when dragging has completed
  map.addEventListener(
    "dragend",
    function (event) {
      $("#labelgetclick").show();

      var coord = map.screenToGeo(
        event.currentPointer.viewportX,
        event.currentPointer.viewportY
      );

      // alert(coord.lat + "  " + coord.lng);
      var target = event.target;
      console.log("target: ", target);
      $.ajax({
        url: "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json",
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        data: {
          prox: coord.lat + "," + coord.lng,
          mode: "retrieveAddresses",
          maxresults: "1",
          gen: "9",
          app_id: "XWlu7av4mIl9LiVOkizU",
          app_code: "SWPg1es3nHq226fb1B6DMQ"
        },
        success: function (data) {
          var address = JSON.stringify(data);
          //console.log("address: ", address);
          var currentAddress = data.Response.View[0].Result[0].Location.Address;
          var nowPosition =
            data.Response.View[0].Result[0].Location.Address.Label;

          alert("now position: " + nowPosition);
          console.log("data: ", currentAddress);
          // var locations = address.response.view[0].result;
          var link2 = "http://localhost:3000/apicaller/updateaddress?id=" + id + "&address=" + nowPosition
          $.ajax({
            type: "GET",
            url: link2,
            cache: false,
            dataType: 'json',
            contentType: "application/json",
            timeout: 10000,
            success: function (data) {
              console.log(" - data: ");
              console.log(data);
            },
            error: function (data) {
              alert('error');
            }
          });
        }
      });

      //end new
      if (target instanceof mapsjs.map.Marker) {
        behavior.enable();
      }
    },
    false
  );

  // Listen to the drag event and move the position of the marker
  // as necessary
  map.addEventListener(
    "drag",
    function (ev) {
      var target = ev.target,
        pointer = ev.currentPointer;
      if (target instanceof mapsjs.map.Marker) {
        target.setPosition(
          map.screenToGeo(pointer.viewportX, pointer.viewportY)
        );
      }
    }
    // false
  );

  // Now use the map as required...
  geocode(platform);
}
