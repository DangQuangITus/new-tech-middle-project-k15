// var geocodemap = import("./geocode.js");
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
        timeout: 10000,
        success: function(data) {
          console.log(data);
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

  $("#getaddressdemo").click(function() {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://localhost:3000/apicaller/useraddress",
      // cache: false,
      timeout: 10000,
      success: function(json) {
        console.log(json.searchtext);
        geocodemap(json.searchtext);
        $("#google-map-api").load();
      },
      error: function(data) {
        alert("error");
      }
    });
  });
});

function geocodemap(searchtext) {
  //   var searchtext = "71 trần bình trọng, thành phố hồ chí minh";
  console.log("vo ham geo code map");
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
    /*
     * The styling of the geocoding response on the map is entirely under the developer's control.
     * A representitive styling can be found the full JS + HTML code of this example
     * in the functions below:
     */
    addLocationsToMap(locations);
    addLocationsToPanel(locations);
    // ... etc.
  }

  /**
   * This function will be called if a communication error occurs during the JSON-P request
   * @param  {Object} error  The error message received.
   */
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
          '<strong style="font-size: large;">' +
          address.label +
          "</strong></br>";
      position = {
        lat: locations[i].location.displayPosition.latitude,
        lng: locations[i].location.displayPosition.longitude
      };

      content +=
        "<strong>houseNumber:</strong> " + address.houseNumber + "<br/>";
      content += "<strong>street:</strong> " + address.street + "<br/>";
      content += "<strong>district:</strong> " + address.district + "<br/>";
      content += "<strong>city:</strong> " + address.city + "<br/>";
      content += "<strong>postalCode:</strong> " + address.postalCode + "<br/>";
      content += "<strong>county:</strong> " + address.county + "<br/>";
      content += "<strong>country:</strong> " + address.country + "<br/>";
      content +=
        "<br/><strong>position:</strong> " +
        Math.abs(position.lat.toFixed(4)) +
        (position.lat > 0 ? "N" : "S") +
        " " +
        Math.abs(position.lng.toFixed(4)) +
        (position.lng > 0 ? "E" : "W");

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
      // disable the default draggability of the underlying map
      // when starting to drag a marker object:
      map.addEventListener(
        "dragstart",
        function(ev) {
          var target = ev.target;
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
        function(ev) {
          var target = ev.target;
          var pointer = ev.currentPointer; // add new
          alert("x = " + pointer.viewportX + " , y= " + pointer.viewportY);
          var prox = pointer.viewportX + "," + pointer.viewportY;
          // $.ajax({
          //   url:
          //     "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json",
          //   type: "GET",
          //   dataType: "jsonp",
          //   jsonp: "jsoncallback",
          //   data: {
          //     prox: prox,
          //     mode: "retrieveAddresses",
          //     maxresults: "1",
          //     gen: "9",
          //     app_id: "GLRtC20EEJTogzIdSorb",
          //     app_code: "XqqRsWMKcjKYbnhu0ZT_wA"
          //   },
          //   success: function(data) {
          //     //alert(JSON.stringify(data));
          //     var address = JSON.stringify(data);
          //     alert(address);
          //     console.log(data);
          //     // var locations = address.response.view[0].result;
          //   }
          // });
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
        function(ev) {
          var target = ev.target,
            pointer = ev.currentPointer;
          if (target instanceof mapsjs.map.Marker) {
            target.setPosition(
              map.screenToGeo(pointer.viewportX, pointer.viewportY)
            );
          }
        },
        false
      );

      //--------------------- end -----------------------

      //end new
    }

    group.addEventListener(
      "tap",
      function(evt) {
        map.setCenter(evt.target.getPosition());
        openBubble(evt.target.getPosition(), evt.target.label);
      },
      false
    );

    // Add the locations group to the map
    map.addObject(group);
    map.setCenter(group.getBounds().getCenter());
  }

  // Now use the map as required...
  geocode(platform);
}
