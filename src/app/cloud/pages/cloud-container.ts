import {Component, OnInit} from '@angular/core';

@Component({
             selector: 'cloud-container',
             templateUrl: 'cloud-container.html'
           })
export class CloudContainerComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    this.triigerLoadUI();
    this.initPageJs();
  }

  triigerLoadUI() {
    OneUI.init();
  }

  initPageJs() {
    let BasePagesDashboard = function () {
      // Chart.js Chart, for more examples you can check out http://www.chartjs.org/docs
      let initDashChartJS = function () {
        // Get Chart Container
        let $dashChartLinesCon = jQuery('.js-dash-chartjs-lines')[0].getContext('2d');

        // Set Chart and Chart Data variables
        let $dashChartLines: any;

        // Lines Chart Data
        let $dashChartLinesData: any = {
          labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
          datasets: [
            {
              label: 'This Week',
              fillColor: 'rgba(44, 52, 63, .07)',
              strokeColor: 'rgba(44, 52, 63, .25)',
              pointColor: 'rgba(44, 52, 63, .25)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(44, 52, 63, 1)',
              data: [34, 42, 40, 65, 48, 56, 80]
            },
            {
              label: 'Last Week',
              fillColor: 'rgba(44, 52, 63, .1)',
              strokeColor: 'rgba(44, 52, 63, .55)',
              pointColor: 'rgba(44, 52, 63, .55)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(44, 52, 63, 1)',
              data: [18, 19, 20, 35, 23, 28, 50]
            }
          ]
        };

        // Init Lines Chart
        $dashChartLines = new Chart($dashChartLinesCon).Line($dashChartLinesData, {
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
          // Init ChartJS chart
          initDashChartJS();
        }
      };
    }();

    // Initialize when page loads
    jQuery(function () { BasePagesDashboard.init(); });

    jQuery(() => {
      // Init page helpers (Slick Slider plugin)
      OneUI.initHelpers('slick');
    });
  }
}