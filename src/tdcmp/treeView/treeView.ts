export interface INode {
  label: string;
  data?: any;
  icon?: string;
  type?: string;
  selected?: boolean;
  huttonIcon?: string;
  menuItems?: Array<string>;
  children?: Array<INode>;
};

import {Component, Input, Output, EventEmitter, HostListener, HostBinding
  , ElementRef, OnDestroy, Renderer, ViewEncapsulation, ViewChildren
  , QueryList, ChangeDetectorRef } from '@angular/core';


  @Component({
    selector: 'treeviewnode',
    template: require('./treeViewNode.html'),
    styles: [require('./treeView.scss')],
    directives: [TreeViewNode],
    encapsulation: ViewEncapsulation.None
  })
  export class TreeViewNode {
    @Input() node: INode;
    @Input() parent: INode;
    @Input() root: TreeView;
    @ViewChildren(TreeViewNode) viewChildren: QueryList<TreeViewNode>;
    get huttonClicked(): EventEmitter<INode> {
      return this.root.huttonClicked;
    }

    collapsed: boolean = false;
    private _oldHeight;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }
    get selectedNode(): INode {
      return this.root.selectedNode;
    }

    get hasChildren(): boolean {
      return this.node.children && this.node.children.length > 0;
    }

    toggleCollapse() {
      if (this.collapsed) this.collapsed = false; else this.collapsed = true;
    }

    select(node: INode) {
      this.root.selectedNode = node;
    }

    get computeHeight(): number {
      let h = 29;
      if (this.collapsed || !this.viewChildren) return h;
      this.viewChildren.forEach(p => h += p.computeHeight);
      return h;
    }

    public get lineHight(): number {
      if (this.collapsed || !this.viewChildren) return 0;
      if (this.viewChildren.length === 0) return 0;

      let h = -10; // top of horizontal line
      this.viewChildren.forEach(p => {
            if (this.viewChildren.last !== p) h += p.computeHeight; else h += 29;
      });

      if (h !== this._oldHeight) {
        this._oldHeight = h;
        this.changeDetectorRef.detectChanges();
      }
      return h;
    }

    huttonClick(node: INode) {
      this.root.huttonClicked.emit(node);
    }

    menuClick(node: INode, text: string) {
        this.root.menuClicked.emit({node: node, text: text});
    }
  }


@Component({
  selector: 'treeview',
  template: `
  <div class="treeview" *ngIf="node">
    <treeviewnode [node]=node [root]=self></treeviewnode>
    <ng-content></ng-content>
  </div>
  `,
  styles: [require('./treeView.scss')],
  directives: [TreeViewNode],
  encapsulation: ViewEncapsulation.None
})
export class TreeView {
@Input() node: INode;
@Output() nodeSelected: EventEmitter<INode> = new EventEmitter<INode>();
@Output() huttonClicked: EventEmitter<INode> = new EventEmitter<INode>();
@Output() menuClicked: EventEmitter<any> = new EventEmitter<any>();

public get selectedNode(): INode {
  return this._selectedNode;
}
public set selectedNode(value: INode) {
  if (this._selectedNode !== value) {
    this._selectedNode = value;
    this.nodeSelected.emit(value);
  }
}
private _selectedNode: INode;

// This is used to bind parent in child nodes
get self(): TreeView {
  return this;
}




}
