// public/js/map.js

// 1. Flip coordinates from [Lng, Lat] to [Lat, Lng]
const lat = coordinates[1];
const lng = coordinates[0];

// 2. Initialize the map canvas AND disable the default attribution text
const map = L.map('map', { attributionControl: false }).setView([lat, lng], 9); 

// 3. Add the OpenStreetMap visual tile layer (Notice we can clear the attribution option here too)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// 4. Custom Red Marker Icon configuration
const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],       
    iconAnchor: [12, 41],     
    popupAnchor: [1, -34],    
    shadowSize: [41, 41]      
});

// 5. Add the marker pin
const marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);

// 6. Bind the popup message window
marker.bindPopup(
    `<h4>${locationName}, ${countryName}</h4><p>Exact Location provided after booking</p>`
).openPopup();