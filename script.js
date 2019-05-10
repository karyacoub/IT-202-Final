var map;

function initMap()
{
    navigator.geolocation.getCurrentPosition(function(p) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: p.coords.latitude, lng: p.coords.longitude },
            zoom: 10
        });
    });
}