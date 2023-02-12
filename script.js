// Init tabs with Materialize.js

M.Tabs.init(document.querySelectorAll(".tabs"));

// Create js variables from html elements

var cityInput = document.getElementById("city-input");
var SSPInput = document.getElementById("SSP-input");
var publisherInput = document.getElementById("publisher-input");
var venuTypeInput = document.getElementById("venue-type-input");
var validateButton = document.getElementById("validate-button");
var submitGPS = document.getElementById("submit-gps");
var fileInput = document.getElementById("fileInput");
var downloadCSVButton = document.getElementById("download-csv-button");

// Init of Tagify smart search for input elements (city, partners, venue type...) on Places tab.
// It takes properties of geojson file "data" to create the smart search :

var cityArray = [];
var SSPArray = [];
var publisherArray = [];
var venuetypeArray = [];

data["features"].forEach((element) => {
  cityArray.push(element.properties.City);
  SSPArray.push(element.properties.SSP);
  publisherArray.push(element.properties["Publisher Name"]);
  venuetypeArray.push(element.properties["Venue Type"]);
});

// Then keeps only the unique values :

var uniqueCityArray = [...new Set(cityArray)];
var uniqueSSPArray = [...new Set(SSPArray)];
var uniquePublisherArray = [...new Set(publisherArray)];
var uniqueVenueTypeArray = [...new Set(venuetypeArray)];

// Init Tagify inputs :  

var cityTagify = createTagify(cityInput, uniqueCityArray);
var SSPTagify = createTagify(SSPInput, uniqueSSPArray);
var publisherTagify = createTagify(publisherInput, uniquePublisherArray);

var venueTypeTagify = new Tagify(venuTypeInput, {
    whitelist: uniqueVenueTypeArray,
    dropdown: {
      maxItems: 20,           // <- mixumum allowed rendered suggestions
      enabled: 0,             // <- show suggestions on focus
      closeOnSelect: true    // <- hide the suggestions dropdown once an item has been selected
    },
  });

// Init leaflet elements : map / tilelayer / TTD screens / points or polygones of user :

const map = L.map("map", { zoomControl: false }).setView(
  // init map
  [46.687697408786136, -1.5568386275056127],
  6
);

var zoomControl = L.control.zoom({
  position: 'topright'
});

map.addControl(zoomControl);

const osm = L.tileLayer( // osm is the map layer. More examples here : https://leaflet-extras.github.io/leaflet-providers/preview/
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  { maxZoom: 19 }
);

// Prepare style for TTD screens layer :

const geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#F98321",
  color: "#F98321",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

function pointToLayer(feature, latlng) {
  return L.circleMarker(latlng, geojsonMarkerOptions);
}

// PopUps style

function popUpStyle(feature, layer) {
  const popupContent =
    '<div class="container-popup"><table class="table table-striped">' +
    "<thead><tr><th>Properties</th><th>Value</th></tr></thead>" +
    "<tbody><tr><td> SSP </td><td>" +
    feature.properties.SSP +
    "</td></tr>" +
    "<tr><td> Publisher Name </td><td>" +
    feature.properties["Publisher Name"] +
    "</td></tr>" +
    "<tr><td> Floor CPM ($) </td><td>" +
    feature.properties["Floor CPM ($)"] +
    "</td></tr>" +
    "<tr><td> Venue Type </td><td>" +
    feature.properties["Venue Type"] +
    "</td></tr>" +
    "<tr><td> Dimensions </td><td>" +
    `${feature.properties["Screen width (px)"]}x${feature.properties["Screen height (px)"]}`;

  layer.bindPopup(popupContent);
}

const geoJsonLayer = L.geoJSON(data, { // TTD screens layer
  onEachFeature: popUpStyle,
  pointToLayer: pointToLayer,
});

const layerDataFromSheet = L.layerGroup(); // user csv data layer

