
import { Component, ViewEncapsulation, ElementRef, AfterViewInit, OnInit, DoCheck
  , IterableDiffers, Input, Output, EventEmitter, OnDestroy
  , ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'orga-chart',
  template: require('./orgchart.html'),
  styles: [require('./orgchart.scss')],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class OrgaChart implements AfterViewInit, DoCheck, OnDestroy  {
  chart: any;
  data: any;
  initialized: number = 0;
  differ: any;
  drawn: number = 0;
  _selectedNode: any = undefined;

  @Input() get selectedNode(): any {return this._selectedNode; }
  set selectedNode(value: any) {
    this._selectedNode = value;
    if (value) this.selectedNodeChange.emit(value);
  }
  @Output() selectedNodeChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() orga: Array<any>;

  private _drawnEvent: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef,  differs: IterableDiffers
    , private changeDetectorRef: ChangeDetectorRef) {
    this.differ = differs.find([]).create(undefined);

   }

  ngAfterViewInit() {
    // if (!google.visualization || !google.visualization.OrgChart) {
    //   google.charts.load('current', {packages: ['orgchart']});
    //   google.charts.setOnLoadCallback(() => this.initChart());
    // } else
    setTimeout(() => {
      this.initChart();
    }, 500);
    this._drawnEvent.subscribe(() => {
      this.drawn = 1;
      this.changeDetectorRef.detectChanges();
    });
  }

  initChart() {
    this.data = new google.visualization.DataTable();
    this.data.addColumn('string', 'Name');
    this.data.addColumn('string', 'Parent');
    this.data.addColumn('string', 'ToolTip');

    this.data.addRows(this.orga);

    this.chart = new google.visualization.OrgChart(this.elementRef.nativeElement.children[0]);
    google.visualization.events.addListener(this.chart, 'select', () => {
      this.nodeSelect();
    });
    google.visualization.events.addListener(this.chart, 'ready', () => {
      this._drawnEvent.emit(true);
      if (this.selectedNode) {
        this.chart.setSelection([{'row' : []  }]);
        this.chart.setSelection([{'row' : [this.orga.indexOf(this.selectedNode)]  }]);
      }
    });
    this.initialized = 1;
    this.draw();
  }

  ngDoCheck() {
        let changes = this.differ.diff(this.orga);
        if (changes && this.initialized === 1) {
          this.drawn = 0;
          setTimeout(() => {
            this.data.removeRows(0, this.data.getNumberOfRows());
            this.data.addRows(this.orga);
            this.draw();
          }, 200);

        }
    }

    draw() {
        this.chart.draw(this.data, {allowHtml: true, allowCollapse: true, size: 'medium'});
    }

    nodeSelect() {
      if (this.chart.getSelection().length === 0) return;
      let selectedRow = this.chart.getSelection()[0].row;
      this.selectedNodeChange.emit(this.orga[selectedRow]);

    }

    ngOnDestroy() {
        google.visualization.events.removeAllListeners(this.chart);
    }

}
