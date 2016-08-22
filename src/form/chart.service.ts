import { Injectable } from '@angular/core';

let SCENARIOS: string[] = ["one scenario", "another scenario"];

@Injectable()
export class ChartService {
  getCharts(): Promise<string[]> {
    return Promise.resolve(SCENARIOS);
  }
}