const clusterMarkers = L.markerClusterGroup({ // create cluster object (with MarkerCluster.js) for TTD screens in order to optimize rendering

  iconCreateFunction: function (cluster) {
    var childCount = cluster.getChildCount();
    var c = " marker-cluster-";
    if (childCount < 10) {
      c += "small";
    } else if (childCount < 100) {
      c += "medium";
    } else {
      c += "large";
    }

    return new L.DivIcon({
      html: '<div><span style="color:white">' + childCount + "</span></div>",
      className: "marker-cluster" + c,
      iconSize: new L.Point(40, 40),
    });
  },
});

clusterMarkers.addLayer(geoJsonLayer);


// add all layers to the map object

map.addLayer(osm);
map.addLayer(clusterMarkers);
map.addLayer(layerDataFromSheet);

// tagify function that generates inputs elements with smart search, tags etc...

function createTagify(inputToTagify, whitelistToSearch){
  var tagify = new Tagify(inputToTagify, {
    whitelist: whitelistToSearch,
    dropdown: {
      classname: "color-blue",
      enabled: 1, // show the dropdown immediately on focus
      position: "all", // place the dropdown near the typed text
      closeOnSelect: true, // keep the dropdown open after selecting a suggestion
    },
  });
  return tagify;
}

// Validate function when user click on VALIDATE QUERY button for city, partner, venue type etc...

function validateQuery() {
  map.setView([46.687697408786136, -1.5568386275056127],6)
  clusterMarkers.removeLayer(geoJsonLayer);

  if (cityTagify.value != "") {
    for (i = 0; i < cityTagify.value.length; i++) {
      geoJsonLayer.eachLayer(function (layer) {
        if (
          layer.feature.properties.City.toLowerCase() ==
          cityTagify.value[i].value.toLowerCase()
        ) {
          clusterMarkers.addLayer(layer);
        }
      });
    }
  } else {
    clusterMarkers.addLayer(geoJsonLayer);
  }

  if (SSPTagify.value != "") {
    clusterMarkers.eachLayer(function (layer) {
      var shouldRemove = true;
  
      for (i = 0; i < SSPTagify.value.length; i++) {
        if (
          layer.feature.properties.SSP.toLowerCase() ===
          SSPTagify.value[i].value.toLowerCase()
        ) {
          shouldRemove = false;
          break;
        }
      }
  
      if (shouldRemove) {
        clusterMarkers.removeLayer(layer);
      }
    });
  }

  if (publisherTagify.value != "") {
    clusterMarkers.eachLayer(function (layer) {
      var shouldRemove = true;
  
      for (i = 0; i < publisherTagify.value.length; i++) {
        if (
          layer.feature.properties["Publisher Name"].toLowerCase() ===
          publisherTagify.value[i].value.toLowerCase()
        ) {
          shouldRemove = false;
          break;
        }
      }
  
      if (shouldRemove) {
        clusterMarkers.removeLayer(layer);
      }
    });
  }

  if (venueTypeTagify.value != "") {
    clusterMarkers.eachLayer(function (layer) {
      var shouldRemove = true;
  
      for (i = 0; i < venueTypeTagify.value.length; i++) {
        if (
          layer.feature.properties["Venue Type"].toLowerCase() ===
          venueTypeTagify.value[i].value.toLowerCase()
        ) {
          shouldRemove = false;
          break;
        }
      }
  
      if (shouldRemove) {
        clusterMarkers.removeLayer(layer);
      }
    });
  }
}

// multiple filter clearings when switching tabs or click on clear filter buttons

function clearFiltersPlaces() {
  clusterMarkers.addLayer(geoJsonLayer);

  layerDataFromSheet.eachLayer(function (layer) {
    layerDataFromSheet.removeLayer(layer);
  });

  map.setView([46.687697408786136, -1.5568386275056127], 6);
}

function clearFiltersGPS() {
  clusterMarkers.removeLayer(geoJsonLayer);
  cityTagify.removeAllTags();
  SSPTagify.removeAllTags();
  publisherTagify.removeAllTags();
  venueTypeTagify.removeAllTags();
  map.setView([46.687697408786136, -1.5568386275056127], 6);
}

