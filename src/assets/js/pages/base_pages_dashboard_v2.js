/*
 *  Document   : base_pages_dashboard_v2.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Dashboard v2 Page
 */

var BasePagesDashboardv2 = function() {
    // Chart.js Chart, for more examples you can check out http://www.chartjs.org/docs
    var initDashv2ChartJS = function(){
        // Get Chart Container
        var $dashChartEarningsCon = jQuery('.js-dash-chartjs-earnings')[0].getContext('2d');
        var $dashChartSalesCon    = jQuery('.js-dash-chartjs-sales')[0].getContext('2d');

        // Earnings Chart Data
        var $dashChartEarningsData = {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [
                {
                    label: 'Last Week',
                    fillColor: 'rgba(68, 180, 166, .07)',
                    strokeColor: 'rgba(68, 180, 166, .25)',
                    pointColor: 'rgba(68, 180, 166, .25)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(68, 180, 166, 1)',
                    data: [600, 350, 1100, 420, 750, 1050, 670]
                },
                {
                    label: 'This Week',
                    fillColor: 'rgba(68, 180, 166, .25)',
                    strokeColor: 'rgba(68, 180, 166, .55)',
                    pointColor: 'rgba(68, 180, 166, .55)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(68, 180, 166, 1)',
                    data: [490, 430, 560, 790, 1200, 950, 1500]
                }
            ]
        };

        // Sales Chart Data
        var $dashChartSalesData = {
            labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            datasets: [
                {
                    label: 'Last Week',
                    fillColor: 'rgba(164, 138, 212, .07)',
                    strokeColor: 'rgba(164, 138, 212, .25)',
                    pointColor: 'rgba(164, 138, 212, .25)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(164, 138, 212, 1)',
                    data: [60, 40, 90, 35, 85, 65, 77]
                },
                {
                    label: 'This Week',
                    fillColor: 'rgba(164, 138, 212, .25)',
                    strokeColor: 'rgba(164, 138, 212, .55)',
                    pointColor: 'rgba(164, 138, 212, .55)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(164, 138, 212, 1)',
                    data: [50, 33, 25, 82, 120, 95, 150]
                }
            ]
        };

        // Init Earnings Chart
        var $dashChartEarnings = new Chart($dashChartEarningsCon).Line($dashChartEarningsData, {
            scaleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            scaleFontColor: '#999',
            scaleFontStyle: '600',
            tooltipTitleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            tooltipCornerRadius: 3,
            maintainAspectRatio: false,
            responsive: true
        });

        // Init Sales Chart
        var $dashChartSales = new Chart($dashChartSalesCon).Line($dashChartSalesData, {
            scaleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            scaleFontColor: '#999',
            scaleFontStyle: '600',
            tooltipTitleFontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            tooltipCornerRadius: 3,
            maintainAspectRatio: false,
            responsive: true
        });
    };

    return {
        init: function () {
            // Init ChartJS charts
            initDashv2ChartJS();
        }
    };
}();

// Initialize when page loads
jQuery(function(){ BasePagesDashboardv2.init(); });