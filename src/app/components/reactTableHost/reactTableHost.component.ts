import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import {Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit} from '@angular/core';
import { ReactTableHost } from './reactTableHost.jsx';

interface ReactTableHostProps {
  data: (any);
  isLoading?: boolean;
  noResultsMessage?: string;
  options?: (any);
  selected?: (any);
  onSelectionChange?: (any);
  selectType?: string;
}

@Component({
  selector: 'react-table-host',
  template: '<div [id]="rootDomID"></div>'
})

export class ReactTableHostComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    @Input() data: (any);
    @Input() isLoading?: boolean;
    @Input() noResultsMessage?: string;
    @Input() options?: (any);
    @Input() selected?: (any);
    @Input() onSelectionChange?: (any);
    @Input() selectType?: string;

    private rootDomID: string;

    protected getRootDomNode() {
      const node = document.getElementById(this.rootDomID);
      invariant(node, `Node '${this.rootDomID} not found!`);
      return node;
    }

    protected getProps(): ReactTableHostProps {
      const {
        data,
        isLoading,
        noResultsMessage,
        options,
        selected,
        onSelectionChange,
        selectType
      } = this;

      return {
        data,
        isLoading,
        noResultsMessage,
        options,
        selected,
        onSelectionChange,
        selectType
      };
    }

    private isMounted(): boolean {
      return !!this.rootDomID;
    }

    protected render() {
      if (this.isMounted()) {
        ReactDOM.render(React.createElement(ReactTableHost, this.getProps()), this.getRootDomNode());
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