/*
 *  Document   : frontend_travel_package.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Frontend Travel Package Page
 */

var FrontendTravelPackage = function() {
    // Init Contact Map with Gmaps.js, for more examples you can check out https://hpneo.github.io/gmaps/
    var initTravelMap = function(){
        new GMaps({
            div: '#js-map-travel',
            lat: 19.542915,
            lng: -155.665857,
            zoom: 8,
            disableDefaultUI: true,
            scrollwheel: false,
            draggable: false,
            panControl: false
        }).setMapTypeId(google.maps.MapTypeId.TERRAIN);
    };

    return {
        init: function () {
            // Init Travel Map
            initTravelMap();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ FrontendTravelPackage.init(); });