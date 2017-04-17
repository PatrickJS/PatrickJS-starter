import {
  MongoObservable
} from "meteor-rxjs";
import {
  Observable,
  Subscription,
  Subject
} from "rxjs";
import * as _ from "lodash";
import {CloudException} from "../CloudException";

export class MeteorDataTable {
  protected collection: MongoObservable.Collection<any>;
  protected _dtTable: any;
  protected _meteorDataTableSubscription: Subscription; // subscription automaticlly change data from server
  
  constructor(protected elementSelector: any,
              protected dataTableOptions: Object,
              protected collectionObservable: Observable<MongoObservable.Collection<any>>,
              protected callBackSubject: Subject<any>,
              protected collectionSelector = {}) {
    if (this.collectionObservable)
      this._meteorDataTableSubscription = this.collectionObservable.subscribe((collection) => {
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
      options.columns.push({data: "_id", title: "Actions"});
      
      if (!options.hasOwnProperty('columnDefs')) {
        options['columnDefs'] = [];
      }
      options['columnDefs'].push({
                                   className: "text-center",
                                   orderable: false,
                                   // The `data` parameter refers to the data for the cell (defined by the
                                   // `data` option, which defaults to the column being worked with, in
                                   // this case `data: 0`.
                                   "render" : function (data, type, row) {
                                     let _html = `<div class="btn-group">`;
                                     if (options['actionsColumn']['edit'] == true)
                                       _html += `<button class="btn btn-xs btn-default meteor-table-bt-edit" data-id="${data}" type="button" title="Edit Client">
                                                  <i class="fa fa-pencil"></i>
                                                </button>`;
                                     if (options['actionsColumn']['remove'] == true)
                                       _html += ` <button class="btn btn-xs btn-default meteor-table-bt-remove" data-id="${data}" type="button" title="Remove Client">
                                                  <i class="fa fa-times"></i>
                                                </button>`;
                                     _html += `</div>`;
          
                                     return _html;
          
                                   },
                                   "targets": [_numOfColumn]
                                 });
    }
    
    this._dtTable = this.elementSelector.DataTable(options);
  }
  
  private getDefaultOption() {
    return {
      ajax          : (request, drawCallback, settings) => {
        let json                = {};
        json['recordsTotal']    = this.collection.collection.find(this.collectionSelector).count();
        json['recordsFiltered'] = this.collection.collection.find(this.collectionSelector).count();
        json['draw']            = request.draw; // Update the echo for each response
        
        // searching
        let _selector = {};
        _.forEach(request['columns'], (v, index) => {
          if (v['searchable'] == true && !!v['search']['value']) {
            this.collectionSelector[v['data']] = new RegExp(v['search']['value']);
          }
        });
        // sort
        let sort = {};
        if (_.size(request['order']) == 1) {
          let _columnName = request['columns'][request['order'][0]['column']]['data'];
          if (_columnName) {
            sort['sort']              = {};
            sort['sort'][_columnName] = request['order'][0]['dir'] == 'asc' ? 1 : -1;
          }
        }
        _selector    = _.merge(_selector, this.collectionSelector);
        json['data'] = _.slice(this.collection.collection.find(_selector, sort).fetch(), request['start'], request['length'] + request['start']);
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
  
  getMeteorDtTableSubscription(): Subscription {
    return this._meteorDataTableSubscription;
  }
  
  resolve() {
    if (typeof this._dtTable != "undefined") {
      this._dtTable.draw();
      this.callBackSubject.next({event: "reDraw"});
    } else {
      this.initDataTable();
      let vm = this;
      setTimeout(() => {
        this.elementSelector.on('click', '.meteor-table-bt-edit', function () {
          vm.callBackSubject.next({event: 'clickEdit', data: jQuery(this).attr('data-id')})
        });
      }, 100);
      setTimeout(() => {
        this.elementSelector.on('click', '.meteor-table-bt-remove', function () {
          vm.callBackSubject.next({event: 'clickRemove', data: jQuery(this).attr('data-id')})
        });
      }, 100);
    }
  }
}
