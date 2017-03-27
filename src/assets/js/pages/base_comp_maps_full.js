/*
 *  Document   : base_comp_maps_full.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Google Maps Full Page
 */

var BaseCompMapsFull = function() {
    // Gmaps.js, for more examples you can check out https://hpneo.github.io/gmaps/

    // Init Full Map
    var initMapFull = function(){
        var $mainCon    = jQuery('#main-container');
        var $mlat       = 37.7577;
        var $mlong      = -122.4376;
        var $rTimeout;

        // Set #main-container position to be relative
        $mainCon.css('position', 'relative');

        // Adjust map container position
        jQuery('#js-map-full').css({
            'position': 'absolute',
            'top': $mainCon.css('padding-top'),
            'right': '0',
            'bottom': '0',
            'left': '0'
        });

        // Init map itself
        var $mapFull = new GMaps({
            div: '#js-map-full',
            lat: $mlat,
            lng: $mlong,
            zoom: 11
        });

        // Set map type
        $mapFull.setMapTypeId(google.maps.MapTypeId.TERRAIN);

        // Resize and center the map on browser window resize
        jQuery(window).on('resize orientationchange', function(){
            clearTimeout($rTimeout);

            $rTimeout = setTimeout(function(){
                $mapFull.refresh();
                $mapFull.setCenter($mlat, $mlong);
            }, 150);
        });
    };

    return {
        init: function () {
            // Init Full Map
            initMapFull();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseCompMapsFull.init(); });