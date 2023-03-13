var accordionItems = document.querySelectorAll(".accordion-item");
var dropdownFileInput = document.querySelectorAll(".file-type-dropdown");
var selectFileInput = document.querySelectorAll(".file-type-input");
var chevronFileInput = document.querySelectorAll(".file-input-chevron-img");
var optionsFileInput = document.querySelectorAll(".file-input-options");
var uniqueFileOptionInput = document.querySelectorAll(".file-select-options");
var selectedFileInput = document.querySelector(".file-input-selected");
var chevronFileSVGPath = document.querySelector(".file-chevron-svg-path");
var clearPillsButton = document.querySelectorAll(".clear-pills");
var placesClearPillsButton = document.getElementById("places-clear-filter");
var placesInput = document.getElementById("places-input");
var placesDropdown = document.getElementById("places-input-options");
var placesPills = document.getElementById("places-pills");
var venueTypeInput = document.getElementById("venue-type-input");
var venueTypeDropdown = document.getElementById("venue-type-input-options");
var venueTypePills = document.getElementById("venue-type-pills");
var partnersInput = document.getElementById("partners-input");
var partnersDropdown = document.getElementById("partners-input-options");
var partnersPills = document.getElementById("partners-pills");
var specificationsInput = document.getElementById("specifications-input");
var specificationsDropdown = document.getElementById("specifications-input-options");
var specificationsPills = document.getElementById("specifications-pills");
var dropdownAdTypeInput = document.querySelectorAll(".ad-type-dropdown");
var selectAdTypeInput = document.querySelectorAll(".ad-type-input");
var chevronAdTypeInput = document.querySelectorAll(".ad-type-input-chevron-img");
var optionsAdTypeInput = document.querySelectorAll(".ad-type-input-options");
var selectedAdTypeInput = document.querySelector(".ad-type-input-selected");
var uniqueAdTypeOptionInput = document.querySelectorAll(".ad-type-select-options");
var chevronAdTypeSVGPath = document.querySelector(".ad-type-chevron-svg-path");
var exportTextLink = document.querySelector(".export-text-Link");
var downloadTemplateContainer = document.querySelector(".template-to-download");
var downloadTemplateLink = document.querySelector(".export-text-Link");
var downloadTemplateLogo = document.querySelector(".export-logo");
var fileInput = document.getElementById('file-input');
var uploadedFileName = document.querySelector('.uploaded-file-name');
var uploadedFileSection = document.querySelector('.uploaded-file-section');
var deleteFileBtn = document.querySelector('.delete-file');
var fileUpload = document.querySelector('.file-upload');
var errorContainer = document.querySelector('.error-container');
var errorMessage = document.querySelector('.error-message');
var clickOrDragSpan = document.querySelector('.click-or-drag');
var loader = document.querySelector('.upload-loader');
var spotLengthInput = document.getElementById("length-input");
var minCPMInput = document.getElementById('min-cpm-input');
var maxCPMInput = document.getElementById('max-cpm-input');
var videoCheckbox = document.querySelector('.video-checkbox');
var displayCheckbox = document.querySelector('.static-checkbox');
var htmlCheckbox = document.querySelector('.html-checkbox');
var exportData = document.querySelector('.export-button');
var selectedScreenNumber = document.querySelector('.screens-number');
var selectedCPMNumber = document.querySelector('.cpm-number');
var clearFilterButton = document.querySelector('.clear-filter-button');

////////////////////////////////

function getUniqueProperties(data, attribute) {
  const propertyList = data.features.map(
    (feature) => feature.properties[attribute]
  );
  const filteredProperties = propertyList.filter(
    (name) => name != null && name !== ""
  );
  const uniqueProperties = new Set(filteredProperties);
  return Array.from(uniqueProperties);
};

function createPill(text, attribute) {
  const pill = document.createElement("div");
  pill.innerHTML = `<span>${text}</span><span><img src="./img/close_btn.svg" alt="" class="pills-cross"></span>`;
  pill.classList.add("pills");
  switch (attribute) {
    case "Country":
      pill.classList.add("pills-country");
      pill.dataset.property = "Country";
      break;
    case "City":
      pill.classList.add("pills-city");
      pill.dataset.property = "City";
      break;
    case "Region":
      pill.classList.add("pills-region");
      pill.dataset.property = "Region";
      break;
    case "Zipcode":
      pill.classList.add("pills-zip");
      pill.dataset.property = "Zipcode";
      break;
    case "Venue Type":
      pill.classList.add("pills-classic");
      pill.dataset.property = "Venue Type";
    break;
    case "SSP":
      pill.classList.add("pills-ssp");
      pill.dataset.property = "SSP";
    break;
    case "Publisher Name":
      pill.classList.add("pills-publisher");
      pill.dataset.property = "Publisher Name";
    break;
    case "Width x Height":
      pill.classList.add("pills-classic");
      pill.dataset.property = "Width x Height";
    break;
  }
  return pill;
};

function ClearPills(parentElement) {
  parentElement.innerHTML = "";
};

function createPlacesDropdown(City,Region,Country,Zipcode){
  const menuItems = [
    ...City.map(
      (city) =>
        `<li class="select-options" data-property="City">${city}<div class="badge city-badge">City</div></li>`
    ),
    ...Region.map(
      (region) =>
        `<li class="select-options" data-property="Region">${region}<div class="badge region-badge">Region</div></li>`
    ),
    ...Country.map(
      (country) =>
        `<li class="select-options"data-property="Country">${country}<div class="badge country-badge">Country</div></li>`
    ),
    ...Zipcode.map(
      (zip) =>
        `<li class="select-options" data-property="Zipcode">${zip}<div class="badge zip-badge">ZIP code</div></li>`
    ),
  ].sort();
  return menuItems
};

function createVenueTypeDropdown(venueType){
  const menuItems = [
    ...venueType.map(
      (venuetype) =>
        `<li data-property="Venue Type" class="select-options">${venuetype}</li>`
    )
  ].sort();
  return menuItems
};

function createPartnersDropdown(SSP,Publisher){
  const menuItems = [
    ...SSP.map(
      (ssp) =>
        `<li class="select-options" data-property="SSP">${ssp}<div class="badge ssp-badge">SSP</div></li>`
    ),
    ...Publisher.map(
      (publisher) =>
        `<li class="select-options" data-property="Publisher Name">${publisher}<div class="badge publisher-badge">Publisher</div></li>`
    )
  ].sort();
  return menuItems
};

function createSpecificationsDropdown(spec){
  const menuItems = [
    ...spec.map(
      (spec) =>
        `<li class="select-options" data-property="Width x Height">${spec}</li>`
    )
  ].sort();
  return menuItems
};

