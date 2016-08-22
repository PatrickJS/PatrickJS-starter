import {Component, ViewChild, ViewChild} from "@angular/core";
import { Form } from "angular2-schema-form";
import { ActivatedRoute } from "@angular/router";
import { WidgetRegistry } from "angular2-schema-form";
import { FormService } from "./form.service"
import { SchemaForm } from "./schemaform";
import { DROPDOWN_DIRECTIVES } from "ng2-dropdown";

import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ChartComponent} from "./chart.component";


@Component({
  selector: "schema-form-demo-app",
  directives: [ Form, ChartComponent ],
  templateUrl: "./simpleform.component.html",
  styleUrls: ["./simpleform.component.css"],
  providers: [ WidgetRegistry, FormService ]
})

export class SimpleForm {
  schema: Object;
  model: Object;
  public schemaForms: SchemaForm[];
  active = false;
  formChosen = false;
  submission: string;
  haveSubmitted = false;

  @ViewChild('chart') child;

  private postUrl = "http://127.0.0.1:5000/rx/tricky";
  formActions = {
    "submit": (form) => {this.onSubmit(form.value)},
    "reset": (form) => {this.resetForm(form)}
  };

  constructor(public route: ActivatedRoute,
              private formService: FormService,
              private http: Http) {
    // this.schema = require("./sampleschema.json");
    // this.model = require("./samplemodel.json");

  }

  ngOnInit() {
    this.getSchemaForms();
  }

  getSchemaForms(): void {
    this.formService.getForms().then(forms => this.setSchemaForm(forms));
  }

  setSchemaForm(forms: SchemaForm[]): void {
    this.schemaForms = forms;
    this.active = true;
  }

  chooseForm(schemaForm: SchemaForm): void {
    this.schema = schemaForm.schema;
    this.model = schemaForm.model;
    this.formChosen = true;
  }

  onSubmit(submission: Object): void {
    this.post(submission);
    this.submission = JSON.stringify(submission);
    this.haveSubmitted = true;
  }

  private post(submission: Object): void {
    let headers = new Headers({
      'Content-Type': 'application/json'});
    this.http
      .post(this.postUrl, JSON.stringify(submission), {headers: headers})
      .toPromise()
      .then(res => this.handlePostResponse(res))
      .catch(this.handleError);
  }

  private handlePostResponse(response: Response): void {
    if (this.haveSubmitted) {
      let data = response.json().data;
      console.log(data);
      // this.chartTsData = data;
      this.child.populateChart(data);
    }
  }

  private resetForm(form: Form): void {
    setTimeout(() => {this.haveSubmitted = false;}, 0);
}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
