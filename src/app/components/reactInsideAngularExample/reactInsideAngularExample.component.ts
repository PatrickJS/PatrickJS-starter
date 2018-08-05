import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import {Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit} from '@angular/core';
import { ReactInsideAngularExample } from './reactInsideAngularExample.jsx';

@Component({
  selector: 'react-inside-angular-example',
  template: '<span [id]="rootDomID"></span>'
})

export class ReactInsideAngularExampleComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

    private rootDomID: string;

    protected getRootDomNode() {
      const node = document.getElementById(this.rootDomID);
      invariant(node, `Node '${this.rootDomID} not found!`);
      return node;
    }

    private isMounted(): boolean {
      return !!this.rootDomID;
    }

    protected render() {
      if (this.isMounted()) {
        ReactDOM.render(React.createElement(ReactInsideAngularExample), this.getRootDomNode());
      }
    }

    ngOnInit() {
      this.rootDomID = uuid.v1();
    }

    ngOnChanges() {
      this.render();
    }

    ngAfterViewInit() {
      this.render();
    }

    ngOnDestroy() {
      ReactDOM.unmountComponentAtNode(this.getRootDomNode());
    }
}