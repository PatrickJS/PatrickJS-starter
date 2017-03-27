/*
 *  Document   : base_comp_maps_vector.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Vector Maps Page
 */

var BaseCompMapsVector = function() {
    // jVectorMap, for more examples you can check out http://jvectormap.com/documentation/

    // Set default options for all maps
    var $mapOptions = {
        map: '',
        backgroundColor: '#ffffff',
        regionStyle: {
            initial: {
                fill: '#5490d2',
                'fill-opacity': 1,
                stroke: 'none',
                'stroke-width': 0,
                'stroke-opacity': 1
            },
            hover: {
                'fill-opacity': .8,
                cursor: 'pointer'
            }
        }
    };

    // Init World Map
    var initMapWorld = function(){
        // Set Active Map
        $mapOptions['map'] = 'world_mill_en';

        // Init Map
        jQuery('.js-vector-map-world').vectorMap($mapOptions);
    };

    // Init Europe Map
    var initMapEurope = function(){
        // Set Active Map
        $mapOptions['map'] = 'europe_mill_en';

        // Init Map
        jQuery('.js-vector-map-europe').vectorMap($mapOptions);
    };

    // Init USA Map
    var initMapUsa = function(){
        // Set Active Map
        $mapOptions['map'] = 'us_aea_en';

        // Init Map
        jQuery('.js-vector-map-usa').vectorMap($mapOptions);
    };

    // Init India Map
    var initMapIndia = function(){
        // Set Active Map
        $mapOptions['map'] = 'in_mill_en';

        // Init Map
        jQuery('.js-vector-map-india').vectorMap($mapOptions);
    };

    // Init China Map
    var initMapChina = function(){
        // Set Active Map
        $mapOptions['map'] = 'cn_mill_en';

        // Init Map
        jQuery('.js-vector-map-china').vectorMap($mapOptions);
    };

    // Init Australia Map
    var initMapAustralia = function(){
        // Set Active Map
        $mapOptions['map'] = 'au_mill_en';

        // Init Map
        jQuery('.js-vector-map-australia').vectorMap($mapOptions);
    };

    // Init South Africa Map
    var initMapSouthAfrica = function(){
        // Set Active Map
        $mapOptions['map'] = 'za_mill_en';

        // Init Map
        jQuery('.js-vector-map-south-africa').vectorMap($mapOptions);
    };

    // Init France Map
    var initMapFrance = function(){
        // Set Active Map
        $mapOptions['map'] = 'fr_mill_en';

        // Init Map
        jQuery('.js-vector-map-france').vectorMap($mapOptions);
    };

    // Init Germany Map
    var initMapGermany = function(){
        // Set Active Map
        $mapOptions['map'] = 'de_mill_en';

        // Init Map
        jQuery('.js-vector-map-germany').vectorMap($mapOptions);
    };

    return {
        init: function () {
            // Init Example Maps
            initMapWorld();
            initMapEurope();
            initMapUsa();
            initMapIndia();
            initMapChina();
            initMapAustralia();
            initMapSouthAfrica();
            initMapFrance();
            initMapGermany();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseCompMapsVector.init(); });