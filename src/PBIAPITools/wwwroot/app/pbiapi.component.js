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
var pbiapi_service_1 = require("./pbiapi.service");
var PBIApiComponent = (function () {
    function PBIApiComponent(service, router) {
        this.service = service;
        this.router = router;
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
            }
        });
    };
    PBIApiComponent.prototype.getGroups = function () {
        var _this = this;
        this.isLoading = true;
        this.service.getGroups(function (groups) {
            if (groups) {
                _this.groups = groups.value;
                console.log(groups.value);
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.getDatasets = function () {
        var _this = this;
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.getDatasets(function (datasets) {
            if (datasets) {
                _this.datasets = datasets.value;
                console.log(datasets.value);
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.getTables = function () {
        var _this = this;
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.getTables(function (tables) {
            if (tables) {
                _this.tables = tables.value;
                console.log(tables.value);
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.clearTable = function () {
        var _this = this;
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        var test = this.service.clearTable(function (status) {
            if (status) {
                _this.status = status;
                console.log(status);
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.onSelect = function (value) { };
    PBIApiComponent = __decorate([
        core_1.Component({
            selector: "pbiapi",
            templateUrl: "/partial/pbiapi",
            providers: [pbiapi_service_1.PBIApiService],
            directives: common_1.CORE_DIRECTIVES
        }), 
        __metadata('design:paramtypes', [pbiapi_service_1.PBIApiService, router_1.Router])
    ], PBIApiComponent);
    return PBIApiComponent;
}());
exports.PBIApiComponent = PBIApiComponent;
