
// credentials "clientId" and "clientSecret" are drawn from credentials.js
// please add this file using your own credentials
console.log(clientId)
console.log(clientSecret)

// What events will your application need?
// I need the user to allow their location (not sure if that's an event)
// I need to change things when they "submit" a drop-down selection

// What APIs will you need and in what order?
// I'm told I'll use the FourSquare API, but I'll get details on that in a later work session
// I need to use Leaflet for mapping and use the docs to do what I want

// How will you obtain the user's location?
// Use the code from Thursday's activity                                                         
function getCoords(){
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

console.log(getCoords());

// How will you add the user's location to the map?
// I think I should wait to instantiate my map until after I have the coordinates!
// Then I can use the .setView method to go to those coordinates at the start.

// How will you get the selected business type from the user?
// Use an event listener for user interaction with the dropdown.

// How will you add that information to the map? 
// I know I can add markers, so I'll do that. 
// I'll have to see what kind of info I get from FourSquare and parse it.

console.log(L)