placesInput.addEventListener("input", (event) => {
  const userInput = event.target.value.trim().toLowerCase();
  let existingPlacesPills = [];

  if (placesPills.childElementCount > 1){
    let pills = Array.from(placesPills.querySelectorAll('.pills'));
    pills.forEach((pill) => {
      let attribute = pill.dataset.property;
      let value = pill.childNodes[0].textContent;
      existingPlacesPills.push({ attribute, value });
    });
  };

  const countryNames = getUniqueProperties(data, "Country")
    .filter((country) =>
      country.toLowerCase().includes(userInput) &&
      !existingPlacesPills.some(pill => pill.attribute === 'Country' && pill.value.toLowerCase() === country.toLowerCase())
    );
  const regionNames = getUniqueProperties(data, "Region")
    .filter((region) =>
      region.toLowerCase().includes(userInput) &&
      !existingPlacesPills.some(pill => pill.attribute === 'Region' && pill.value.toLowerCase() === region.toLowerCase())
    );
  const zipNames = getUniqueProperties(data, "Zipcode")
    .filter((zip) =>
      zip.toString().toLowerCase().includes(userInput) &&
      !existingPlacesPills.some(pill => pill.attribute === 'Zipcode' && pill.value.toLowerCase() === zip.toString().toLowerCase())
    );
  const cityNames = getUniqueProperties(data, "City")
    .filter((city) =>
      city.toLowerCase().includes(userInput) &&
      !existingPlacesPills.some(pill => pill.attribute === 'City' && pill.value.toLowerCase() === city.toLowerCase())
    );

  let menuItems = createPlacesDropdown(cityNames,regionNames,countryNames,zipNames).join("");

  placesDropdown.innerHTML = menuItems;

  if (placesInput.value != "" && menuItems != "") {
    placesDropdown.style.display = "block";
  } else {
    placesDropdown.style.display = "none";
  }
});

venueTypeInput.addEventListener("input", (event) => {
  const userInput = event.target.value.trim().toLowerCase();
  let existingvenueTypePills = [];

  if (venueTypePills.childElementCount > 1){
    let pills = Array.from(venueTypePills.querySelectorAll('.pills'));
    pills.forEach((pill) => {
      let attribute = pill.dataset.property;
      let value = pill.childNodes[0].textContent;
      existingvenueTypePills.push({ attribute, value });
    });
  };

  const venueTypesNames = getUniqueProperties(data, "Venue Type")
  .filter((venueType) =>
  venueType.toLowerCase().includes(userInput) &&
    !existingvenueTypePills.some(pill => pill.attribute === 'Venue Type' && pill.value.toLowerCase() === venueType.toLowerCase())
  );

  let menuItems = createVenueTypeDropdown(venueTypesNames).join("");

  venueTypeDropdown.innerHTML = menuItems;

  if (venueTypeInput.value != "" && menuItems != "") {
    venueTypeDropdown.style.display = "block";
  } else {
    venueTypeDropdown.style.display = "none";
  }

});

partnersInput.addEventListener("input", (event) => {
  const userInput = event.target.value.trim().toLowerCase();
  let existingPartnersPills = [];

  if (partnersPills.childElementCount > 1){
    let pills = Array.from(partnersPills.querySelectorAll('.pills'));
    pills.forEach((pill) => {
      let attribute = pill.dataset.property;
      let value = pill.childNodes[0].textContent;
      existingPartnersPills.push({ attribute, value });
    });
  };

  const sspNames = getUniqueProperties(data, "SSP")
    .filter((ssp) =>
      ssp.toLowerCase().includes(userInput) &&
      !existingPartnersPills.some(pill => pill.attribute === 'SSP' && pill.value.toLowerCase() === ssp.toLowerCase())
    );
  const publisherNames = getUniqueProperties(data, "Publisher Name")
    .filter((publisher) =>
    publisher.toLowerCase().includes(userInput) &&
      !existingPartnersPills.some(pill => pill.attribute === 'Publisher Name' && pill.value.toLowerCase() === publisher.toLowerCase())
    );

  let menuItems = createPartnersDropdown(sspNames,publisherNames).join("");

  partnersDropdown.innerHTML = menuItems;

  if (partnersInput.value != "" && menuItems != "") {
    partnersDropdown.style.display = "block";
  } else {
    partnersDropdown.style.display = "none";
  }
});

specificationsInput.addEventListener("input", (event) => {
  const userInput = event.target.value.trim().toLowerCase();
  let existingSpecificationsPills = [];

  if (specificationsPills.childElementCount > 1){
    let pills = Array.from(specificationsPills.querySelectorAll('.pills'));
    pills.forEach((pill) => {
      let attribute = pill.dataset.property;
      let value = pill.childNodes[0].textContent;
      existingSpecificationsPills.push({ attribute, value });
    });
  };

  const specNumbers = getUniqueProperties(data, "Width x Height")
    .filter((spec) =>
      spec.toLowerCase().includes(userInput) &&
      !existingSpecificationsPills.some(pill => pill.attribute === 'Width x Height' && pill.value.toLowerCase() === spec.toLowerCase())
    );

  let menuItems = createSpecificationsDropdown(specNumbers).join("");

  specificationsDropdown.innerHTML = menuItems;

  console.log(specificationsInput.value)
  console.log(menuItems)

  if (specificationsInput.value != "" && menuItems != "") {
    specificationsDropdown.style.display = "block";
  } else {
    specificationsDropdown.style.display = "none";
  }
});

placesDropdown.addEventListener("click", (event) => {

  if (event.target.tagName === "LI") {
    placesInput.value = "";
    placesDropdown.style.display = "none";
    const attribute = event.target.dataset.property;
    const text = event.target.childNodes[0].textContent;
    const pill = createPill(text, attribute);
    const pillsCross = pill.querySelector(".pills-cross");
    pillsCross.addEventListener("click", () => {
      if (placesPills.childElementCount <= 2) {
        placesPills.innerHTML = "";
      } else if (placesPills.childElementCount > 2){
        pill.remove();
      }
    });
    placesInput.focus();
    if (placesPills.childElementCount == 0) {
      placesPills.appendChild(pill);
    } else {
      placesPills.insertBefore(pill, placesPills.lastChild);
    };
    if (placesPills.childElementCount == 1) {
      const clearButton = document.createElement("div");
      clearButton.classList.add("clear-pills");
      clearButton.textContent = "CLEAR ALL";
      placesPills.appendChild(clearButton);
      clearButton.addEventListener("click", function () {
        ClearPills(placesPills);
        placesInput.value = "";
      });
    };
  };
});

venueTypeDropdown.addEventListener("click", (event) => {

  if (event.target.tagName === "LI") {
    venueTypeInput.value = "";
    venueTypeDropdown.style.display = "none";
    const attribute = event.target.dataset.property;
    const text = event.target.childNodes[0].textContent;
    const pill = createPill(text, attribute);
    const pillsCross = pill.querySelector(".pills-cross");
    pillsCross.addEventListener("click", () => {
      if (venueTypePills.childElementCount <= 2) {
        venueTypePills.innerHTML = "";
      } else if (venueTypePills.childElementCount > 2){
        pill.remove();
      }
    });
    venueTypeInput.focus();
    if (venueTypePills.childElementCount == 0) {
      venueTypePills.appendChild(pill);
    } else {
      venueTypePills.insertBefore(pill, venueTypePills.lastChild);
    };
    if (venueTypePills.childElementCount == 1) {
      const clearButton = document.createElement("div");
      clearButton.classList.add("clear-pills");
      clearButton.textContent = "CLEAR ALL";
      venueTypePills.appendChild(clearButton);
      clearButton.addEventListener("click", function () {
        ClearPills(venueTypePills);
        venueTypeInput.value = "";
      });
    };
  };
});

