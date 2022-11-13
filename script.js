// credential "apiKey" is drawn from credentials.js
// please add this file using your own credentials
console.log(apiKey)

// What events will your application need?
// I need the user to allow their location (not sure if that's an event)
// I need to change things when they "submit" a drop-down selection

// What APIs will you need and in what order?
// I'm told I'll use the FourSquare API, but I'll get details on that in a later work session
// I need to use Leaflet for mapping and use the docs to do what I want
async function getPlaces (category, location) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: apiKey
        }
      };
      
    const response = await fetch(`https://api.foursquare.com/v3/places/search?ll=${location[0]}%2C${location[1]}&radius=2000&query=${category}`, options)
    const results = await response.json()
    console.log(results)
    return results
}

// How will you obtain the user's location?
// Use the code from Thursday's activity                                                         
function getCoords(){
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

// How will you get the selected business type from the user?
// Use an event listener for user interaction with the dropdown.
const businessTypeMenu = document.querySelector("#business-type")
function getBusinessType() {
    return businessTypeMenu.value
}

const submitButton = document.querySelector("#business-type-selector button")
submitButton.addEventListener("click", async () => {
    const resultsList = await getPlaces(getBusinessType(),currentLocation)
    addMarkers(resultsList.results)
})

// How will you add that information to the map? 
// I know I can add markers, so I'll do that. 
// I'll have to see what kind of info I get from FourSquare and parse it.
async function addMarkers(resultsList) {
    removeMarkers()
    resultsList.forEach(result => {
        const marker = L.marker([result.geocodes.main.latitude,result.geocodes.main.longitude]).addTo(map)
        marker.bindPopup(result.name)
        markers.push(marker)
    })
}

function removeMarkers () {
    markers.forEach(marker => map.removeLayer(marker))
    markers = []
}

let map
let currentLocation
let markers = []

async function main () {

    // How will you add the user's location to the map?
    // I think I should wait to instantiate my map until after I have the coordinates!
    // Then I can use the .setView method to go to those coordinates at the start.
    const location = await getCoords()
    currentLocation = [location.coords.latitude, location.coords.longitude]
    map = L.map('map-div').setView(currentLocation, 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const marker = L.marker(currentLocation).addTo(map);
}

main()