function clearGeoJSONPlacesFilters() {
  clusterMarkers.removeLayer(geoJsonLayer);
  clusterMarkers.addLayer(geoJsonLayer);
  cityTagify.removeAllTags();
  SSPTagify.removeAllTags();
  publisherTagify.removeAllTags();
  venueTypeTagify.removeAllTags();
  map.setView([46.687697408786136, -1.5568386275056127], 6);
}

function clearGPSLayer() {
  layerDataFromSheet.eachLayer(function (layer) {
    layerDataFromSheet.removeLayer(layer);
  });

  clusterMarkers.eachLayer(function (layer) {
    clusterMarkers.removeLayer(layer);
  });

  fileInput.files = "";

  map.setView([46.687697408786136, -1.5568386275056127], 6);
}

// able or disable VALIDATE QUERY button (PLACES tab) on value change for inputs.

cityTagify.on("change", checkInputs);
SSPTagify.on("change", checkInputs);
publisherTagify.on("change", checkInputs);
venueTypeTagify.on("change", checkInputs);

function checkInputs() {
  if (cityTagify.value != "" || SSPTagify.value != "" || publisherTagify.value != "" || venueTypeTagify.value != "") {
    validateButton.disabled = false;
  } else if (cityTagify.value == "" && SSPTagify.value == "" && publisherTagify.value == "" && venueTypeTagify.value == "") {
    validateButton.disabled = true;
  };
}

// Submit function when user click on VALIDATE QUERY button for GPS query

submitGPS.addEventListener("click", function () {
  layerDataFromSheet.eachLayer(function (layer) {
    layerDataFromSheet.removeLayer(layer);
  });

  clusterMarkers.eachLayer(function (layer) {
    clusterMarkers.removeLayer(layer);
  });

  // getting the csv

  const file = fileInput.files[0];

  const reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function () {
    const csv = reader.result;

    // csv to json with papaparse.js

    var test = Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
    });

    var dataFromSheet = test.data;

    // checking the tareting type : radius or polygons

    if (
      arrayEquals(Object.keys(dataFromSheet[0]), [
        "Longitude",
        "Latitude",
        "Radius (meters)",
      ])
    ) {
      radiusFunction(dataFromSheet); // if radius, call the radius function
    } else {
      poylgonFunction(dataFromSheet); // if polygons, call the polygons function
    }
  };

  map.setView([46.687697408786136, -1.5568386275056127],6)

});

//  Download csv button (bottom right of the window)

downloadCSVButton.addEventListener("click", function () {
  var objectToCsv = [];

  clusterMarkers.eachLayer(function (layer) {
    var pointToCsv = {};

    // all elements that appear in the downloaded csv file

    pointToCsv["Longitude"] = layer.feature.geometry.coordinates[0];
    pointToCsv["Latitude"] = layer.feature.geometry.coordinates[1];
    pointToCsv["SSP"] = layer.feature.properties.SSP;
    pointToCsv["Publisher"] = layer.feature.properties["Publisher Name"];
    pointToCsv["Screen ID"] = layer.feature.properties["Screen ID"];
    pointToCsv["City"] = layer.feature.properties["City"];
    pointToCsv["Screen width (px)"] =
      layer.feature.properties["Screen width (px)"];
    pointToCsv["Screen height (px)"] =
      layer.feature.properties["Screen height (px)"];
    pointToCsv["Min Ad Duration"] = layer.feature.properties["Min Ad Duration"];
    pointToCsv["Max Ad Duration"] = layer.feature.properties["Max Ad Duration"];
    pointToCsv["Floor CPM ($)"] = layer.feature.properties["Floor CPM ($)"];
    pointToCsv["Avg Weekly Impressions"] =
      layer.feature.properties["Avg Weekly Impressions"];
    pointToCsv["Venue Type"] = layer.feature.properties["Venue Type"];

    objectToCsv.push(pointToCsv);
  });

  const data = Papa.unparse(objectToCsv);
  const csv = "data:text/csv;charset=utf-8," + encodeURI(data);
  const link = document.createElement("a");
  link.setAttribute("href", csv);
  link.setAttribute("download", "data.csv");
  link.click();
});

