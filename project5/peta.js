function findLocation(x,y) {    
// console.log(x,y);        
	for (var i=0; i< places.length;i++) {        
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
		img.alt = places[ix].title;
		par.textContent=places[ix].review;
		} 
	} 
	
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
        setView();
    })
    .catch(function(err){
        console.log(err);
    });
	
	let gmb= document.getElementById("gmb"); 
	let rev= document.getElementById("review"); 
	let ttl= document.getElementById("title"); 
	let img= document.createElement('img'); 
	let par= document.createElement('p');
	let thetitle= document.createElement('p');
	gmb.appendChild(img); 
	rev.appendChild(par); 
	ttl.appendChild(thetitle); 
	
	let places= JSON.parse(localStorage.getItem('places'));
	for (var p of places) {    
		var marker= L.marker(p.lokasi,{icon: myIcon}).addTo(mymap)     
		.bindPopup(p.sponsor);    
		marker.on('click', showLocation);
	}