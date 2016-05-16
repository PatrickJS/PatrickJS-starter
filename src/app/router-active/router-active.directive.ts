import {
  Attribute,
  Directive,
  ElementRef,
  Input,
  Optional,
  Query,
  QueryList,
  Renderer
} from '@angular/core';
import { isPresent } from '@angular/core/src/facade/lang';
import { Instruction, Router, RouterLink } from '@angular/router-deprecated';

/**
 * RouterActive dynamically finds the first element with routerLink and toggles the active class
 *
 * ## Use
 *
 * ```
 * <li router-active="active"><a [routerLink]=" ['/Home'] ">Home</a></li>
 * <li [routerActive]=" activeStringValue "><a [routerLink]=" ['/Home'] ">Home</a></li>
 * ```
 */
@Directive({
  selector: '[router-active]'
})
export class RouterActive {
  @Input() routerActive: string = undefined;
  routerActiveAttr: string = 'active';

  constructor(
    public router: Router,
    public element: ElementRef,
    public renderer: Renderer,
    @Query(RouterLink) public routerLink: QueryList<RouterLink>,
    @Optional() @Attribute('router-active') routerActiveAttr?: string) {

      this.routerActiveAttr = this._defaultAttrValue(routerActiveAttr);
  }

  ngOnInit() {
    this.routerLink.changes.subscribe(() => {
      if (this.routerLink.first) {
        this._updateClass();
        this._findRootRouter().subscribe(() => {
          this._updateClass();
        });
      }
    });
  }

  private _findRootRouter(): Router {
    let router: Router = this.router;
    while (isPresent(router.parent)) {
      router = router.parent;
    }
    return router;
  }

  private _updateClass() {
    let active = this.routerLink.first.isRouteActive;
    this.renderer.setElementClass(this.element.nativeElement, this._attrOrProp(), active);
  }

  private _defaultAttrValue(attr?: string) {
    return this.routerActiveAttr = attr || this.routerActiveAttr;
  }

  private _attrOrProp() {
    return isPresent(this.routerActive) ? this.routerActive : this.routerActiveAttr;
  }
}
