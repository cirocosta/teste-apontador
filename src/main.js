/**
 * Global variables
 */
var apiApontador, map, local, mapPositioned, reviewsPage = 0;

/**
 * Populates the window with content comming from the API
 * @param  {ApiApontador} api 
 */
function populateWithDeterminedPlaceInfo(api) {
    var determined_place = "M25GJ288", info, nome, categoria, 
        endereco, telefone;

    api.getPlaceInfo(determined_place, function () {

        info = JSON.parse(this.responseText);
        nome = info.place.name;
        categoria = info.place.categories[0].name || "";
        telefone = info.place.phones[0] || "";

        var html =
            "<h1>" + nome + "</h1>" +
            "<h3>" + categoria + "</h3> " +
            "<h4><strong>tel:</strong> " + telefone + "</h4>";

        local = new google.maps.LatLng(
            info.place.location.lat, info.place.location.lng
        );
        document.getElementById("place-info").innerHTML = html;
    });
}

/**
 * Populates the REviews part with some of the reviews
 * @param  {ApiApontador} api 
 */
function populatePlaceReviews(api) {
    var placeId = "M25GJ288";
    var response, html_reviews = "";

    api.getPlaceReviews(placeId, function () {
        response = JSON.parse(this.responseText);
        var reviews = response.reviewResults.reviews;

        for (var i in reviews) {
            var review = reviews[i];

            var foto = review.creation.author.photo || "";

            html_reviews += '<li>' +
            ' <div class="review row">' +
              '<div class="col-md-2">' +
                '<img class="img-circle" width="50" height="50"' + 
                    'src="' + foto + '"/>  ' +
              '</div>' +
              '<div class="col-md-10">' +
                '<p class="lead review-nome">' + review.creation.author.name + '</p>' +
                '<p class="text-muted">' + review.text + '</p>' +
              '</div>' +
            '</div>' +
            '</li>';
        }

        document.getElementById('list-reviews').innerHTML = html_reviews;
    });
}


/** 
 * Pans the map to the center and opens an infowindow at the marker
 * position that refers to the latitude and longitude given to us by the
 * Geolocation API.
 */
function showPositionOnMap(location) {
    if (!mapPositioned) {
        var maps_position = location;
        var marker = new google.maps.Marker({
            position: maps_position,
            animation: google.maps.Animation.DROP,
            map: map,
            title: ':)'
        });

        map.panTo(maps_position);
    }
}

/**
 * Hides the modal that appears when entering the website. Turns opacity
 * to zero and show a bar at the top of the page so that the user is
 * able to bring it back again.
 */
function hideFrontText() {
    var text_modal = document.getElementById('text_modal');
    var b_appear = document.getElementById('b_appear');

    text_modal.setAttribute("faded","true");
    b_appear.setAttribute("faded", "false");

    showPositionOnMap(local);
}


/**
 * Triggered when clicking the button to show the text again. Hides the
 * button and turns modal's opacity back to 100%.
 */
function showFrontText() {
    var text_modal = document.getElementById('text_modal');
    var b_appear = document.getElementById('b_appear');

    text_modal.setAttribute("faded","false");
    b_appear.setAttribute("faded", "true");
}

/**
 * Custom options for the Map.
 * @type {google.maps.MapOptions}
 */
var myOptions = {
    zoom: 15,
    center: new google.maps.LatLng(53.385873, -1.471471),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    panControl: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    styles: [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]
};


/**
 * Initializes the canvas object with the map.
 * @see https://developers.google.com/maps/documentation/javascript/
 */
function initialize(){
    map = new google.maps.Map(document.getElementById('map'), myOptions);
    apiApontador = new ApiApontador("HERE-COMES-YOUR=TOKEN");
    populateWithDeterminedPlaceInfo(apiApontador);
    populatePlaceReviews(apiApontador);
}


/**
 * Register the initialize function for the 'load' event
 */
google.maps.event.addDomListener(window, 'load', initialize);
