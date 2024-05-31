const magnifyingGlass = document.querySelector('.fa-solid.fa-magnifying-glass');
const stateDropdown = document.getElementById("stateDropdown");

/* Denne koden fungerer ikke for øyeblikket */

    // magnifyingGlass.addEventListener("click", openmenu);

    // function openmenu() {
    //     if (mybtn.style.display !== 'block') {
    //         mybtn.style.display = 'block';
    //     } else {
    //         mybtn.style.display = 'none';
    //     }
    //     console.log('clicked');
    // }

/* Denne koden fungerer ikke for øyeblikket */


// Innstillinger for map
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
var map = L.map('map1').setView([40.638530, -95.764925], 4);
let marker = [];
let tileURL = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { }).addTo(map);
const tiles = L.tileLayer(tileURL,{attribution});
const markersLayer = L.layerGroup().addTo(map);

// fjerne markers etter nytt søk
function removeAllMarkers() {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}

// Ny kode som lytter etter endringer i drop down menyen
stateDropdown.addEventListener('change', async function() {
    removeAllMarkers(); // fjerne markers etter nytt søk
    let selectedState = stateDropdown.value;
    if (selectedState !== "1") {
        var api_url = `https://api.openbrewerydb.org/v1/breweries?by_state=${selectedState}`;
        const response = await fetch(api_url);
        const data = await response.json();

        data.forEach(element => {
            if (element.longitude !== null && element.latitude !== null) {
                let marker = L.marker([element.latitude, element.longitude]).addTo(map);
                marker.bindPopup(`<b>${element.name}</b><br>${element.latitude}  ${element.longitude}`).openPopup();
            }
        });
    }
});


// søke funksjon
async function show_me(){    
    removeAllMarkers(); // fjerne markers etter nytt søk 
    let search_term = document.getElementById("searchbar").value;
    console.log(search_term);
    var api_url = `https://api.openbrewerydb.org/v1/breweries/search?query=${search_term}`;
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);

    data.forEach(element => {
        if (element.longitude !== null && element.latitude !== null) {
            let marker = L.marker([element.latitude, element.longitude]).addTo(map);
            marker.bindPopup(`<b>${element.name}</b><br>${element.latitude}  ${element.longitude}`).openPopup();
    }
    });
}


// fjerne alle markers etter nytt søk
function removeAllMarkers() {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}

map.scrollWheelZoom.disable();

// Ctrl + Scroll på mappet
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.deltaY !== 0) {
        map.scrollWheelZoom.enable();
    }
});
document.addEventListener('keyup', () => {
    map.scrollWheelZoom.disable();
});