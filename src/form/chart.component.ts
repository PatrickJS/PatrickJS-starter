import { Component } from "@angular/core";
import { ChartService } from "./chart.service";
import { Http } from "@angular/http";
let Highcharts = require('highcharts');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

@Component({
  selector: "chart-app",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
  providers: [ ChartService ]
})

export class ChartComponent {
  chartName = "testing";
  charts: string[];

  constructor(private chartService: ChartService,
              private http: Http) {
    this.chartName = "test chart";
  }

  ngOnInit() {
    this.getCharts();
    this.populateChart();
  }

  getCharts(): void {
    this.chartService.getCharts().then(charts => this.charts = charts);
  }

  populateChart(): void {
    Highcharts.chart('container', {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Fruit Consumption'
        },
        xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
          title: {
            text: 'Fruit eaten'
          }
        },
        series: [{
          name: 'Jane',
          data: [1, 0, 4]
        }, {
          name: 'John',
          data: [5, 7, 3]
        }]
      });
  }

}
