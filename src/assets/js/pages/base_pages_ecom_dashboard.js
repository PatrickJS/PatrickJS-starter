/*
 *  Document   : base_pages_ecom_dashboard.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in eCommerce Dashboard Page
 */

var BasePagesEcomDashboard = function() {
    // Chart.js Chart, for more examples you can check out http://www.chartjs.org/docs
    var initOverviewChart = function(){
        // Get Chart Container
        var $chartOverviewCon = jQuery('.js-chartjs-overview')[0].getContext('2d');

        // Set Chart Options
        var $chartOverviewOptions = {
            scaleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            scaleFontColor: '#999',
            scaleFontStyle: '600',
            tooltipTitleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            tooltipCornerRadius: 3,
            maintainAspectRatio: false,
            responsive: true
        };

        // Overview Chart Data
        var $chartOverviewData = {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [
                {
                    label: 'Last Week',
                    fillColor: 'rgba(220,220,220,.3)',
                    strokeColor: 'rgba(220,220,220,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: [390, 290, 410, 290, 450, 180, 360]
                },
                {
                    label: 'This Week',
                    fillColor: 'rgba(171, 227, 125, .3)',
                    strokeColor: 'rgba(171, 227, 125, 1)',
                    pointColor: 'rgba(171, 227, 125, 1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(171, 227, 125, 1)',
                    data: [180, 360, 236, 320, 210, 295, 260]
                }
            ]
        };

        // Init Overview Chart
        var $chartOverview = new Chart($chartOverviewCon).Line($chartOverviewData, $chartOverviewOptions);
    };

    return {
        init: function () {
            // Init Overview Chart
            initOverviewChart();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BasePagesEcomDashboard.init(); });