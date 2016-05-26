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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require('@angular/router');
var api_service_1 = require("./api.service");
var PBIApiComponent = (function () {
    function PBIApiComponent(service, router) {
        this.service = service;
        this.router = router;
        this.apiOccurances = 0;
        this.isLoading = false;
    }
    PBIApiComponent.prototype.ngOnInit = function () {
        this.get();
    };
    PBIApiComponent.prototype.get = function () {
        var _this = this;
        this.isLoading = true;
        this.service.get(function (result) {
            if (result) {
                if (result == "unauthenticated") {
                    _this.router.navigate(['/login']);
                }
                _this.isLoading = false;
                _this.apiOccurances++;
            }
        });
    };
    PBIApiComponent.prototype.getGroups = function () {
        var _this = this;
        this.isLoading = true;
        this.service.getGroups(function (result) {
            console.log(result);
            if (result) {
                console.log(result);
                _this.isLoading = false;
                _this.apiOccurances++;
            }
        });
    };
    PBIApiComponent = __decorate([
        core_1.Component({
            selector: "pbiapi",
            templateUrl: "/partial/pbiapi",
            providers: [api_service_1.ApiService],
            directives: common_1.CORE_DIRECTIVES
        }), 
        __metadata('design:paramtypes', [api_service_1.ApiService, router_1.Router])
    ], PBIApiComponent);
    return PBIApiComponent;
}());
exports.PBIApiComponent = PBIApiComponent;
//# sourceMappingURL=api.component.js.map