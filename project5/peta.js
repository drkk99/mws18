function findLocation(x,y) {    
// console.log(x,y);        
	for (let i=0; i< places.length;i++) {        
		if (places[i].lokasi[0]==x &&             
			places[i].lokasi[1]==y) {            
			return i;        
			}
	}    
	return -1; 
}
	
	function showLocation(e) {      
	//console.log("you clicked " + e.latlng.lat + " dan "+ e.latlng.lng);    
	let ix= findLocation(e.latlng.lat,e.latlng.lng);   
	if (ix >=0) {        
		img.src= places[ix].gambar;  
		img.alt = places[ix].sponsor;
		par.textContent=places[ix].review;
		ttl.textContent=places[ix].sponsor;
		} 
	} 

		       var myIcon = L.icon({
                    iconUrl: 'https://dianrizqi-1f847.firebaseapp.com/project5/drawn-food-restaurant-icon-536491-5448571.svg',
                    iconSize:     [39, 39]
                });
		var mymap = L.map('mapid').setView([-6.2315778,106.8646167], 14);
                L.tileLayer(
                    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
					id: 'mapbox.streets',
                        accessToken: 'pk.eyJ1IjoiZGlhbnJrayIsImEiOiJjam03NHhheDIwYXNuM3BudHcwZ3Zob2sxIn0.JIHCD0q9ADMjJxpmYHuc_A'
                    }).addTo(mymap);	
	
const URL="../project5/peta.json";
	
	fetch(URL)
    .then(function(response){
        if (response.status !== 200) {
            console.log('There is a problem . Status Code: ' + response.status);
            throw response.statusText;
        }
        return response.json()
    })
    .then ( resp => {
        localStorage.setItem('places', JSON.stringify(resp.places));
    })
    .catch(function(err){
        console.log(err);
    });
	
	let gmb= document.getElementById("gmb"); 
	let rev= document.getElementById("review"); 
	let ttl= document.getElementById("title"); 
	let img= document.createElement('img'); 
	img.style="width:100%; height:265px;";
	let par= document.createElement('p');
	let thetitle= document.createElement('p');
	gmb.appendChild(img); 
	rev.appendChild(par); 
	ttl.appendChild(thetitle); 
	
	let places= JSON.parse(localStorage.getItem('places'));
	for (var p of places) {    
	    var latlng = L.latLng({lat: p.lokasi[0], lng:p.lokasi[1]});
		var marker= L.marker(latlng,{icon: myIcon}).addTo(mymap)     
		.bindPopup(p.sponsor);    
		marker.on('click', showLocation);
	}