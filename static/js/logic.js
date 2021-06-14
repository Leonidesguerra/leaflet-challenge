let DataURL= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


//initializing the map to show a map before filers ar used
let myMap = L.map("mapid", {
  center: [34, 10],
  zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);




d3.json(DataURL).then(function(response) {
  let data = response.features;

  

  data.forEach(d=>{
    let location =[d.geometry.coordinates[1], d.geometry.coordinates[0]];
    let depth = d.geometry.coordinates[2];
    let magnitude = parseInt(d.properties.mag);
    let type = d.properties.type;
    let place = d.properties.place;
    let time = new Date(d.properties.time);

    let depthColor = "";

    if(depth <= 1){
      depthColor= "#ccffcc"
    } else if(depth <=2){
      depthColor ="#ccff99"
    } else if(depth <=3){
      depthColor ="#66ff33"
    }else if(depth <=4){
      depthColor ="#00ff00"
    } else{depthColor= "#339933"}
    
    
  
    
    L.circle(location, {
      fillOpacity: .8,
      color: depthColor,
      fillColor: depthColor,
      radius: magnitude*50000
    }).bindPopup("<h1>" + type + "</h1> <hr> <h3>Location: " + place + "</h3><h3>Magnitude: "+ magnitude + "</h3>"+ "<h3>Time: " + time).addTo(myMap);
   

  });

  
  myMap.on('zoomend', function() {
    generatepoints() 
   });
   
  
});