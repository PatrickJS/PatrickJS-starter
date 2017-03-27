/*
 *  Document   : frontend_contact.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Frontend Contact Page
 */

var FrontendContact = function() {
    // Init Contact Map with Gmaps.js, for more examples you can check out https://hpneo.github.io/gmaps/
    var initContactMap = function(){
        new GMaps({
            div: '#js-map-contact',
            lat: 37.75755,
            lng: -122.43688,
            zoom: 15,
            disableDefaultUI: true,
            scrollwheel: false
        }).addMarkers([
            {lat: 37.75755, lng: -122.43688, title: 'Marker #1', animation: google.maps.Animation.DROP, infoWindow: {content: '<strong>Company</strong>'}}
        ]);
    };

    return {
        init: function () {
            // Init Contact Map
            initContactMap();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ FrontendContact.init(); });