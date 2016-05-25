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
var api_service_1 = require("./api.service");
var LoginComponent = (function () {
    function LoginComponent(service) {
        this.service = service;
        this.apiOccurances = 0;
        this.isLoading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.login();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.isLoading = true;
        this.service.get(function (data) {
            if (data) {
                _this.data = data;
                _this.isLoading = false;
                _this.apiOccurances++;
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "pbiapi",
            templateUrl: "/partial/pbiapi",
            providers: [api_service_1.ApiService],
            directives: common_1.CORE_DIRECTIVES
        }), 
        __metadata('design:paramtypes', [api_service_1.ApiService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map