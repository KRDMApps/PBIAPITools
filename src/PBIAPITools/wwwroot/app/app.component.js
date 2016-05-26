"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var pbiapi_component_1 = require("./pbiapi.component");
var PBIAPIToolsApp = (function () {
    function PBIAPIToolsApp(router) {
        this.router = router;
        var routes = router.routeTree;
    }
    PBIAPIToolsApp.prototype.ngOnInit = function () {
    };
    PBIAPIToolsApp.prototype.isActive = function (path) {
        return (this.router.serializeUrl(this.router.urlTree).toLowerCase() === path.toLowerCase());
    };
    PBIAPIToolsApp = __decorate([
        core_1.Component({
            selector: "app",
            template: "<div class=\"page-header\">\n                    <h1>PowerBI API Tools</h1>\n                </div>\n                <nav class=\"navbar navbar-inverse\">\n                    <div class=\"container-fluid\">\n                        <div class=\"navbar-header\">\n                            <a class=\"navbar-brand\" href=\"#\">\n                                <span class=\"glyphicon glyphicon-sunglasses\"></span>\n                            </a>\n                        </div>\n                        <ul class=\"nav navbar-nav\">\n                            <li [class.active]=\"isActive('/home')\">\n                                <a [routerLink]=\"['/home']\">Home</a>\n                            </li>\n                        </ul>\n                    </div>\n                </nav>\n                <div class=\"content padding has-header\">\n                    <router-outlet></router-outlet>\n                </div>",
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.Routes([
            { path: '/home', component: pbiapi_component_1.PBIApiComponent },
            { path: '/Home', component: pbiapi_component_1.PBIApiComponent }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], PBIAPIToolsApp);
    return PBIAPIToolsApp;
}());
exports.PBIAPIToolsApp = PBIAPIToolsApp;
