/*
 *  Document   : base_ui_widgets.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Widgets Page
 */

var BaseUIWidgets = function() {
    // jQuery Sparkline Charts, for more examples you can check out http://omnipotent.net/jquery.sparkline/#s-docs
    var initWidgetsSparkline = function(){
        // Line Charts
        var $lineOptions = {
            type: 'line',
            width: '200px',
            height: '120px',
            tooltipOffsetX: -25,
            tooltipOffsetY: 20,
            lineColor: '#abe37d',
            fillColor: '#abe37d',
            spotColor: '#777777',
            minSpotColor: '#777777',
            maxSpotColor: '#777777',
            highlightSpotColor: '#777777',
            highlightLineColor: '#777777',
            spotRadius: 2,
            tooltipPrefix: '',
            tooltipSuffix: ' Sales',
            tooltipFormat: '{{prefix}}{{y}}{{suffix}}'
        };
        jQuery('.js-widget-line1').sparkline('html', $lineOptions);

        $lineOptions['lineColor']       = '#fadb7d';
        $lineOptions['fillColor']       = '#fadb7d';
        $lineOptions['tooltipPrefix']   = '';
        $lineOptions['tooltipSuffix']   = ' Tickets';
        jQuery('.js-widget-line2').sparkline('html', $lineOptions);

        $lineOptions['lineColor']       = '#faad7d';
        $lineOptions['fillColor']       = '#faad7d';
        $lineOptions['tooltipPrefix']   = '$ ';
        $lineOptions['tooltipSuffix']   = '';
        jQuery('.js-widget-line3').sparkline('html', $lineOptions);
    };

    return {
        init: function() {
            // Init all charts
            initWidgetsSparkline();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BaseUIWidgets.init(); });