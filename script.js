function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode >= 48 && charCode <= 57) || charCode == 46 || charCode == 8) {
      return true;
    }
    return false;
  }
  
// For checkboxes that allow multiple selections
document.querySelectorAll('.checked-multiple').forEach(function(checkbox) {
    // No special logic needed here; users can select multiple boxes freely
});

// For checkboxes that should be exclusive within their group
document.querySelectorAll('.checked').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            // When a checkbox is checked, uncheck all others in the same group
            document.querySelectorAll('.checked').forEach(function(other) {
                if (other !== checkbox) {
                    other.checked = false;
                }
            });
        }
    });
});

  
  let totalUnits = 0;


  document.addEventListener('DOMContentLoaded', function() {
    // Directly hide all tabcontent elements
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Directly set the "Manure" content to be visible
    document.querySelector(".manure").style.display = "block";

    // Remove active class from all tablinks and then add it to the "Manure" tab
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Assuming the "Manure" tab button is the first tablinks element,
    // or find the correct index or way to select the "Manure" button if it's not
    var manureTab = document.querySelector("[onclick*='manure']");
    if (manureTab) {
        manureTab.className += " active";
    }
});
function openMethod(evt, methodName) {
    // Hide all tabcontent elements
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove "active" class from all tabs
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the clicked tab's content and add "active" class to the clicked tab
    document.querySelector("." + methodName).style.display = "block";
    evt.currentTarget.classList.add("active");

    document.getElementById('totalUnitsResult').textContent = "MTCO₂e"; // Reset to default or clear
    document.getElementById('grazingtotalUnitsResult').textContent = "MTCO₂e"; // Reset to default or clear
    document.getElementById('vehiclesResult').textContent = ""; // Clear the vehicles equivalent
    document.getElementById('milesResult').textContent = ""; // Clear the miles driven equivalent
    document.getElementById('smartphonesResult').textContent = ""; // Clear the smartphones charged equivalent
    document.getElementById('grazingvehiclesResult').textContent = ""; // Clear the vehicles equivalent
    document.getElementById('grazingmilesResult').textContent = ""; // Clear the miles driven equivalent
    document.getElementById('grazingsmartphonesResult').textContent = ""; // Clear the smartphones charged equivalent
}




