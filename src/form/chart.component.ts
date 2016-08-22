import {Component, Input} from "@angular/core";
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
  chart: any;


  private stubData = [[1451628000000, 100.0], [1452837600000, 0.0], [1454306400000, 100.0], [1456812000000, 100.0], [1459486800000, 100.0], [1462078800000, 100.0], [1464757200000, 100.0], [1467349200000, 100.0], [1470027600000, 100.0], [1472706000000, 100.0], [1475298000000, 100.0], [1477976400000, 100.0], [1480572000000, 100.0]];

  @Input()
  tsData: Object;  // [[1451628000, 100.0], [1452837600, 0.0], [1454306400, 100.0], [1456812000, 100.0], [1459486800, 100.0], [1462078800, 100.0], [1464757200, 100.0], [1467349200, 100.0], [1470027600, 100.0], [1472706000, 100.0], [1475298000, 100.0], [1477976400, 100.0], [1480572000, 100.0]];


  constructor(private chartService: ChartService,
              private http: Http) {
    this.chartName = "test chart";
  }

  ngOnInit() {
    this.getCharts();
    this.populateChart(this.stubData);
  }

  getCharts(): void {
    this.chartService.getCharts().then(charts => this.charts = charts);
  }

  private plotOptions = {
    spline: {
      marker: {
        enabled: false
      }
    },
    areaspline: {
      fillOpacity: 0.5
    }
  };
  // if (stacking) {
  //   thesePlotOptions["series"] = {
  //     stacking: 'normal'
  //   }
  // }

  populateChart(data: Object): void {
    this.chart = Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Some Data'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%B %Y',
          year: '%Y'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Amount'
        }
      },
      series: [{
        name: 'Jane',
        data: data // this.tsData
      }]
    });
  }

}


//  , {
// name: 'John',
//   data: [5, 7, 3]
// }