partnersDropdown.addEventListener("click", (event) => {

  if (event.target.tagName === "LI") {
    partnersInput.value = "";
    partnersDropdown.style.display = "none";
    const attribute = event.target.dataset.property;
    const text = event.target.childNodes[0].textContent;
    const pill = createPill(text, attribute);
    const pillsCross = pill.querySelector(".pills-cross");
    pillsCross.addEventListener("click", () => {
      if (partnersPills.childElementCount <= 2) {
        partnersPills.innerHTML = "";
      } else if (partnersPills.childElementCount > 2){
        pill.remove();
      }
    });
    partnersInput.focus();
    if (partnersPills.childElementCount == 0) {
      partnersPills.appendChild(pill);
    } else {
      partnersPills.insertBefore(pill, partnersPills.lastChild);
    };
    if (partnersPills.childElementCount == 1) {
      const clearButton = document.createElement("div");
      clearButton.classList.add("clear-pills");
      clearButton.textContent = "CLEAR ALL";
      partnersPills.appendChild(clearButton);
      clearButton.addEventListener("click", function () {
        ClearPills(partnersPills);
        partnersInput.value = "";
      });
    };
  };
});

specificationsDropdown.addEventListener("click", (event) => {

  if (event.target.tagName === "LI") {
    specificationsInput.value = "";
    specificationsDropdown.style.display = "none";
    const attribute = event.target.dataset.property;
    const text = event.target.childNodes[0].textContent;
    const pill = createPill(text, attribute);
    const pillsCross = pill.querySelector(".pills-cross");
    pillsCross.addEventListener("click", () => {
      if (specificationsPills.childElementCount <= 2) {
        specificationsPills.innerHTML = "";
      } else if (specificationsPills.childElementCount > 2){
        pill.remove();
      }
    });
    specificationsInput.focus();
    if (specificationsPills.childElementCount == 0) {
      specificationsPills.appendChild(pill);
    } else {
      specificationsPills.insertBefore(pill, specificationsPills.lastChild);
    };
    if (specificationsPills.childElementCount == 1) {
      const clearButton = document.createElement("div");
      clearButton.classList.add("clear-pills");
      clearButton.textContent = "CLEAR ALL";
      specificationsPills.appendChild(clearButton);
      clearButton.addEventListener("click", function () {
        ClearPills(specificationsPills);
        specificationsInput.value = "";
      });
    };
  };
});

selectFileInput[0].addEventListener("click", function () {
  selectFileInput[0].classList.toggle("select-clicked");
  chevronFileInput[0].classList.toggle("file-input-chevron-img-rotate");
  optionsFileInput[0].classList.toggle("file-input-options-open");
  chevronFileSVGPath.classList.toggle("svg-path-blue");
});

const downloadLinks = {
  "CSV - Radius - lat/long": "radius_lat_long_template.xlsx",
  "CSV - Radius - adresses": "radius_adresses_template.xlsx",
  "CSV - Polygons": "polygons_lat_long_template.xlsx",
  "CSV - IRIS (France only)": "iris_template.xlsx"
};

function downloadTemplateFile() {
  const selectedOption = selectedFileInput.innerText;
  if (selectedOption.startsWith("CSV")) {
    var url = `./templates/${downloadLinks[selectedOption]}`;
    var fileName = downloadLinks[selectedOption];
    var link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  }
}

uniqueFileOptionInput.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.classList.contains("option-active")) {
      return;
    }
    const selectedOption = option.textContent.trim();
    clickOrDragSpan.innerText = `Click or drag your '${selectedOption}' file`
    selectedFileInput.value = selectedOption;
    if (selectedOption.startsWith("Geojson")) {
      downloadTemplateContainer.style.display = "none";
    } else {
      downloadTemplateContainer.style.display = "block";
    }
    deleteSelectedFile()
  });
});

downloadTemplateLink.addEventListener("click", downloadTemplateFile);
downloadTemplateLogo.addEventListener("click", downloadTemplateFile);

selectAdTypeInput[0].addEventListener("click", function () {
  selectAdTypeInput[0].classList.toggle("select-clicked");
  chevronAdTypeInput[0].classList.toggle("ad-type-input-chevron-img-rotate");
  optionsAdTypeInput[0].classList.toggle("ad-type-input-options-open");
  chevronAdTypeSVGPath.classList.toggle("svg-path-blue");
});

uniqueFileOptionInput.forEach((option) => {
  option.addEventListener("click", function () {
    selectedFileInput.innerText = option.innerText;
    selectFileInput[0].classList.remove("select-clicked");
    chevronFileInput[0].classList.remove("file-input-chevron-img-rotate");
    optionsFileInput[0].classList.remove("file-input-options-open");
    chevronFileSVGPath.classList.remove("svg-path-blue");
    uniqueFileOptionInput.forEach((option) => {
      option.classList.remove("option-active");
    });

    option.classList.add("option-active");
  });
});

window.addEventListener("click", (event) => {
  if (
    !optionsFileInput[0].contains(event.target) &&
    !selectFileInput[0].contains(event.target)
  ) {
    selectFileInput[0].classList.remove("select-clicked");
    chevronFileInput[0].classList.remove("file-input-chevron-img-rotate");
    optionsFileInput[0].classList.remove("file-input-options-open");
    chevronFileSVGPath.classList.remove("svg-path-blue");
  };
  if (
    !optionsAdTypeInput[0].contains(event.target) &&
    !selectAdTypeInput[0].contains(event.target)
  ) {
    selectAdTypeInput[0].classList.remove("select-clicked");
    chevronAdTypeInput[0].classList.remove("ad-type-input-chevron-img-rotate");
    optionsAdTypeInput[0].classList.remove("ad-type-input-options-open");
    chevronAdTypeSVGPath.classList.remove("svg-path-blue");
  };
  if (!placesDropdown.contains(event.target)) {
    placesDropdown.style.display = "none";
  };
  if (!venueTypeDropdown.contains(event.target)) {
    venueTypeDropdown.style.display = "none";
  };
  if (!partnersDropdown.contains(event.target)) {
    partnersDropdown.style.display = "none";
  };
  if (!specificationsDropdown.contains(event.target)) {
    specificationsDropdown.style.display = "none";
  };
});

accordionItems.forEach(function (item) {
  var title = item.querySelector(".title-element-accordion");
  var chevron = item.querySelector(".chevron-accordion");
  var content = item.querySelector(".accordion-content");

  title.addEventListener("click", function () {
    item.classList.toggle("active");
  });

  chevron.addEventListener("click", function () {
    item.classList.toggle("active");
  });

});

fileInput.addEventListener("click", function() {
  this.value = null; // réinitialiser l'élément <input> avant chaque téléchargement
});


function irisValidateValues(arrayOfArrays) {
  const regex = /^[0-9]+$/;
  for (let i = 1; i < arrayOfArrays.length; i++) {
    const element = arrayOfArrays[i];
    if (element[1] == "") {
      return "empty";
    }
    if (!regex.test(element[1])) {
      return "letter";
    }
    if (element[1].length !== 9) {
      return "length";
    }
  }
  return true;
};

function showErrorMessage(message) {

  return new Promise((resolve) => {
    
    hideLoader();
    ShowFileUploadError(message);
    setForecastInfos();
    resolve();
    
  });
};