// radius function if radius template uploaded by the user

function radiusFunction(data) {
  var turfDistanceOptions = { units: "meters" };

  // adding marker and circle for each point of the csv file to the data user layer

  data.forEach((point) => {
    L.marker([point.Latitude, point.Longitude]).addTo(layerDataFromSheet);
    L.circle([point.Latitude, point.Longitude], {
      radius: point["Radius (meters)"],
      fillColor: "#002F87",
      fillOpacity: 0.1,
      weight: 1,
    }).addTo(layerDataFromSheet);

    var pointTurfFrom = turf.point([point.Latitude, point.Longitude]);

    var addedPoints = new Set();

    // asking for each TTD screens if the distance between with csv point is smaller than radius.

    geoJsonLayer.eachLayer(function (layer) { // geoJSONLayer -->  TTD screens
      var pointTurfTo = turf.point([
        layer.feature.geometry.coordinates[1],
        layer.feature.geometry.coordinates[0],
      ]);

      // use Turf.js to calculate distance between the points.

      var distance = turf.distance(
        pointTurfFrom,
        pointTurfTo,
        turfDistanceOptions
      );

      // if distance smaller than radius AND not present in already added points --> add TTD screens to ClusterMarkers layer

      if (distance < point["Radius (meters)"] && !addedPoints.has(layer)) {
        clusterMarkers.addLayer(layer);
        addedPoints.add(layer); // add TTD screens to added points
      }
    });
  });
}

// polygon function if polygon template uploaded by the user

function poylgonFunction(data) {
  data.forEach((point) => {
    let arrayofGPSpoints = [];

    // for each line of the csv (polygon), split different points in an array. Each element of the array is an array of lat/long.

    for (let [key, value] of Object.entries(point)) {
      if (key.startsWith("Latitude")) {
        let index = key.slice(-1);
        arrayofGPSpoints[index - 1] = arrayofGPSpoints[index - 1] || [];
        arrayofGPSpoints[index - 1].unshift(value);
      } else if (key.startsWith("Longitude")) {
        let index = key.slice(-1);
        arrayofGPSpoints[index - 1] = arrayofGPSpoints[index - 1] || [];
        arrayofGPSpoints[index - 1].push(value);
      };
    };

    // delete points of each polygon that are null (from the end of the array). Important if polygones have only 3 points vs other polygons with 5 points for example.

    while (
      arrayofGPSpoints.length > 0 &&
      (arrayofGPSpoints[arrayofGPSpoints.length - 1][0] === null ||
        arrayofGPSpoints[arrayofGPSpoints.length - 1][1] === null)
    ) {
      arrayofGPSpoints.pop();
    }

    // create polygon element with leaflet

    var polygon = L.polygon(arrayofGPSpoints,{
      fillColor: "#002F87",
      fillOpacity: 0.1,
      weight: 1,
    });

    polygon.addTo(layerDataFromSheet); // add it to the user data layer

    var addedPoints = new Set();

    // asking for each TTD screen...

    geoJsonLayer.eachLayer(function (layer) {
      var pointTurf = turf.point([
        layer.feature.geometry.coordinates[0],
        layer.feature.geometry.coordinates[1],
      ]);

      // using Turf.js to know if a TTD screen in inside the poygon

      var inside = turf.inside(pointTurf, polygon.toGeoJSON());

      if (inside) { // if TTD screen is inside --> put it on clusterMarker Layer + add it the added points.
        clusterMarkers.addLayer(layer);
        addedPoints.add(layer);
      }
    });
  });
}

// function that answer following condition : are all elements of the Array A the same as in the array B ?

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

// checking if file input is empty on change -> if not : disable validate button (GPS list tab)

fileInput.addEventListener("change", function() {
  if (this.files.length > 0) {
    submitGPS.disabled = false;
  } else {
    submitGPS.disabled = true;
  }
});
