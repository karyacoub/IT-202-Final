var map;
var markers = [];

function initMap()
{
    navigator.geolocation.getCurrentPosition(function(p) {

        // initialize map on current location
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: p.coords.latitude, lng: p.coords.longitude },
            zoom: 10
        });

        getPoliceStationData(p.coords.latitude, p.coords.longitude);
    });
}

function getPoliceStationData(currentLat, currentLng)
{
    const url = 'https://data.cityofchicago.org/resource/9rg7-mz9y.json';

    $.get(url, function(response) {
        $.each(response, function(i, v) {
            console.log(v);
            var address = v.address;
            var districtNum = v.district;
            var districtName = v.district_name;
            var lat = parseFloat(v.latitude);
            var lng = parseFloat(v.longitude);

            // create marker
            var marker = createMarker(address, lat, lng);

            // calculate distance between current position and marker position
            var dist = distance(currentLat, currentLng, lat, lng);

            // create infowindow with distance as content
            var contentString = '<div>'
                            +       '<h1>District: ' + districtNum + ' (' + districtName + ')</h1>'
                            +       '<p>Distance: ' + dist + ' km</p>'
                            +   '</div>';

            var infoWindow = new google.maps.InfoWindow({
                content: contentString
            });

            // add infowindow to marker
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });

            // add marker and infowindow to map
            marker.setMap(map);
        });
    });
}

function distance(lat1, lng1, lat2, lng2)
{
    var deglen = 110.25

    x = lat1 - lat2
    y = (lng1 - lng2) * Math.cos(lat2)

    return deglen * Math.sqrt(x*x + y*y)
}

function createMarker(title, latitude, longitude)
{
    return new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        title: title
    });
}