function validationChecks(UploadElement,event){

  var fileTypeToUpload = selectedFileInput.innerText;

  if (UploadElement == fileInput){
    var file = event.target.files[0];
    var fileName = event.target.value.split('\\').pop();
    var fileExtension = fileName.split('.').pop().toLowerCase();
  } else if (UploadElement == fileUpload){
    event.preventDefault();
    var file = event.dataTransfer.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split('.').pop().toLowerCase();
  };

  if (fileTypeToUpload.includes("CSV")){

    if (fileName != "" && fileExtension == 'csv'){

      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {

        const csv = reader.result;
        const parsedCsv = Papa.parse(csv, { header: false }).data;
        const headerColumns = parsedCsv[0];
        parsedCsv.pop();

        if (fileTypeToUpload == "CSV - Radius - lat/long"
         || fileTypeToUpload == "CSV - Radius - adresses"
         || fileTypeToUpload == "CSV - IRIS (France only)"){
          parsedCsv.forEach(row =>{
            const rowWithoutFirstElement = row.slice(1);
            if (rowWithoutFirstElement.some((element) => element == "")){
              showErrorMessage("Empty cells have been found in your CSV file.");
              return;
            };
          });
        };

        if (parsedCsv.length == 1){
          showErrorMessage("Uploaded file is empty.");
          return;
        };

        if (fileTypeToUpload == "CSV - Radius - lat/long"){

          const requiredColumns = ["Name", "Longitude", "Latitude", "Radius (meters)"];

          if (["Name", "Code IRIS"].every((element) => headerColumns.includes(element)
           || ["Name", "Street address", "ZIP code", "City", "Country", "Radius (meters)"].every((element) => headerColumns.includes(element)))
           || headerColumns[1] == "Longitude1" && headerColumns[2] == "Latitude1"){
            showErrorMessage("Invalid file format. Please upload a 'CSV - Radius - lat/long' file.");
            return;
          };

          if (headerColumns.length > 4) {
            showErrorMessage("Data must be in the specified columns of the CSV file.");
            return;
          };

          if (!headerColumns.every(col => requiredColumns.includes(col))) {
            showErrorMessage("Column names in your CSV file do not match the required format.");
            return;
          };

          const latIndex = headerColumns.indexOf("Latitude");
          const lonIndex = headerColumns.indexOf("Longitude");
          const radius = headerColumns.indexOf("Radius (meters)");

          parsedCsv.slice(1).forEach((row) => {
            // Check if the latitude and longitude values contain a period
            if (row[latIndex].indexOf(".") === -1 || row[lonIndex].indexOf(".") === -1) {
              showErrorMessage("Invalid CSV file. 'Longitude' or 'Latitude' must contain periods.");
              return;
            }
          });

          parsedCsv.slice(1).forEach((row) => {
            // Check if the Radius contain number only
            if (!/^\d+$/.test(row[radius])) {
              showErrorMessage("Invalid CSV file. 'Radius (meters)' must only contain integers.");
              return;
            }
          });

        } else if (fileTypeToUpload == "CSV - Radius - adresses"){

          const requiredColumns = ["Name", "Street address", "ZIP code", "City", "Country", "Radius (meters)"];
          const radius = headerColumns.indexOf("Radius (meters)");
          const zipcode = headerColumns.indexOf("ZIP code");

          if(headerColumns[1] == "Longitude1" && headerColumns[2] == "Latitude1"
          || ["Name", "Longitude", "Latitude", "Radius (meters)"].every((element) => headerColumns.includes(element))
          || ["Name", "Code IRIS"].every((element) => headerColumns.includes(element))){
            showErrorMessage("Invalid file format. Please upload a 'CSV - Radius - adresses' file.");
            return;
          };

          if (headerColumns.length > 6) {
            showErrorMessage("Data must be in the specified columns of the CSV file.");
            return;
          };

          if (!headerColumns.every(col => requiredColumns.includes(col))) {
            showErrorMessage("Column names in your CSV file do not match the required format.");
            return;
          };

          parsedCsv.slice(1).forEach((row) => {
            // Check if the Radius contain number only
            if (!/^\d+$/.test(row[radius])) {
              showErrorMessage("Invalid CSV file. 'Radius (meters)' must only contain integers.");
              return;
            };
            if (!/^\d+$/.test(row[zipcode])) {
              showErrorMessage("Invalid CSV file. 'ZIP code' must only contain integers.");
              return;
            };
          });

        } else if (fileTypeToUpload == "CSV - Polygons"){

          if(["Name", "Longitude", "Latitude", "Radius (meters)"].every((element) => headerColumns.includes(element))
          || ["Name", "Code IRIS"].every((element) => headerColumns.includes(element))
          || ["Name", "Street address", "ZIP code", "City", "Country", "Radius (meters)"].every((element) => headerColumns.includes(element))){
            showErrorMessage("Invalid file format. Please upload a 'CSV - Polygons' file.");
            return;
          };

          while (headerColumns[headerColumns.length - 1] === "") {
            headerColumns.pop();
          };

          parsedCsv.forEach(row => {
            if (row.length > headerColumns.length){
              showErrorMessage("Data must be in the specified columns of the CSV file.");
              return;
            }
          });

          if (headerColumns.length % 2 == 0){
            showErrorMessage("The uploaded CSV file is invalid. The number of columns must be odd.");
            return;
          };

          var numColumns = Object.keys(headerColumns).length;
          var expectedHeaders = ['Name'];
          for (let i = 1; i <= numColumns; i++) {
            const expectedHeader = i % 2 === 0 ? `Latitude${i/2}` : `Longitude${(i+1)/2}`;
            expectedHeaders.push(expectedHeader);
          };

          expectedHeaders.pop();
          for (let i = 0; i < expectedHeaders.length; i++) {
            if (headerColumns[i] != expectedHeaders[i]) {
              errorContainer.style.display = "flex";
              uploadedFileSection.style.display = 'none';
              errorMessage.innerText = `The uploaded CSV file is invalid. Column ${i+1} should be named "${expectedHeaders[i]}".`
              return;
            };
          };

          parsedCsv.forEach(row =>{
          
            const rowWithoutFirstElement = row.slice(1);
            while (rowWithoutFirstElement[rowWithoutFirstElement.length - 1] == "") {
              rowWithoutFirstElement.pop();
            };
            if (rowWithoutFirstElement.some((element) => element == "")){
              showErrorMessage("Empty cells have been found in your CSV file.");
              return;
            };
          });

        } else if (fileTypeToUpload == "CSV - IRIS (France only)"){

          const requiredColumns = ["Name", "Code IRIS"];

          if(["Name", "Longitude", "Latitude", "Radius (meters)"].every((element) => headerColumns.includes(element))
          || ["Name", "Street address", "ZIP code", "City", "Country", "Radius (meters)"].every((element) => headerColumns.includes(element))
          || headerColumns[1] == "Longitude1" && headerColumns[2] == "Latitude1"){
            showErrorMessage("Invalid file format. Please upload a 'CSV - IRIS' file.");
            return;
          };

          if (headerColumns.length > 2) {
            showErrorMessage("Data must be in the specified columns of the CSV file.");
            return;
          };

          if (!headerColumns.every(col => requiredColumns.includes(col))) {
            showErrorMessage("Column names in your CSV file do not match the required format.");
            return;
          };

          if (irisValidateValues(parsedCsv) == "empty"){
            showErrorMessage("Empty cells have been found in your CSV file.");
            return;
          }

          if (irisValidateValues(parsedCsv) == "letter"){
            showErrorMessage("Some values in the 'Code IRIS' column contain non-numeric characters.");
            return;
          }

          if (irisValidateValues(parsedCsv) == "length"){
            showErrorMessage("Some values in the Code IRIS column are not properly formatted (should contain 9 digits).");
            return;
          }
        };
      };

      displayFileInformation(fileName)

      if (fileTypeToUpload == "CSV - Radius - lat/long"){

        clearPillsAndInput();

        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
          // Clear existing TTD screens
          clusterMarkers.clearLayers();
      
          const csv = reader.result;
          const dataFromSheet = Papa.parse(csv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
          }).data;

          radiusLatLongFunction(dataFromSheet);

          return new Promise((resolve) => {
            hideLoader();
            setForecastInfos()
            resolve();
          });
        };

      };

      if (fileTypeToUpload == "CSV - Radius - adresses"){

        clearPillsAndInput();

        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async function () {

          clusterMarkers.clearLayers();
        
          let csv = reader.result;
        
          let dataFromSheet = Papa.parse(csv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
          }).data;

          await radiusAdressesFunction(dataFromSheet)

          return new Promise((resolve) => {
            hideLoader()
            setForecastInfos()
            resolve();
          });
        };
      };

      if (fileTypeToUpload == "CSV - Polygons"){

        clearPillsAndInput();

        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {

          clusterMarkers.clearLayers();
        
          let csv = reader.result;
        
          let dataFromSheet = Papa.parse(csv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
          }).data;

          polygonFunction(dataFromSheet);

          return new Promise((resolve) => {
            hideLoader();
            setForecastInfos()
            resolve();
          });
        };
      };

      if (fileTypeToUpload == "CSV - IRIS (France only)"){

        clearPillsAndInput();

        readFile(file)
        
        async function irisCodesFunction(dataFromSheet) {
          let irisCodes = dataFromSheet.map((obj) => obj["Code IRIS"]);

          var addedPoints = new Set();
        
          let promises = irisCodes.map((code) =>
            fetch(
              `https://wxs.ign.fr/cartovecto/geoportail/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAME=STATISTICALUNITS.IRIS:contours_iris&COUNT=100000&OUTPUTFORMAT=application/json&CQL_FILTER=code_iris=${code}`
            ).then((response) => response.json())
          );
        
          let results = await Promise.all(promises);

          results.forEach((data) => {

            data.features[0].geometry.coordinates[0][0].map(point => {IrisSwapElements(point, 0, 1)})

            let polygon = L.polygon(data.features[0].geometry.coordinates[0][0]);

            polygon.addTo(layerDataFromSheet); // add it to the user data layer

            geoJsonLayer.eachLayer(function (layer) {

              let pointTurf = turf.point([
                layer.feature.geometry.coordinates[0],
                layer.feature.geometry.coordinates[1],
              ]);

              // using Turf.js to know if a TTD screen in inside the poygon

              let inside = turf.inside(pointTurf, polygon.toGeoJSON());

              if (inside) {
                addedPoints.add(layer);
              };

            });
          });

          addedPoints.forEach(screen => {
            clusterMarkers.addLayer(screen);
          });

        };

        async function readFile(file) {
          let reader = new FileReader();
          reader.readAsText(file);
        
          await new Promise((resolve) => {
            reader.onload = async function () {
              clusterMarkers.clearLayers();
              let csv = reader.result;
              let dataFromSheet = Papa.parse(csv, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
              }).data;
        
              await irisCodesFunction(dataFromSheet);
              setForecastInfos()
              resolve();
            };
          });
          hideLoader();
        };

      };

      setForecastInfos()

    } else {

      showErrorMessage("Uploaded file is not a CSV file.")

    };

  } else if (fileTypeToUpload.includes("Geojson")){

    if (fileName != "" && fileExtension == 'geojson') {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        const geojson = JSON.parse(reader.result);
        let isGeometryValid = true; // variable pour stocker l'état de validation
        if (geojson.type != "FeatureCollection") {
          showErrorMessage("Invalid GeoJSON file. The file must have a FeatureCollection type.");
          isGeometryValid = false; // la géométrie n'est pas valide
        } else if (fileTypeToUpload == "Geojson - Polygons") {
          geojson.features.forEach(polygon =>{
            if (polygon.geometry.type != "Polygon") {
              console.log(polygon.geometry.type)
              showErrorMessage("Invalid geometry type. Please provide Polygon geometries.");
              isGeometryValid = false; // la géométrie n'est pas valide
              return;
            }
          });
        } else if (fileTypeToUpload == "Geojson - MultiPolygons") {
          geojson.features.forEach(polygon =>{
            if (polygon.geometry.type != "MultiPolygon") {
              showErrorMessage("Invalid geometry type. Please provide MultiPolygon geometries.");
              isGeometryValid = false; // la géométrie n'est pas valide
              return;
            }
          });
        }
        if (isGeometryValid) { // exécute le reste du code si la géométrie est valide
          
          displayFileInformation(fileName)

          if (fileTypeToUpload == "Geojson - Polygons"){

            clearPillsAndInput();

            geojsonPolygonFunction(file);

          } else if (fileTypeToUpload == "Geojson - MultiPolygons") {

            clearPillsAndInput();

            geojsonMultiPolygonFunction(file);

          };
        };
      };

    } else {
      showErrorMessage("Uploaded file is not a geojson file.");
    };      
  };
};

