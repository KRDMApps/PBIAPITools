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
                _this.groupId = "0";
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.getDatasets = function () {
        var _this = this;
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.getDatasets(function (datasets) {
            if (datasets) {
                _this.datasets = datasets.value;
                _this.datasetId = _this.datasets[0]["Id"];
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.deleteDataset = function () {
        var _this = this;
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.deleteDataset(function (status) {
            if (status) {
                _this.status = status;
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.createDataset = function () {
        var _this = this;
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        // Todo
        this.service.datasetSchema = "";
        this.service.createDataset(function (status) {
            if (status) {
                _this.status = status;
                _this.isLoading = false;
                _this.getDatasets();
            }
        });
    };
    PBIApiComponent.prototype.setRetentionPolicy = function (policy) {
        var _this = this;
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.policy = policy;
        this.service.setRetentionPolicy(function (status) {
            if (status) {
                _this.status = status;
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.getTables = function () {
        var _this = this;
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.getTables(function (tables) {
            if (tables) {
                _this.tables = tables.value;
                _this.tableName = _this.tables[0]["Name"];
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.updateTableSchema = function () {
        var _this = this;
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        // Todo
        this.service.tableSchema = "";
        this.service.updateTableSchema(function (status) {
            if (status) {
                _this.status = status;
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.addTableRows = function () {
        var _this = this;
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        // Todo
        this.service.tableRows = "";
        this.service.addTableRows(function (status) {
            if (status) {
                _this.status = status;
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
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.clearTable(function (status) {
            if (status) {
                _this.status = status;
                _this.isLoading = false;
            }
        });
    };
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
