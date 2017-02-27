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
    if (this._dtTable)
      this._dtTable.draw();
    else
      this.initDataTable();
  }
}