function setForecastInfos(){

  selectedCPM = []

  clusterMarkers.eachLayer(layer => {

    selectedCPM.push(layer.feature.properties[`FloorCPM($)`]);

  })

  selectedScreenNumber.innerText = `${parseInt(clusterMarkers.getLayers().length).toLocaleString()} screens`;

  var cpmAverage = selectedCPM.reduce((acc, val) => acc + val, 0) / selectedCPM.length;

  selectedCPMNumber.innerText  = `${cpmAverage.toFixed(2)}$ CPM`;

};

/////////////////////////////////////////////////////

// TODO: Finish implementing upload loader function



function addValidationChecksToFileUpload(UploadElement,listener) {

  UploadElement.addEventListener(listener, async (event) => {

    showLoader();

    userGeojsonMultiPolygon.clearLayers();
    userGeojsonPolygon.clearLayers();
    layerDataFromSheet.clearLayers();

    await validationChecks(UploadElement,event);

  });
};

function showLoader(){
  loader.style.display = 'flex';
  console.log("ok showloader")
};

function hideLoader(){
  console.log("ok hideloader")
  loader.style.display = 'none';
};

/////////////////////////////////////////////////////

///////////// Ad type checkboxes management /////////

var adTypeCheckboxes = document.querySelectorAll('.checkbox');

