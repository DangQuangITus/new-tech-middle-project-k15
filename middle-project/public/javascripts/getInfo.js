// var geocodemap = import("./geocode.js");

var socket = io("http://localhost:3000");
$(document).ready(function () {
  $("body").bootstrapMaterialDesign();
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
      // console.log(y + "-" + (m + 1) + "-" + d);
      var info = {
        name: $("#username").val(),
        sdt: $("#phonenumber").val(),
        address: $("#address").val(),
        note: $("#note").val(),
        status: "1",
        createddate: y + "-" + (m + 1) + "-" + d + " " + h + ":" + mi + ":" + s
      };
      // console.log(JSON.stringify(info));

      $.ajax({
        type: "POST",
        dataType: "json",
        data: JSON.stringify(info),
        contentType: "application/json",
        url: "http://localhost:3000/apicaller",
        // cache: false,
        timeout: 10000,

        success: function (data) {
          console.log("sau khi post: ", data);
          socket.emit("client-reload-data", data);
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
        content = address.label + "</br>";
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
          var link2 =
            "http://localhost:3000/apicaller/updateaddress?id=" +
            id +
            "&address=" +
            nowPosition;
          $.ajax({
            type: "GET",
            url: link2,
            cache: false,
            dataType: "json",
            contentType: "application/json",
            timeout: 10000,
            success: function (data) {
              console.log(" - data: ");
              console.log(data);
            },
            error: function (data) {
              alert("error");
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

function defaultClick(id) {
  console.log("clicked: ", id);
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
}

function requestDriver(id) {
  console.log("clicked: ", id);
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "http://localhost:3000/apicaller/getdriver/" + id,
    // cache: false,
    timeout: 1000000,
    success: function (json) {
      console.log(json);
      coords1 = {
        lat: json.customer.Latitude,
        lng: json.customer.Longitude
      }
      var driverdistance = [];
      var driverarr = [];
      var info = [];
      for (i = 0; i < json.drivers.length; i++) {
        coords2 = {
          lat: JSON.parse(json.drivers[i].location).lat,
          lng: JSON.parse(json.drivers[i].location).lng
        };
        haversine = haversineDistance(coords1, coords2);
        driverdistance.push(haversine);
        console.log("haversine: " + haversine);

        driverarr.push(JSON.parse(json.drivers[i].location));
        var temp = driverarr[i];
        var id = json.drivers[i].id;
        var stt = json.drivers[i].status;
        var infodriver = {
          coords: temp,
          distance: haversine,
          id: id,
          status: stt
        }

        info.push(infodriver);
      }
      console.log("===INFO DRIVER ARR===");
      console.log(info);
      console.log("===HAVERSINE INFO===");
      insertionSortDriver(info);
      console.log(info);

      var datasend = {
        listdiver: info,
        idcustomer: json.id
      }
      console.log(datasend);

    },
    error: function (data) {
      alert("error");
    }
  });

  function insertionSortDriver(items) {
    for (var i = 0; i < items.length; i++) {
      let min = items[i].distance;
      let value = items[i];
      // store the current item value so it can be placed right
      for (var j = i - 1; j > -1 && items[j].distance > min; j--) {
        // loop through the items in the sorted array (the items from the current to the beginning)
        // copy each item to the next one
        items[j + 1] = items[j]
      }
      // the last item we've reached should now hold the value of the currently sorted item
      items[j + 1] = value
    }

    return list
  }



  function haversineDistance(coords1, coords2) {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }

    var R = 6371; // km

    //has a problem with the .toRad() method below.
    var dLat = toRad(coords2.lat - coords1.lat);
    var dLon = toRad(coords2.lng - coords1.lng);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.lat)) *
      Math.cos(toRad(coords2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var dis = R * c;

    return dis * 1000; // km => m
  }
}
