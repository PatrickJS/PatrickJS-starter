/*
 *  Document   : frontend_features.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Frontend Features Page
 */

var FrontendFeatures = function() {
    // Chart.js Chart, for more examples you can check out http://www.chartjs.org/docs
    var initFeaturesChartJS = function(){
        // Get Chart Container
        var $featuresChartLinesCon  = jQuery('.js-features-chartjs-lines')[0].getContext('2d');

        // Set Chart and Chart Data variables
        var $featuresChartLines, $featuresChartLinesData;

        // Lines Chart Data
        var $featuresChartLinesData = {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [
                {
                    label: 'This Week',
                    fillColor: 'rgba(0, 0, 0, .07)',
                    strokeColor: 'rgba(0, 0, 0, .25)',
                    pointColor: 'rgba(0, 0, 0, .25)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(0, 0, 0, 1)',
                    data: [24, 30, 40, 70, 76, 170, 350]
                },
                {
                    label: 'Last Week',
                    fillColor: 'rgba(0, 0, 0, .1)',
                    strokeColor: 'rgba(0, 0, 0, .55)',
                    pointColor: 'rgba(0, 0, 0, .55)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(0, 0, 0, 1)',
                    data: [12, 15, 20, 35, 38, 90, 250]
                }
            ]
        };

        // Init Lines Chart
        $featuresChartLines = new Chart($featuresChartLinesCon).Line($featuresChartLinesData, {
            scaleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            scaleFontColor: '#fff',
            scaleFontStyle: '600',
            tooltipTitleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            tooltipCornerRadius: 3,
            maintainAspectRatio: false,
            responsive: true,
            scaleShowGridLines: false,
            scaleShowLabels : false
        });
    };

    return {
        init: function () {
            // Init ChartJS chart
            initFeaturesChartJS();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ FrontendFeatures.init(); });