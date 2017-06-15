"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
/**
 * Load the implementations that should be tested
 */
var app_component_1 = require("./app.component");
var app_service_1 = require("./app.service");
describe("App", function () {
    var comp;
    var fixture;
    /**
     * async beforeEach
     */
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [app_component_1.AppComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [app_service_1.AppState]
        })
            .compileComponents();
    }));
    /**
     * Synchronous beforeEach
     */
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        comp = fixture.componentInstance;
        /**
         * Trigger initial data binding
         */
        fixture.detectChanges();
    });
    it("should be readly initialized", function () {
        expect(fixture).toBeDefined();
        expect(comp).toBeDefined();
    });
    it("should be @AngularClass", function () {
        expect(comp.url).toEqual('https://twitter.com/AngularClass');
        expect(comp.angularclassLogo).toEqual('assets/img/angularclass-avatar.png');
        expect(comp.name).toEqual('Angular 2 Webpack Starter');
    });
    it('should log ngOnInit', function () {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        comp.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    });
});
