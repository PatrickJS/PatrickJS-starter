import {Router} from 'angular2/router';
import {isPresent} from 'angular2/src/facade/lang';
import {Directive, Query, QueryList, Attribute, ElementRef, Renderer} from 'angular2/core';
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
  selector: '[router-active]',
  inputs: ['routerActive']
})
export class RouterActive {
  routerActive: string = null;
  routerActiveAttr: string = 'active';

  constructor(
    router: Router,
    element: ElementRef,
    renderer: Renderer,
    @Query(RouterLink) routerLink: QueryList<RouterLink>,
    @Attribute('router-active') routerActiveAttr: string) {

    router.subscribe(() => {
      let active = (<any>routerLink).first.isRouteActive;
      renderer.setElementClass(element.nativeElement, this._attrOrProp(), active);
    });
  }
  private _attrOrProp() {
    return isPresent(this.routerActive) ? this.routerActive : this.routerActiveAttr;
  }
}
