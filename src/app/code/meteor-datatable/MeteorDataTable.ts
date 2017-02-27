import {
  MongoObservable
} from "meteor-rxjs";
import {
  Observable,
  Subscription
} from "rxjs";
import * as _ from "lodash";
import {CloudException} from "../CloudException";

export class MeteorDataTable {
  protected collection: MongoObservable.Collection<any>;
  protected _dtTable: any;
  public meteorDataTableSubscription: Subscription;
  public reDrawCallBack: () => void;
  public removeCallBack: (id: string) => void;
  public editCallBack: (id: string) => void;
  
  constructor(protected elementSelector: any,
              protected dataTableOptions: Object,
              protected collectionObservable: Observable<MongoObservable.Collection<any>>) {
    this.meteorDataTableSubscription = this.collectionObservable.subscribe((collection) => {
      this.collection = collection;
      this.resolve()
    });
  }
  
  private initDataTable() {
    let options;
    if (_.isObject(this.dataTableOptions)) {
      options = Object.assign(this.getDefaultOption(), this.dataTableOptions);
    }
    else
      options = this.getDefaultOption();
    
    // add Column action
    if (options.hasOwnProperty('actionsColumn')) {
      let _numOfColumn = _.size(options.columns);
      options.columns.push({data: "_id", title: "Action"},);
      
      if (!options.hasOwnProperty('columnDefs')) {
        options['columnDefs'] = [];
      }
      options['columnDefs'].push({
                                   className: "text-center",
                                   // The `data` parameter refers to the data for the cell (defined by the
                                   // `data` option, which defaults to the column being worked with, in
                                   // this case `data: 0`.
                                   "render" : function (data, type, row) {
                                     let _html = `<div class="btn-group">`;
                                     if (options['actionsColumn']['edit'] == true)
                                       _html += `<button class="btn btn-xs btn-default" type="button" data-toggle="tooltip" title="Edit Client">
                                                  <i class="fa fa-pencil"></i>
                                                </button>`;
                                     if (options['actionsColumn']['remove'] == true)
                                       _html += ` <button class="btn btn-xs btn-default" type="button" data-toggle="tooltip" title="Remove Client">
                                                  <i class="fa fa-times"></i>
                                                </button>`;
                                     _html += `</div>`;
          
                                     return _html;
          
                                   },
                                   "targets": _numOfColumn
                                 });
    }
    
    this._dtTable = this.elementSelector.DataTable(options);
  }
  
  private getDefaultOption() {
    return {
      ajax          : (request, drawCallback, settings) => {
        let json                = {};
        json['recordsTotal']    = this.collection.collection.find().count();
        json['recordsFiltered'] = this.collection.collection.find().count();
        json['draw']            = request.draw; // Update the echo for each response
        
        // searching
        let _selector = {};
        _.forEach(request['columns'], (v, index) => {
          if (v['searchable'] == true && !!v['search']['value']) {
            _selector[v['data']] = new RegExp(v['search']['value']);
          }
        });
        
        json['data'] = _.slice(this.collection.collection.find(_selector).fetch(), request['start'], request['length'] + request['start']);
        drawCallback(json);
      },
      processing    : true,
      serverSide    : true,
      // scrollX       : true,
      paging        : true,
      scrollCollapse: true,
      responsive    : true,
    };
  }
  
  getDtTableInstance(): any {
    if (this._dtTable) {
      return this._dtTable;
    }
    throw new CloudException('DtTable not yet created');
  }
  
  resolve() {
    if (typeof this._dtTable != "undefined") {
      this._dtTable.draw();
      if (this.reDrawCallBack) {
        this.reDrawCallBack();
      }
    } else {
      this.initDataTable();
    }
  }
}