function updateSelectedText() {
  const checkedCheckboxes = Array.from(adTypeCheckboxes).filter((checkbox) => checkbox.checked);
  if (checkedCheckboxes.length === 0) {
    selectedAdTypeInput.textContent = 'Select ad type';
  } else if (checkedCheckboxes.length === 1) {
    selectedAdTypeInput.textContent = `1 item selected`;
  } else {
    selectedAdTypeInput.textContent = `${checkedCheckboxes.length} items selected`;
  }
}

// Ajout d'un écouteur d'événement sur chaque case à cocher
adTypeCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', updateSelectedText);
});

/////////////////////////////////////////////////////

addValidationChecksToFileUpload(fileInput,"change");
addValidationChecksToFileUpload(fileUpload,"drop");

fileUpload.addEventListener("dragover", function(event) {
  event.preventDefault();
  this.value = null; // réinitialiser l'élément <input> avant chaque téléchargement
});

function deleteSelectedFile() {
  fileInput.value = '';
  uploadedFileSection.style.display = 'none';
  uploadedFileName.textContent = '';
};

deleteFileBtn.addEventListener('click', () => {
  
  deleteSelectedFile();

  userGeojsonMultiPolygon.clearLayers();
  userGeojsonPolygon.clearLayers();
  layerDataFromSheet.clearLayers();

  clusterMarkers.addLayer(geoJsonLayer);

  setInitialView();

  setForecastInfos();

});

function createPlacesObject(){

  const placesObject = {
    City: [],
    Country: [],
    Zipcode: [],
    Region: [],
  };

  for (let i = 0; i < placesPills.children.length - 1; i++) {
    const div = placesPills.children[i];
    const group = div.getAttribute('data-property');
    if (group in placesObject) {
      placesObject[group].push(div.innerText);
    } 
  };

  return placesObject;

};

function createVenuetypeObject(){

  const venueTypeObject = {
    "Venue Type": []
  };

  for (let i = 0; i < venueTypePills.children.length - 1; i++) {
    const div = venueTypePills.children[i];
    venueTypeObject["Venue Type"].push(div.innerText);
  };

  return venueTypeObject;

};

function createPartnersObject(){

  const partnersObject = {
    SSP: [],
    "Publisher Name": [],
  };

  for (let i = 0; i < partnersPills.children.length - 1; i++) {
    const div = partnersPills.children[i];
    const group = div.getAttribute('data-property');
    if (group in partnersObject) {
      partnersObject[group].push(div.innerText);
    } 
  };

  return partnersObject;

};

function createAdTypeObject(){

  const adTypeObject = {
    Video: "0",
    Static: "0",
    HTML5: "0",
  };

  (videoCheckbox.checked == true) && (adTypeObject["Video"] = 1);
  (displayCheckbox.checked == true) && (adTypeObject["Static"] = 1);
  (htmlCheckbox.checked == true) && (adTypeObject["HTML5"] = 1);

  return adTypeObject;

};

function createSpecificationsObject(){

  const specificationsObject = {
    "Width x Height": []
  };

  for (let i = 0; i < specificationsPills.children.length - 1; i++) {
    const div = specificationsPills.children[i];
    specificationsObject["Width x Height"].push(div.innerText);
  };

  return specificationsObject;

};

///////////////////////////////////////////////////////////

function applyFilter(){
    
  clusterMarkers.clearLayers();

  var placesObject = createPlacesObject();
  var venueTypeObject = createVenuetypeObject();
  var partnersObject = createPartnersObject();
  var adTypeObject = createAdTypeObject();
  var specificationsObject = createSpecificationsObject();

  if (userGeojsonMultiPolygon.getLayers().length > 0 || userGeojsonPolygon.getLayers().length > 0 || layerDataFromSheet.getLayers().length > 0){

    userGeojsonMultiPolygon.clearLayers();
    userGeojsonPolygon.clearLayers();
    layerDataFromSheet.clearLayers();

    setInitialView();
    deleteSelectedFile();

  };

  if (placesObject["City"].length == 0
  && placesObject["Country"].length == 0
  && placesObject["Zipcode"].length == 0
  && placesObject["Region"].length == 0
  && venueTypeObject["Venue Type"].length == 0
  && partnersObject["SSP"].length == 0
  && partnersObject["Publisher Name"].length == 0
  && minCPMInput.value == ""
  && maxCPMInput.value == ""
  && selectedAdTypeInput.innerText == "Select ad type"
  && specificationsObject["Width x Height"].length == 0
  && spotLengthInput.value == ""){
    clusterMarkers.addLayer(geoJsonLayer);
    setInitialView();
    setForecastInfos()
    return;
  };

  var addedPoints = [];

  geoJsonLayer.eachLayer(function (layer) {

    var isPointOK = true;

    if (placesObject["City"].length != 0 || placesObject["Country"].length != 0 || placesObject["Zipcode"].length != 0 || placesObject["Region"].length != 0){
      
      if (placesObject["City"].every(element => element.toLowerCase() != layer.feature.properties[`City`].toLowerCase())
      && placesObject["Country"].every(element => element.toLowerCase() != layer.feature.properties[`Country`].toLowerCase())
      && placesObject["Zipcode"].every(element => element != layer.feature.properties[`Zipcode`])
      && placesObject["Region"].every(element => element.toLowerCase() != layer.feature.properties[`Region`].toLowerCase())) {
        isPointOK = false;
        return;
      };
    };

    if (venueTypeObject["Venue Type"].length != 0){

      if (venueTypeObject["Venue Type"].every(element => element.toLowerCase() != layer.feature.properties["Venue Type"].toLowerCase())){
        isPointOK = false;
        return;
      };

    };

    if (partnersObject["SSP"].length != 0 || partnersObject["Publisher Name"].length != 0){

      if (partnersObject["SSP"].every(element => element.toLowerCase() != layer.feature.properties[`SSP`].toLowerCase())
      && partnersObject["Publisher Name"].every(element => element.toLowerCase() != layer.feature.properties[`Publisher Name`].toLowerCase())){
        isPointOK = false;
        return;
      };
    };

    if (minCPMInput.value != "" || maxCPMInput.value != ""){
      if (minCPMInput.value != "" && maxCPMInput.value == ""){
        if (parseFloat(minCPMInput.value) >= layer.feature.properties[`FloorCPM($)`]){
          isPointOK = false;
          return;
        };
      } else if (minCPMInput.value == "" && maxCPMInput.value != ""){
        if (parseFloat(maxCPMInput.value) <= layer.feature.properties[`FloorCPM($)`]){
          isPointOK = false;
          return;
        };
      } else {

        if (!(parseFloat(minCPMInput.value) <= layer.feature.properties[`FloorCPM($)`]
        &&  parseFloat(maxCPMInput.value) >= layer.feature.properties[`FloorCPM($)`])){
          isPointOK = false;
          return;
        };
      };
    };

    if (videoCheckbox.checked == true
    || displayCheckbox.checked == true
    || htmlCheckbox.checked == true){

      if (!(adTypeObject["HTML5"] == "1" && layer.feature.properties[`Allowed Ad Types: HTML`] == "1"
      || adTypeObject["Static"] == "1" && layer.feature.properties[`Allowed Ad Types: Static`] == "1"
      || adTypeObject["Video"] == "1" && layer.feature.properties[`Allowed Ad Types: Video`] == "1")){
        isPointOK = false;
        return;
      };
    };

    if (specificationsObject["Width x Height"].length != 0){

      if (specificationsObject["Width x Height"].every(element => element.toLowerCase() != layer.feature.properties["Width x Height"].toLowerCase())){
        isPointOK = false;
        return;
      };

    };

    if (spotLengthInput.value != ""){

      if (!(parseFloat(spotLengthInput.value) >= layer.feature.properties["Min Ad Duration"]
      && parseFloat(spotLengthInput.value) <= layer.feature.properties["Max Ad Duration"])){
        isPointOK = false;
        return;
      };

    };

    (isPointOK == true) && (addedPoints.push(layer));

  });

  addedPoints.forEach(point => {
    clusterMarkers.addLayer(point);
  });

  setForecastInfos()

};

