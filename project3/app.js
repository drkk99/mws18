let mymap = L.map('mapid').setView([-6.2315778,106.8646167], 14);
                L.tileLayer(
                    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                        maxZoom: 25,
                        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        //     '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        //     'Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
                        id: 'mapbox.streets',
                        accessToken: 'pk.eyJ1IjoiZGlhbnJrayIsImEiOiJjam03NHhheDIwYXNuM3BudHcwZ3Zob2sxIn0.JIHCD0q9ADMjJxpmYHuc_A'
                    }).addTo(mymap);
        
                var myIcon = L.icon({
                    iconUrl: 'https://dianrizqi-1f847.firebaseapp.com/project3/drawn-food-restaurant-icon-536491-5448571.svg',
                    iconSize:     [39, 39]
                });
        
               
               let promise;
               var marker =  fetch('https://dianrizqi-1f847.firebaseapp.com/project3/lokasi.json', {mode: 'cors'})
                    .then(function(response) {
                        // console.log(response);
                        return response.json();
                    })
                    .then(function(myJson) {
                        promise = myJson;
                    })
                    .then(function(){  
                            for (i in promise) {
                                // console.log(promise[i].img);
                            var latlng = L.latLng({lat: promise[i].lat, lng:promise[i].lng});
                            
                            var mapku = L.marker( latlng, {icon: myIcon} )
                            .bindTooltip(promise[i].name)
                            .addTo(mymap);
                            mapku.review = promise[i].review;
                            mapku.img = promise[i].img;
                            mapku.title = promise[i].name;
                            mapku.skor = promise[i].skor;
                            // console.log(mapku.title);
    
                                    mapku.on('click', function (e) {
                                    // console.log(this.title);
                                    let img = document.getElementById('picture');
                                    img.style.backgroundImage = "url("+this.img+")";
                                    document.getElementById('review').innerHTML = "<strong><span class='skor'>"+parseFloat(this.skor)+"</span></strong></br>&ldquo;"+this.review+"&rdquo;";
                                    document.getElementById('title').innerHTML = "<h3>"+this.title+"</h3>";
                                });
                        }
            });