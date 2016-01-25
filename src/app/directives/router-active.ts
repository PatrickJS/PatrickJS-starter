import {Router} from 'angular2/router';
import {isPresent} from 'angular2/src/facade/lang';
import {
  Directive,
  Query,
  QueryList,
  Attribute,
  ElementRef,
  Renderer,
  Optional
} from 'angular2/core';
import {Instruction, RouterLink} from 'angular2/router';

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
  selector: '[router-active], [routerActive]',
  inputs: ['routerActive']
})
export class RouterActive {
  routerActive: string = null;
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
    this.router.subscribe(() => {
      if (this.routerLink.first) {
        let active = this.routerLink.first.isRouteActive;
        this.renderer.setElementClass(this.element.nativeElement, this._attrOrProp(), active);
      }
    });

  }

  private _defaultAttrValue(attr?: string) {
    return this.routerActiveAttr = attr || this.routerActiveAttr;
  }

  private _attrOrProp() {
    return isPresent(this.routerActive) ? this.routerActive : this.routerActiveAttr;
  }
}