function checkInput(input) {
  if (input.value < 0) {
    input.value = 0;
  };
};

const filterObserver = new MutationObserver(() => {

  applyFilter();

});

filterObserver.observe(placesPills, { childList: true });
filterObserver.observe(venueTypePills, { childList: true });
filterObserver.observe(partnersPills, { childList: true });
filterObserver.observe(specificationsPills, { childList: true });

minCPMInput.addEventListener("change", () => {
  applyFilter();
})
maxCPMInput.addEventListener("change", () => {
  applyFilter();
})
videoCheckbox.addEventListener("change", () => {
  applyFilter();
})
displayCheckbox.addEventListener("change", () => {
  applyFilter();
})
htmlCheckbox.addEventListener("change", () => {
  applyFilter();
})
spotLengthInput.addEventListener("change", () => {
  applyFilter();
})

clearFilterButton.addEventListener("click", () => {

  clearPillsAndInput()

  applyFilter();

  deleteSelectedFile();

  setInitialView();

  setForecastInfos();

  errorContainer.style.display = "none";

})

function clearPillsAndInput(){
  ClearPills(placesPills);
  ClearPills(venueTypePills);
  ClearPills(partnersPills);
  ClearPills(specificationsPills);
  minCPMInput.value = "";
  maxCPMInput.value = "";
  spotLengthInput.value = "";
  videoCheckbox.checked = false;
  displayCheckbox.checked = false;
  htmlCheckbox.checked = false;
  selectedAdTypeInput.textContent = 'Select ad type';
}

// Init leaflet elements : map / tilelayer / TTD screens / points or polygones of user :

const map = L.map("map", { zoomControl: false }).setView(
  // init map
  [46.687697408786136, -1.5568386275056127],
  6
);

function setInitialView(){
  map.setView(
    [46.687697408786136, -1.5568386275056127],
    6
  );
};

const osm = L.tileLayer(
  // osm is the map layer. More examples here : https://leaflet-extras.github.io/leaflet-providers/preview/
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
  { maxZoom: 19 }
);

const geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#FC5D1F",
  color: "#FC5D1F",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const userGeojsonMultiPolygon = L.geoJSON();
const userGeojsonPolygon = L.geoJSON();
const layerDataFromSheet = L.layerGroup();
const geoJsonLayer = L.geoJSON(data, {
  onEachFeature: popUpStyle,
  pointToLayer: pointToLayer,
});

selectedScreenNumber.innerText = `${parseInt(geoJsonLayer.getLayers().length).toLocaleString()} screens`;

selectedCPM = [];

geoJsonLayer.eachLayer(layer => {
  selectedCPM.push(layer.feature.properties[`FloorCPM($)`]);
})

var cpmAverage = selectedCPM.reduce((acc, val) => acc + val, 0) / selectedCPM.length;

selectedCPMNumber.innerText  = `${cpmAverage.toFixed(2)}$ CPM`;