function calculateReductions() {
  
    // Retrieve values from the input fields
    let cowNumber = parseFloat(document.getElementById('cowNumber').value) || 0;
    let monthsPasture = parseFloat(document.getElementById('monthsPasture').value) || 0;
    let methodSelected = document.getElementById('methodSelection').value;
    let acres = parseFloat(document.getElementById('acres').value) || 0;


    // Compost Bedded Pack Barn
    let compostFlushA = 4.89;
    let compostFlushB = 0.408;

    let compostResultFlush = (compostFlushA * cowNumber) - (compostFlushB * cowNumber * monthsPasture)

    let compostScrapeA = 6.677;
    let compostScrapeB = 0.556;

    let compostResultScrape = (compostScrapeA * cowNumber) - (compostScrapeB * cowNumber * monthsPasture)

    // Weeping Wall Flush
    let weepingSolidStorageFlushA = 11.714;
    let weepingInVesselFlushA = 0;
    let weepingWindrowFlushA = 0;

    let weepingSolidStorageFlushB = 0.976;
    let weepingInVesselFlushB = 0;
    let weepingWindrowFlushB = 0;

    let weepingResultFlush1 = (weepingSolidStorageFlushA * cowNumber) - (weepingSolidStorageFlushB * cowNumber * monthsPasture);
    let weepingResultFlush2 = (weepingInVesselFlushA * cowNumber) - (weepingInVesselFlushB * cowNumber * monthsPasture);
    let weepingResultFlush3 = (weepingWindrowFlushA * cowNumber) - (weepingWindrowFlushB * cowNumber * monthsPasture);


    // Weeping Wall Scrape
    let weepingSolidStorageScrapeA = -0.169;
    let weepingInVesselScrapeA = 0;
    let weepingWindrowScrapeA = 0;

    let weepingSolidStorageScrapeB = 6.677;
    let weepingInVesselScrapeB = 0;
    let weepingWindrowScrapeB = 0;


    let weepingResultScrape1 = (weepingSolidStorageScrapeA * cowNumber) - (weepingSolidStorageScrapeB * cowNumber * monthsPasture);
    let weepingResultScrape2 = (weepingInVesselScrapeA * cowNumber) - (weepingInVesselScrapeB * cowNumber * monthsPasture);
    let weepingResultScrape3 = (weepingWindrowScrapeA * cowNumber) - (weepingWindrowScrapeB * cowNumber * monthsPasture);

    // Stationary Screen Flush
    let stationarySolidStorageFlushA = 7.904;
    let stationaryInVesselFlushA = 0.486;
    let stationaryWindrowFlushA = 0.416;

    let stationarySolidStorageFlushB = 0.659;
    let stationaryInVesselFlushB = 0.041;
    let stationaryWindrowFlushB = 0.035;

    let stationaryResultFlush1 = (stationarySolidStorageFlushA * cowNumber) - (stationarySolidStorageFlushB * cowNumber * monthsPasture);
    let stationaryResultFlush2 = (stationaryInVesselFlushA * cowNumber) - (stationaryInVesselFlushB * cowNumber * monthsPasture);
    let stationaryResultFlush3 = (stationaryWindrowFlushA * cowNumber) - (stationaryWindrowFlushB * cowNumber * monthsPasture);


    // Stationary Screen Scrape

    let stationarySolidStorageScrapeA = 5.261;
    let stationaryInVesselScrapeA = 1.416;
    let stationaryWindrowScrapeA = 1.214;

    let stationarySolidStorageScrapeB = 0.438;
    let stationaryInVesselScrapeB = 0.118;
    let stationaryWindrowScrapeB = 0.101;

    let stationaryResultScrape1 = (stationarySolidStorageScrapeA * cowNumber) - (stationarySolidStorageScrapeB * cowNumber * monthsPasture);
    let stationaryResultScrape2 = (stationaryInVesselScrapeA * cowNumber) - (stationaryInVesselScrapeB * cowNumber * monthsPasture);
    let stationaryResultScrape3 = (stationaryWindrowScrapeA * cowNumber) - (stationaryWindrowScrapeB * cowNumber * monthsPasture);

    // Vibrating Screen Flush
    let vibratingSolidStorageFlushA = 3.952;
    let vibratingInVesselFlushA = 0.243;
    let vibratingWindrowFlushA = 0.208;

    let vibratingSolidStorageFlushB = 0.329;
    let vibratingInVesselFlushB = 0.020;
    let vibratingWindrowFlushB = 0.017;

    let vibratingResultFlush1 = (vibratingSolidStorageFlushA * cowNumber) - (vibratingSolidStorageFlushB * cowNumber * monthsPasture);
    let vibratingResultFlush2 = (vibratingInVesselFlushA * cowNumber) - (vibratingInVesselFlushB * cowNumber * monthsPasture);
    let vibratingResultFlush3 = (vibratingWindrowFlushA * cowNumber) - (vibratingWindrowFlushB * cowNumber * monthsPasture);

    // Vibrating Screen Scrape
    let vibratingSolidStorageScrapeA = 5.261;
    let vibratingInVesselScrapeA = 1.416;
    let vibratingWindrowScrapeA = 1.214;

    let vibratingSolidStorageScrapeB = 0.438;
    let vibratingInVesselScrapeB = 1.118;
    let vibratingWindrowScrapeB = 1.101;

    let vibratingResultScrape1 = (vibratingSolidStorageScrapeA * cowNumber) - (vibratingSolidStorageScrapeB * cowNumber * monthsPasture);
    let vibratingResultScrape2 = (vibratingInVesselScrapeA * cowNumber) - (vibratingInVesselScrapeB * cowNumber * monthsPasture);
    let vibratingResultScrape3 = (vibratingWindrowScrapeA * cowNumber) - (vibratingWindrowScrapeB * cowNumber * monthsPasture);

    // Screw Press Flush
    let screwSolidStorageFlushA = 6.587;
    let screwInVesselFlushA = 0.404;
    let screwWindrowFlushA = 0.346;

    let screwSolidStorageFlushB = 0.549;
    let screwInVesselFlushB = 0.034;
    let screwWindrowFlushB = 0.029;

    let screwResultFlush1 = (screwSolidStorageFlushA * cowNumber) - (screwSolidStorageFlushB * cowNumber * monthsPasture);
    let screwResultFlush2 = (screwInVesselFlushA * cowNumber) - (screwInVesselFlushB * cowNumber * monthsPasture);
    let screwResultFlush3 = (screwWindrowFlushA * cowNumber) - (screwWindrowFlushB * cowNumber * monthsPasture);

    // Screw Press Scrape
    let screwSolidStorageScrapeA = 5.261;
    let screwInVesselScrapeA = 1.416;
    let screwWindrowScrapeA = 1.214;

    let screwSolidStorageScrapeB = 0.438;
    let screwInVesselScrapeB = 0.118;
    let screwWindrowScrapeB = 0.101;

    let screwResultScrape1 = (screwSolidStorageScrapeA * cowNumber) - (screwSolidStorageScrapeB * cowNumber * monthsPasture);
    let screwResultScrape2 = (screwInVesselScrapeA * cowNumber) - (screwInVesselScrapeB * cowNumber * monthsPasture);
    let screwResultScrape3 = (screwWindrowScrapeA * cowNumber) - (screwWindrowScrapeB * cowNumber * monthsPasture);

    // Centrifuge Flush
    let centrifugeSolidStorageFlushA = 13.173;
    let centrifugeInVesselFlushA = 0.81;
    let centrifugeWindrowFlushA = 0.694;

    let centrifugeSolidStorageFlushB = 1.098;
    let centrifugeInVesselFlushB = 0.068;
    let centrifugeWindrowFlushB = 0.058;

    let centrifugeResultFlush1 = (centrifugeSolidStorageFlushA * cowNumber) - (centrifugeSolidStorageFlushB * cowNumber * monthsPasture);
    let centrifugeResultFlush2 = (centrifugeInVesselFlushA * cowNumber) - (centrifugeInVesselFlushB * cowNumber * monthsPasture);
    let centrifugeResultFlush3 = (centrifugeWindrowFlushA * cowNumber) - (centrifugeWindrowFlushB * cowNumber * monthsPasture);


    // Centrifuge Scrape
    let centrifugeSolidStorageScrapeA = 5.261;
    let centrifugeInVesselScrapeA = 1.416;
    let centrifugeWindrowScrapeA = 1.214;

    let centrifugeSolidStorageScrapeB = 0.438;
    let centrifugeInVesselScrapeB = 0.118;
    let centrifugeWindrowScrapeB = 0.101;

    let centrifugeResultScrape1 = (centrifugeSolidStorageScrapeA * cowNumber) - (centrifugeSolidStorageScrapeB * cowNumber * monthsPasture);
    let centrifugeResultScrape2 = (centrifugeInVesselScrapeA * cowNumber) - (centrifugeInVesselScrapeB * cowNumber * monthsPasture);
    let centrifugeResultScrape3 = (centrifugeWindrowScrapeA * cowNumber) - (centrifugeWindrowScrapeB * cowNumber * monthsPasture);

    // Roller Drum Flush
    let rollerSolidStorageFlushA = 6.587;
    let rollerInVesselFlushA = 0.404;
    let rollerWindrowFlushA = 0.346;

    let rollerSolidStorageFlushB = 0.549;
    let rollerInVesselFlushB = 0.034;
    let rollerWindrowFlushB = 0.029;

    let rollerResultFlush1 = (rollerSolidStorageFlushA * cowNumber) - (rollerSolidStorageFlushB * cowNumber * monthsPasture);
    let rollerResultFlush2 = (rollerInVesselFlushA * cowNumber) - (rollerInVesselFlushB * cowNumber * monthsPasture);
    let rollerResultFlush3 = (rollerWindrowFlushA * cowNumber) - (rollerWindrowFlushB * cowNumber * monthsPasture);

    //Roller Drum Scrape
    let rollerSolidStorageScrapeA = 5.261;
    let rollerInVesselScrapeA = 1.416;
    let rollerWindrowScrapeA = 1.214;

    let rollerSolidStorageScrapeB = 0.438;
    let rollerInVesselScrapeB = 0.118;
    let rollerWindrowScrapeB = 0.101;

    let rollerResultScrape1 = (rollerSolidStorageScrapeA * cowNumber) - (rollerSolidStorageScrapeB * cowNumber * monthsPasture);
    let rollerResultScrape2 = (rollerInVesselScrapeA * cowNumber) - (rollerInVesselScrapeB * cowNumber * monthsPasture);
    let rollerResultScrape3 = (rollerWindrowScrapeA * cowNumber) - (rollerWindrowScrapeB * cowNumber * monthsPasture);

    // Belt Press Flush
    let beltSolidStorageFlushA = 13.173;
    let beltInVesselFlushA = 0.81;
    let beltWindrowFlushA = 0.694;

    let beltSolidStorageFlushB = 1.098;
    let beltInVesselFlushB = 0.068;
    let beltWindrowFlushB = 0.058;

    let beltResultFlush1 = (beltSolidStorageFlushA * cowNumber) - (beltSolidStorageFlushB * cowNumber * monthsPasture);
    let beltResultFlush2 = (beltInVesselFlushA * cowNumber) - (beltInVesselFlushB * cowNumber * monthsPasture);
    let beltResultFlush3 = (beltWindrowFlushA * cowNumber) - (beltWindrowFlushB * cowNumber * monthsPasture);

    // Belt Press Scrape
    let beltSolidStorageScrapeA = 5.261;
    let beltInVesselScrapeA = 1.416;
    let beltWindrowScrapeA = 1.214;

    let beltSolidStorageScrapeB = 0.438;
    let beltInVesselScrapeB = 0.118;
    let beltWindrowScrapeB = 0.101;

    let beltResultScrape1 = (beltSolidStorageScrapeA * cowNumber) - (beltSolidStorageScrapeB * cowNumber * monthsPasture);
    let beltResultScrape2 = (beltInVesselScrapeA * cowNumber) - (beltInVesselScrapeB * cowNumber * monthsPasture);
    let beltResultScrape3 = (beltWindrowScrapeA * cowNumber) - (beltWindrowScrapeB * cowNumber * monthsPasture);

      // Conversion from Flush to Scrape
      let conversionSolidStorageFlushA = 23.397;
      let conversionInVesselFlushA = 24.814;
      let conversionWindrowFlushA = 24.611;

      let conversionSolidStorageFlushB = 1.950;
      let conversionInVesselFlushB = 2.068;
      let conversionWindrowFlushB = 2.051;

      let conversionResultFlush1 = (conversionSolidStorageFlushA * cowNumber) - (conversionSolidStorageFlushB * cowNumber * monthsPasture);
      let conversionResultFlush2 = (conversionInVesselFlushA * cowNumber) - (conversionInVesselFlushB * cowNumber * monthsPasture);
      let conversionResultFlush3 = (conversionWindrowFlushA * cowNumber) - (conversionWindrowFlushB * cowNumber * monthsPasture);

    //  Conversion from Flush to Scrape
    let conversionSolidStorageScrapeA = 0;
    let conversionInVesselScrapeA = 0;
    let conversionWindrowScrapeA = 0;

    let conversionSolidStorageScrapeB = 0;
    let conversionInVesselScrapeB = 0;
    let conversionWindrowScrapeB = 0;

    let conversionResultScrape1 = (conversionSolidStorageScrapeA * cowNumber) - (conversionSolidStorageScrapeB * cowNumber * monthsPasture);
    let conversionResultScrape2 = (conversionInVesselScrapeA * cowNumber) - (conversionInVesselScrapeB * cowNumber * monthsPasture);
    let conversionResultScrape3 = (conversionWindrowScrapeA * cowNumber) - (conversionWindrowScrapeB * cowNumber * monthsPasture);

    
    // Display the result
    let compostChecked = document.getElementById('compost').checked;

    
    let weepingSolidStorageChecked = document.getElementById('weepingSolidStorage').checked;
    let weepingInVesselChecked = document.getElementById('weepingInVessel').checked;
    let weepingWindrowChecked = document.getElementById('weepingWindrow').checked;

    let stationarySolidStorageChecked = document.getElementById('stationarySolidStorage').checked;
    let stationaryInVesselChecked = document.getElementById('stationaryInVessel').checked;
    let stationaryWindrowChecked = document.getElementById('stationaryWindrow').checked;

    let vibratingSolidStorageChecked = document.getElementById('vibratingSolidStorage').checked;
    let vibratingInVesselChecked = document.getElementById('vibratingInVessel').checked;
    let vibratingWindrowChecked = document.getElementById('vibratingWindrow').checked;

    let screwSolidStorageChecked = document.getElementById('screwSolidStorage').checked;
    let screwInVesselChecked = document.getElementById('screwInVessel').checked;
    let screwWindrowChecked = document.getElementById('screwWindrow').checked;

    let centrifugeSolidStorageChecked = document.getElementById('centrifugeSolidStorage').checked;
    let centrifugeInVesselChecked = document.getElementById('centrifugeInVessel').checked;
    let centrifugeWindrowChecked = document.getElementById('centrifugeWindrow').checked;

    let rollerSolidStorageChecked = document.getElementById('rollerSolidStorage').checked;
    let rollerInVesselChecked = document.getElementById('rollerInVessel').checked;
    let rollerWindrowChecked = document.getElementById('rollerWindrow').checked;

    let beltSolidStorageChecked = document.getElementById('beltSolidStorage').checked;
    let beltInVesselChecked = document.getElementById('beltInVessel').checked;
    let beltWindrowChecked = document.getElementById('beltWindrow').checked;

    let conversionSolidStorageChecked = document.getElementById('conversionSolidStorage').checked;
    let conversionInVesselChecked = document.getElementById('conversionInVessel').checked;
    let conversionWindrowChecked = document.getElementById('conversionWindrow').checked;
    
// Compost Bedded Pack Barn Results
    if (methodSelected === "Scrape") {
        if (compostChecked) {
            console.log(`Compost Bedded Pack Barn Scrape: ${compostResultScrape.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (weepingSolidStorageChecked) {
            console.log(`Weeping Wall Solid Storage Flush: ${compostResultFlush.toFixed(2)}`);
        }
    }


// Weeping Wall Results
    if (methodSelected === "Scrape") {
        if (weepingSolidStorageChecked) {
            console.log(`Weeping Wall Solid Storage Scrape: ${weepingResultScrape1.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (weepingSolidStorageChecked) {
            console.log(`Weeping Wall Solid Storage Flush: ${weepingResultFlush1.toFixed(2)}`);
        }
    }

    if (methodSelected === "Scrape") {
        if (weepingInVesselChecked) {
            console.log(`Weeping Wall Solid Storage Scrape: ${weepingResultScrape2.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (weepingInVesselChecked) {
            console.log(`Weeping Wall Solid Storage Flush: ${weepingResultFlush2.toFixed(2)}`);
        }
    }
    
    if (methodSelected === "Scrape") {
        if (weepingWindrowChecked) {
            console.log(`Weeping Wall Solid Storage Scrape: ${weepingResultScrape3.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (weepingWindrowChecked) {
            console.log(`Weeping Wall Solid Storage Flush: ${weepingResultFlush3.toFixed(2)}`);
        }
    }

// Stationary Screen Results
    if (methodSelected === "Scrape") {
        if (stationarySolidStorageChecked) {
            console.log(`Stationary Screen Solid Storage Scrape: ${stationaryResultScrape1.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (stationarySolidStorageChecked) {
            console.log(`Stationary Screen Solid Storage Flush: ${stationaryResultFlush1.toFixed(2)}`);
        }
    }

    if (methodSelected === "Scrape") {
        if (stationaryInVesselChecked) {
            console.log(`Stationary Screen Solid Storage Scrape: ${stationaryResultScrape2.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (stationaryInVesselChecked) {
            console.log(`Stationary Screen Solid Storage Flush: ${stationaryResultFlush2.toFixed(2)}`);
        }
    }
    
    if (methodSelected === "Scrape") {
        if (stationaryWindrowChecked) {
            console.log(`Stationary Screen Solid Storage Scrape: ${stationaryResultScrape3.toFixed(2)}`);
        }

    } else if (methodSelected === "Flush") {
        if (stationaryWindrowChecked) {
            console.log(`Stationary Screen Solid Storage Flush: ${stationaryResultFlush3.toFixed(2)}`);
        }
    }
    
// Vibrating Screen Results
if (methodSelected === "Scrape") {
        if (vibratingSolidStorageChecked) {
            console.log(`Vibrating Screen Solid Storage Scrape: ${vibratingResultScrape1.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (vibratingSolidStorageChecked) {
            console.log(`Vibrating Screen Solid Storage Flush: ${vibratingResultFlush1.toFixed(2)}`);
        }
    }

    if (methodSelected === "Scrape") {
        if (vibratingInVesselChecked) {
            console.log(`Vibrating Screen Solid Storage Scrape: ${vibratingResultScrape2.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (vibratingInVesselChecked) {
            console.log(`Vibrating Screen Solid Storage Flush: ${vibratingResultFlush2.toFixed(2)}`);
        }
    }
    
    if (methodSelected === "Scrape") {
        if (vibratingWindrowChecked) {
            console.log(`Vibrating Screen Solid Storage Scrape: ${vibratingResultScrape3.toFixed(2)}`);
        }

    } else if (methodSelected === "Flush") {
        if (vibratingWindrowChecked) {
            console.log(`Vibrating Screen Solid Storage Flush: ${vibratingResultFlush3.toFixed(2)}`);
        }
    }

    // Screw Press Results
    if (methodSelected === "Scrape") {
        if (screwSolidStorageChecked) {
            console.log(`Screw Press Solid Storage Scrape: ${screwResultScrape1.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (screwSolidStorageChecked) {
            console.log(`Screw Press Solid Storage Flush: ${screwResultFlush1.toFixed(2)}`);
        }
    }

    if (methodSelected === "Scrape") {
        if (screwInVesselChecked) {
            console.log(`Screw Press Solid Storage Scrape: ${screwResultScrape2.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (screwInVesselChecked) {
            console.log(`Screw Press Solid Storage Flush: ${screwResultFlush2.toFixed(2)}`);
        }
    }
    
    if (methodSelected === "Scrape") {
        if (screwWindrowChecked) {
            console.log(`Screw Press Solid Storage Scrape: ${screwResultScrape3.toFixed(2)}`);
        }

    } else if (methodSelected === "Flush") {
        if (screwWindrowChecked) {
            console.log(`Screw Press Solid Storage Flush: ${screwResultFlush3.toFixed(2)}`);
        }
    }

    // Centrifuge Results
    if (methodSelected === "Scrape") {
        if (centrifugeSolidStorageChecked) {
            console.log(`Centrifuge Solid Storage Scrape: ${centrifugeResultScrape1.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (centrifugeSolidStorageChecked) {
            console.log(`Centrifuge Solid Storage Flush: ${centrifugeResultFlush1.toFixed(2)}`);
        }
    }

    if (methodSelected === "Scrape") {
        if (centrifugeInVesselChecked) {
            console.log(`Centrifuge Solid Storage Scrape: ${centrifugeResultScrape2.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (centrifugeInVesselChecked) {
            console.log(`Centrifuge Solid Storage Flush: ${centrifugeResultFlush2.toFixed(2)}`);
        }
    }
    
    if (methodSelected === "Scrape") {
        if (centrifugeWindrowChecked) {
            console.log(`Centrifuge Solid Storage Scrape: ${centrifugeResultScrape3.toFixed(2)}`);
        }

    } else if (methodSelected === "Flush") {
        if (centrifugeWindrowChecked) {
            console.log(`Centrifuge Solid Storage Flush: ${centrifugeResultFlush3.toFixed(2)}`);
        }
    }

    // Roller Drum Results
    if (methodSelected === "Scrape") {
        if (rollerSolidStorageChecked) {
            console.log(`Roller Drum Solid Storage Scrape: ${rollerResultScrape1.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (rollerSolidStorageChecked) {
            console.log(`Roller Drum Solid Storage Flush: ${rollerResultFlush1.toFixed(2)}`);
        }
    }

    if (methodSelected === "Scrape") {
        if (rollerInVesselChecked) {
            console.log(`Roller Drum Solid Storage Scrape: ${rollerResultScrape2.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (rollerInVesselChecked) {
            console.log(`Roller Drum Solid Storage Flush: ${rollerResultFlush2.toFixed(2)}`);
        }
    }
    
    if (methodSelected === "Scrape") {
        if (rollerWindrowChecked) {
            console.log(`Roller Drum Solid Storage Scrape: ${rollerResultScrape3.toFixed(2)}`);
        }

    } else if (methodSelected === "Flush") {
        if (rollerWindrowChecked) {
            console.log(`Roller Drum Solid Storage Flush: ${rollerResultFlush3.toFixed(2)}`);
        }
    }

    // Belt Press/Screen Results
    if (methodSelected === "Scrape") {
        if (beltSolidStorageChecked) {
            console.log(`Belt Press/Screen Solid Storage Scrape: ${beltResultScrape1.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (beltSolidStorageChecked) {
            console.log(`Belt Press/Screen Solid Storage Flush: ${beltResultFlush1.toFixed(2)}`);
        }
    }

    if (methodSelected === "Scrape") {
        if (beltInVesselChecked) {
            console.log(`Belt Press/Screen Solid Storage Scrape: ${beltResultScrape2.toFixed(2)}`);
        }
    } else if (methodSelected === "Flush") {
        if (beltInVesselChecked) {
            console.log(`Belt Press/Screen Solid Storage Flush: ${beltResultFlush2.toFixed(2)}`);
        }
    }
    
    if (methodSelected === "Scrape") {
        if (beltWindrowChecked) {
            console.log(`Belt Press/Screen Solid Storage Scrape: ${beltResultScrape3.toFixed(2)}`);
        }

    } else if (methodSelected === "Flush") {
        if (beltWindrowChecked) {
            console.log(`Belt Press/Screen Solid Storage Flush: ${beltResultFlush3.toFixed(2)}`);
        }
    }

      //Conversion from flush to scrape Results
    if (methodSelected === "Scrape") {
        if (conversionSolidStorageChecked) {
            console.log(`N/A`);
        }
    } else if (methodSelected === "Flush") {
        if (conversionSolidStorageChecked) {
            console.log(`Conversion Solid Storage Flush: ${conversionResultFlush1.toFixed(2)}`);
        }
    }

    if (methodSelected === "Scrape") {
        if (conversionInVesselChecked) {
            console.log(`N/A`);
        }
    } else if (methodSelected === "Flush") {
        if (conversionInVesselChecked) {
            console.log(`Conversion Solid Storage Flush: ${conversionResultFlush2.toFixed(2)}`);
        }
    }
    
    if (methodSelected === "Scrape") {
        if (conversionWindrowChecked) {
            console.log(`N/A}`);
        }

    } else if (methodSelected === "Flush") {
        if (conversionWindrowChecked) {
            console.log(`Conversion Solid Storage Flush: ${conversionResultFlush3.toFixed(2)}`);
        }
    }


    // Compost Bedded Pack Barn
    totalUnits = 0;
    if (compostChecked) {
        totalUnits += methodSelected === "Scrape" ? compostResultScrape : compostResultFlush;
    }

    // Weeping Wall
    if (weepingSolidStorageChecked) {
        totalUnits += methodSelected === "Scrape" ? weepingResultScrape1 : weepingResultFlush1;
    }
    if (weepingInVesselChecked) {
        totalUnits += methodSelected === "Scrape" ? weepingResultScrape2 : weepingResultFlush2;
    }
    if (weepingWindrowChecked) {
        totalUnits += methodSelected === "Scrape" ? weepingResultScrape3 : weepingResultFlush3;
    }

    // Stationary Screen
    if (stationarySolidStorageChecked) {
        totalUnits += methodSelected === "Scrape" ? stationaryResultScrape1 : stationaryResultFlush1;
    }
    if (stationaryInVesselChecked) {
        totalUnits += methodSelected === "Scrape" ? stationaryResultScrape2 : stationaryResultFlush2;
    }
    if (stationaryWindrowChecked) {
        totalUnits += methodSelected === "Scrape" ? stationaryResultScrape3 : stationaryResultFlush3;
    }

    // Vibrating Screen
    if (vibratingSolidStorageChecked) {
        totalUnits += methodSelected === "Scrape" ? vibratingResultScrape1 : vibratingResultFlush1;
    }
    if (vibratingInVesselChecked) {
        totalUnits += methodSelected === "Scrape" ? vibratingResultScrape2 : vibratingResultFlush2;
    }
    if (vibratingWindrowChecked) {
        totalUnits += methodSelected === "Scrape" ? vibratingResultScrape3 : vibratingResultFlush3;
    }

        // Screw Press
        if (centrifugeSolidStorageChecked) {
        totalUnits += methodSelected === "Scrape" ? centrifugeResultScrape1 : centrifugeResultFlush1;
    }
    if (centrifugeInVesselChecked) {
        totalUnits += methodSelected === "Scrape" ? centrifugeResultScrape2 : centrifugeResultFlush2;
    }
    if (centrifugeWindrowChecked) {
        totalUnits += methodSelected === "Scrape" ? centrifugeResultScrape3 : centrifugeResultFlush3;
    }

    // Centrifuge
    if (centrifugeSolidStorageChecked) {
        totalUnits += methodSelected === "Scrape" ? centrifugeResultScrape1 : centrifugeResultFlush1;
    }
    if (centrifugeInVesselChecked) {
        totalUnits += methodSelected === "Scrape" ? centrifugeResultScrape2 : centrifugeResultFlush2;
    }
    if (centrifugeWindrowChecked) {
        totalUnits += methodSelected === "Scrape" ? centrifugeResultScrape3 : centrifugeResultFlush3;
    }

        // Roller Drum
        if (rollerSolidStorageChecked) {
        totalUnits += methodSelected === "Scrape" ? rollerResultScrape1 : rollerResultFlush1;
    }
    if (rollerInVesselChecked) {
        totalUnits += methodSelected === "Scrape" ? rollerResultScrape2 : rollerResultFlush2;
    }
    if (rollerWindrowChecked) {
        totalUnits += methodSelected === "Scrape" ? rollerResultScrape3 : rollerResultFlush3;
    }

        // Belt Press/Screen
        if (beltSolidStorageChecked) {
        totalUnits += methodSelected === "Scrape" ? beltResultScrape1 : beltResultFlush1;
    }
    if (beltInVesselChecked) {
        totalUnits += methodSelected === "Scrape" ? beltResultScrape2 : beltResultFlush2;
    }
    if (beltWindrowChecked) {
        totalUnits += methodSelected === "Scrape" ? beltResultScrape3 : beltResultFlush3;
    }

      // Conversion from Flush to Scrape
    if (conversionSolidStorageChecked) {
        totalUnits += methodSelected === "Scrape" ? conversionResultScrape1 : conversionResultFlush1;
    }
    if (conversionInVesselChecked) {
        totalUnits += methodSelected === "Scrape" ? conversionResultScrape2 : conversionResultFlush2;
    }
    if (conversionWindrowChecked) {
        totalUnits += methodSelected === "Scrape" ? conversionResultScrape3 : conversionResultFlush3;
    }

          // Prescribed Grazing
          let prescribedA = 0.008;
          let prescribedB = 0.105;
    
      
          let prescribedResultA = (acres * prescribedA);
          let prescribedResultB = (acres * prescribedB);
    
          // Range Planting
          let rangeA = 0.502;
      
          let rangeResultA = (acres * rangeA);
    
          // Compost Application
          let compostApplicationA = 4.490;
          let compostApplicationB = 2.073;
          let compostApplicationC = 4.428;
          let compostApplicationD = 4.350;
      
          let compostApplicationResultA = (acres * compostApplicationA);
          let compostApplicationResultB = (acres * compostApplicationB);
          let compostApplicationResultC = (acres * compostApplicationC);
          let compostApplicationResultD = (acres * compostApplicationD);
    
          // Hedgerow Planting
          let hedgerowA = 0.002;
          let hedgerowB = 0.002;
    
      
          let hedgerowResultA = (acres * hedgerowA);
          let hedgerowResultB = (acres * hedgerowB);
    
    
          // Riperian Forest Buffer
          let riparianA = 1.773;
          let riparianB = 1.979;
    
      
          let riparianResultA = (acres * riparianA);
          let riparianResultB = (acres * riparianB);
    
    
          // Silvopasture
          let silvopastureA = 1.336;
      
          let silvopastureResultA = (10 * silvopastureA);
    
    
          // Tree/Shrub Establishment
          let treeA = 18.890;
          let treeB = 19.095;
    
      
          let treeResultA = (1 * treeA);
          let treeResultB = (1 * treeB);
    
          
          // Windbreak Planting
          let windbreakA = 0.002;
          let windbreakB = 0.002;
    
      
          let windbreakResultA = (100 * windbreakA);
          let windbreakResultB = (100 * windbreakB);
    
    
            let prescribedAChecked = document.getElementById('prescribedA').checked;
            let prescribedBChecked = document.getElementById('prescribedB').checked;
    
            let rangeAChecked = document.getElementById('rangeA').checked;
    
            let compostApplicationResultAChecked = document.getElementById('compostApplicationA').checked;
            let compostApplicationResultBChecked = document.getElementById('compostApplicationB').checked;
            let compostApplicationResultCChecked = document.getElementById('compostApplicationC').checked;
            let compostApplicationResultDChecked = document.getElementById('compostApplicationD').checked;
    
            let hedgerowAChecked = document.getElementById('hedgerowA').checked;
            let hedgerowBChecked = document.getElementById('hedgerowB').checked;
    
            let riparianAChecked = document.getElementById('riparianA').checked;
            let riparianBChecked = document.getElementById('riparianB').checked;
                
                
            let silvopastureAChecked = document.getElementById('silvopastureA').checked;
                
    
            let treeAChecked = document.getElementById('treeA').checked;
            let treeBChecked = document.getElementById('treeB').checked;
    
            let windbreakAChecked = document.getElementById('windbreakA').checked;
            let windbreakBChecked = document.getElementById('windbreakB').checked;
    
          if (prescribedAChecked) totalUnits += prescribedResultA;
          if (prescribedBChecked) totalUnits += prescribedResultB;
          if (rangeAChecked) totalUnits += rangeResultA;
          if (compostApplicationResultAChecked) totalUnits += compostApplicationResultA;
          if (compostApplicationResultBChecked) totalUnits += compostApplicationResultB;
          if (compostApplicationResultCChecked) totalUnits += compostApplicationResultC;
          if (compostApplicationResultDChecked) totalUnits += compostApplicationResultD;
          if (hedgerowAChecked) totalUnits += hedgerowResultA;
          if (hedgerowBChecked) totalUnits += hedgerowResultB;
          if (riparianAChecked) totalUnits += riparianResultA;
          if (riparianBChecked) totalUnits += riparianResultB;
          if (silvopastureAChecked) totalUnits += silvopastureResultA;
          if (treeAChecked) totalUnits += treeResultA;
          if (treeBChecked) totalUnits += treeResultB;
          if (windbreakAChecked) totalUnits += windbreakResultA;
          if (windbreakBChecked) totalUnits += windbreakResultB;

          document.getElementById('totalUnitsResult').textContent = `${totalUnits.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} MTCO₂e`;
          document.getElementById('grazingtotalUnitsResult').textContent = `${totalUnits.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} MTCO₂e`;
          


}

  
  function showAvoidance() {
      // Use totalUnits directly
      let gasPoweredCar = totalUnits * 0.223;
      let milesDriven = totalUnits * 2564;
      let smartphonesCharged = totalUnits * 121643;
      let windTurbines = totalUnits * 0.0003;
      let trashBags = totalUnits * 43.3;
      let seedlingsGrown = totalUnits * 16.5;
      let acresOfForest = totalUnits * 1.2;

      let grazinggasPoweredCar = totalUnits * 0.223;
      let grazingmilesDriven = totalUnits * 2564;
      let grazingsmartphonesCharged = totalUnits * 121643;
      let grazingwindTurbines = totalUnits * 0.0003;
      let grazingtrashBags = totalUnits * 43.3;
      let grazingseedlingsGrown = totalUnits * 16.5;
      let grazingacresOfForest = totalUnits * 1.2;

      document.getElementById('vehiclesResult').textContent = gasPoweredCar.toLocaleString();
      document.getElementById('milesResult').textContent = milesDriven.toLocaleString();
      document.getElementById('smartphonesResult').textContent = smartphonesCharged.toLocaleString();
      document.getElementById('grazingvehiclesResult').textContent = grazinggasPoweredCar.toLocaleString();
      document.getElementById('grazingmilesResult').textContent = grazingmilesDriven.toLocaleString();
      document.getElementById('grazingsmartphonesResult').textContent = grazingsmartphonesCharged.toLocaleString();

  
      // Update the UI or log the calculations as needed
      console.log(`Gas powered cars driven for 1 year: ${gasPoweredCar.toFixed(2)}`);
      console.log(`Miles driven by an average gas-powered passenger vehicle: ${milesDriven.toFixed(2)}`);
      console.log(`Smartphones charged: ${smartphonesCharged.toFixed(2)}`);
      console.log(`Wind turbines running for 1 year: ${windTurbines.toFixed(2)}`);
      console.log(`Trash bags of waste recycled instead of landfilled: ${trashBags.toFixed(2)}`);
      console.log(`Tree seedlings grown for 10 years: ${seedlingsGrown.toFixed(2)}`);
      console.log(`Acres of US forests in one year: ${acresOfForest.toFixed(2)}`);
      console.log(`Grazing Gas powered cars driven for 1 year: ${grazinggasPoweredCar.toFixed(2)}`);
      console.log(`Miles driven by an average gas-powered passenger vehicle: ${grazingmilesDriven.toFixed(2)}`);
      console.log(`Smartphones charged: ${grazingsmartphonesCharged.toFixed(2)}`);
      console.log(`Wind turbines running for 1 year: ${grazingwindTurbines.toFixed(2)}`);
      console.log(`Trash bags of waste recycled instead of landfilled: ${grazingtrashBags.toFixed(2)}`);
      console.log(`Tree seedlings grown for 10 years: ${grazingseedlingsGrown.toFixed(2)}`);
      console.log(`Acres of US forests in one year: ${grazingacresOfForest.toFixed(2)}`);
  }
  
  function scrollToTop() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  }