const clusterMarkers = L.markerClusterGroup({
  // create cluster object (with MarkerCluster.js) for TTD screens in order to optimize rendering

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
    "<tr><td> FloorCPM($) </td><td>" +
    feature.properties["FloorCPM($)"] +
    "</td></tr>" +
    "<tr><td> Venue Type </td><td>" +
    feature.properties["Venue Type"] +
    "</td></tr>" +
    "<tr><td> Dimensions </td><td>" +
    `${feature.properties["Screen width (px)"]}x${feature.properties["Screen height (px)"]}`;

  layer.bindPopup(popupContent);
}

function pointToLayer(feature, latlng) {
  return L.circleMarker(latlng, geojsonMarkerOptions);
}

map.addLayer(layerDataFromSheet);
map.addLayer(userGeojsonMultiPolygon);
map.addLayer(userGeojsonPolygon);
map.addLayer(osm);
clusterMarkers.addLayer(geoJsonLayer);
map.addLayer(clusterMarkers);

//  Download csv button (bottom right of the window)

exportData.addEventListener("click", function () {
  var objectToCsv = [];

  clusterMarkers.eachLayer(function (layer) {
    var pointToCsv = {};
    // all elements that appear in the downloaded csv file
    pointToCsv["Longitude"] = layer.feature.geometry.coordinates[0];
    pointToCsv["Latitude"] = layer.feature.geometry.coordinates[1];
    pointToCsv["SSP"] = layer.feature.properties.SSP;
    pointToCsv["Publisher"] = layer.feature.properties["Publisher Name"];
    pointToCsv["Screen ID"] = layer.feature.properties["Screen ID"];
    pointToCsv["Width x Height"] = layer.feature.properties["Width x Height"];
    pointToCsv["Country"] = layer.feature.properties["Country"];
    pointToCsv["Region"] = layer.feature.properties["Region"];
    pointToCsv["City"] = layer.feature.properties["City"];
    pointToCsv["Zipcode"] = layer.feature.properties["Zipcode"];
    pointToCsv["Venue Type"] = layer.feature.properties["Venue Type"];
    pointToCsv["Screen width (px)"] = layer.feature.properties["Screen width (px)"];
    pointToCsv["Screen height (px)"] = layer.feature.properties["Screen height (px)"];
    pointToCsv["Min Ad Duration"] = layer.feature.properties["Min Ad Duration"];
    pointToCsv["Max Ad Duration"] = layer.feature.properties["Max Ad Duration"];
    pointToCsv["FloorCPM($)"] = layer.feature.properties["FloorCPM($)"];
    pointToCsv["Avg Weekly Impressions"] = layer.feature.properties["Avg Weekly Impressions"];
    pointToCsv["Venue Type"] = layer.feature.properties["Venue Type"];
    pointToCsv["Allowed Ad Types: HTML"] = layer.feature.properties["Allowed Ad Types: HTML"];
    pointToCsv["Allowed Ad Types: Static"] = layer.feature.properties["Allowed Ad Types: Static"];
    pointToCsv["Allowed Ad Types: Video"] = layer.feature.properties["Allowed Ad Types: Video"];

    objectToCsv.push(pointToCsv);
  });
  const data = Papa.unparse(objectToCsv);
  const csv = "data:text/csv;charset=utf-8," + encodeURI(data);
  const link = document.createElement("a");
  link.setAttribute("href", csv);
  link.setAttribute("download", "screens_data.csv");
  link.click();
});

function radiusLatLongFunction(data) {

  let turfDistanceOptions = { units: "meters" };
  var addedPoints = new Set();

  data.forEach((point) => {
    console.log(point)
    L.marker([point.Latitude, point.Longitude]).addTo(layerDataFromSheet);
    L.circle([point.Latitude, point.Longitude], {
      radius: point["Radius (meters)"],
      fillColor: "blue",
      fillOpacity: 0.1,
    }).addTo(layerDataFromSheet);

    let pointTurfFrom = turf.point([point.Latitude, point.Longitude]);

    // asking for each TTD screens if the distance between with csv point is smaller than radius.

    geoJsonLayer.eachLayer(function (layer) {
      // geoJSONLayer -->  TTD screens
      let pointTurfTo = turf.point([
        layer.feature.geometry.coordinates[1],
        layer.feature.geometry.coordinates[0],
      ]);

      // use Turf.js to calculate distance between the points.

      let distance = turf.distance(
        pointTurfFrom,
        pointTurfTo,
        turfDistanceOptions
      );

      // if distance smaller than radius AND not present in already added points --> add TTD screens to ClusterMarkers layer

      if (distance < point["Radius (meters)"] && !addedPoints.has(layer)) {
        clusterMarkers.addLayer(layer);
        addedPoints.add(layer); // add TTD screens to added points
      };
    });
  });
};


async function radiusAdressesFunction(dataFromSheet){

  let markersToDisplay = [];

  let addedPoints = new Set();

  for (let address of dataFromSheet) {
    let addressLine = `${address["Street address"]}, ${address["ZIP code"]}, ${address["City"]}, ${address["Country"]}`
    let apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${addressLine}&key=${opencageApiKey}`;

    let response = await fetch(apiUrl);
    let data = await response.json();

    let addressGPSLatLong = data.results[0].geometry;

    let pointTurfFrom = turf.point([addressGPSLatLong.lat, addressGPSLatLong.lng]);

    geoJsonLayer.eachLayer(function (layer) {
      
      let pointTurfTo = turf.point([layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0]]);
      let distance = turf.distance(pointTurfFrom, pointTurfTo, { units: "meters" });

      if (distance < address["Radius (meters)"] && !addedPoints.has(layer)) {
        addedPoints.add(layer);
      };
    });

    let marker = L.marker([addressGPSLatLong.lat, addressGPSLatLong.lng]);
    let circle = L.circle([addressGPSLatLong.lat, addressGPSLatLong.lng], {
      radius: address["Radius (meters)"],
      fillColor: "blue",
      fillOpacity: 0.1,
    });

    markersToDisplay.push(marker, circle);

  };

  layerDataFromSheet.addLayer(L.layerGroup(markersToDisplay));

  addedPoints.forEach(screen => {
    clusterMarkers.addLayer(screen);
  })

};


function polygonFunction(dataFromSheet) {

  let dataFromSheetWithoutName = dataFromSheet.map(obj => {
    delete obj["Name"];
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && (obj[key] === '' || obj[key] === null || obj[key] === undefined)) {
        delete obj[key];
      };
    };
    return obj;
  });

  var addedPoints = new Set();

  dataFromSheetWithoutName.forEach((point) => {

    let arrayofGPSpoints = [];

    // for each line of the csv (polygon), split different points in an array. Each element of the array is an array of lat/long.

    for (let [key, value] of Object.entries(point)) {
      if (key.startsWith("Latitude")) {
        let index = parseInt(key.slice(-3));
        if (isNaN(index)) {
          index = parseInt(key.slice(-2));
          if (isNaN(index)) {
            index = parseInt(key.slice(-1));
          }
        }
        arrayofGPSpoints[index - 1] = arrayofGPSpoints[index - 1] || [];
        arrayofGPSpoints[index - 1].unshift(value);
      } else if (key.startsWith("Longitude")) {
        let index = parseInt(key.slice(-3));
        if (isNaN(index)) {
          index = parseInt(key.slice(-2));
          if (isNaN(index)) {
            index = parseInt(key.slice(-1));
          }
        }
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

    let polygon = L.polygon(arrayofGPSpoints);

    polygon.addTo(layerDataFromSheet); // add it to the user data layer

    // asking for each TTD screen...

    geoJsonLayer.eachLayer(function (layer) {
      let pointTurf = turf.point([
        layer.feature.geometry.coordinates[0],
        layer.feature.geometry.coordinates[1],
      ]);

      // using Turf.js to know if a TTD screen in inside the poygon

      let inside = turf.inside(pointTurf, polygon.toGeoJSON());

      if (inside) {
        addedPoints.add(layer);
      }
    });
  });

  addedPoints.forEach(screen => {
    clusterMarkers.addLayer(screen);
  });

};

function geojsonPolygonFunction(file){

  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function (){
    var polygon = JSON.parse(reader.result);

    clusterMarkers.eachLayer(function (layer) {
      clusterMarkers.removeLayer(layer);
    });

    userGeojsonPolygon.addData(polygon);

    userGeojsonPolygon.eachLayer(polygon => {

      var turfPolygon = turf.polygon(polygon.feature.geometry.coordinates)

      var addedPoints = new Set();

      geoJsonLayer.eachLayer(function (layer) {

        var pointTurf = turf.point([
          layer.feature.geometry.coordinates[0],
          layer.feature.geometry.coordinates[1],
        ]);

        var inside = turf.inside(pointTurf, turfPolygon);
    
        if (inside && !addedPoints.has(layer)) {
          clusterMarkers.addLayer(layer);
          addedPoints.add(layer);
        };
      });
    });

    return new Promise((resolve) => {
      hideLoader();
      setForecastInfos()
      resolve();
    });

  };
};

function geojsonMultiPolygonFunction(file){

  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function (){
    var MultiPolygon = JSON.parse(reader.result);

    clusterMarkers.eachLayer(function (layer) {
      clusterMarkers.removeLayer(layer);
    });

    userGeojsonMultiPolygon.addData(MultiPolygon);

    userGeojsonMultiPolygon.eachLayer(multipolygon => {

      var turfMultipolygon = turf.multiPolygon(multipolygon.feature.geometry.coordinates)

      var addedPoints = new Set();

      geoJsonLayer.eachLayer(function (layer) {

        var pointTurf = turf.point([
          layer.feature.geometry.coordinates[0],
          layer.feature.geometry.coordinates[1],
        ]);

        var inside = turf.inside(pointTurf, turfMultipolygon);
    
        if (inside && !addedPoints.has(layer)) {
          clusterMarkers.addLayer(layer);
          addedPoints.add(layer);
        };
      });
    });

    return new Promise((resolve) => {
      hideLoader();
      setForecastInfos()
      resolve();
    });

  };
};

function IrisSwapElements(array, index1, index2) {
  // Stocke la valeur de l'élément à l'index1 dans une variable temporaire
  let temp = array[index1];

  // Échange la valeur de l'élément à l'index1 avec celle de l'élément à l'index2
  array[index1] = array[index2];
  array[index2] = temp;

  // Retourne le tableau modifié
  return array;
}

function displayFileInformation(fileName){

  uploadedFileName.textContent = fileName;
  uploadedFileSection.style.display = 'block';
  errorContainer.style.display = "none";

};

async function ShowFileUploadError(message){

  errorContainer.style.display = "flex";
  uploadedFileSection.style.display = 'none';
  errorMessage.innerText = message;

  await clusterMarkers.addLayer(geoJsonLayer);

}
