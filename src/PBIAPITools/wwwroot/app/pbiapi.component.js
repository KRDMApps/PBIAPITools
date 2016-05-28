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
var router_1 = require("@angular/router");
var pbiapi_service_1 = require("./pbiapi.service");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var PBIApiComponent = (function () {
    function PBIApiComponent(service, router) {
        this.service = service;
        this.router = router;
        this.isLoading = false;
        this.showDataTypes = false;
        this.showPolicy = false;
        this.policy = "basicFIFO";
        this.defaultTableSchema = "{\n        \"name\": \"Product\", \"columns\": \n        [\n            { \"name\": \"ProductID\", \"dataType\": \"Int64\"},\n            { \"name\": \"Name\", \"dataType\": \"string\"},\n            { \"name\": \"Category\", \"dataType\": \"string\"},\n            { \"name\": \"IsCompete\", \"dataType\": \"bool\"},\n            { \"name\": \"ManufacturedOn\", \"dataType\": \"DateTime\"},\n            { \"name\": \"NewColumn\", \"dataType\": \"string\"}\n        ]\n    }";
        this.defaultDatasetSchema = "{\n        \"name\": \"SalesMarketing\",\n        \"tables\": \n        [\n            {\n            \"name\": \"Product\", \"columns\": \n                [\n                { \"name\": \"ProductID\", \"dataType\": \"Int64\"},\n                { \"name\": \"Name\", \"dataType\": \"string\"},\n                { \"name\": \"Category\", \"dataType\": \"string\"},\n                { \"name\": \"IsCompete\", \"dataType\": \"bool\"},\n                { \"name\": \"ManufacturedOn\", \"dataType\": \"DateTime\"}\n                ]\n            }\n        ]\n    }";
        this.defaultTableRows = "{\n        \"rows\": \n        [\n                {\n                \"ProductID\":1,\n                \"Name\":\"Adjustable Race\",\n                \"Category\":\"Components\",\n                \"IsCompete\":true,\n                \"ManufacturedOn\":\"07/30/2014\"\n            }\n        ]\n    }";
        this.createModalText = "Create";
        this.createModalClick = function () { };
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
                    _this.router.navigate(["/login"]);
                }
                _this.isLoading = false;
                _this.getGroups();
            }
        });
    };
    PBIApiComponent.prototype.getGroups = function () {
        var _this = this;
        this.message = "";
        this.isLoading = true;
        this.service.getGroups(function (groups) {
            if (groups) {
                _this.groups = groups.value;
                _this.groupId = "0";
                _this.isLoading = false;
                _this.datasets = [];
                _this.tables = [];
            }
        });
    };
    PBIApiComponent.prototype.getDatasets = function (clear) {
        var _this = this;
        if (clear)
            this.message = "";
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.getDatasets(function (datasets) {
            if (datasets) {
                _this.datasets = datasets.value;
                _this.datasetId = _this.datasets[0]["Id"];
                _this.isLoading = false;
                _this.tables = [];
            }
        });
    };
    PBIApiComponent.prototype.deleteDataset = function () {
        var _this = this;
        this.message = "";
        this.openModal.dismiss();
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.deleteDataset(function (status) {
            if (status) {
                _this.message = "Successfully deleted the selected dataset";
                _this.isLoading = false;
                _this.getDatasets(false);
            }
        });
    };
    PBIApiComponent.prototype.createDataset = function () {
        var _this = this;
        this.message = "";
        this.openModal.dismiss();
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.policy = this.policy;
        this.service.datasetSchema = JSON.stringify(JSON.parse(this.schemaContent));
        this.service.createDataset(function (status) {
            if (status) {
                _this.message = "Successfully created the dataset";
                _this.isLoading = false;
                _this.getDatasets(false);
            }
        });
    };
    PBIApiComponent.prototype.getTables = function (clear) {
        var _this = this;
        if (clear)
            this.message = "";
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
        this.message = "";
        this.openModal.dismiss();
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.tableSchema = JSON.stringify(JSON.parse(this.schemaContent));
        this.service.updateTableSchema(function (status) {
            if (status) {
                _this.message = "Successfully updated the schema for the selected table";
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.addTableRows = function () {
        var _this = this;
        this.message = "";
        this.openModal.dismiss();
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.tableRows = JSON.stringify(JSON.parse(this.schemaContent));
        this.service.addTableRows(function (status) {
            if (status) {
                _this.message = "Successfully added rows to the selected table";
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.clearTable = function () {
        var _this = this;
        this.message = "";
        this.openModal.dismiss();
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.clearTable(function (status) {
            if (status) {
                _this.message = "Successfully cleared all data from the selected table";
                _this.isLoading = false;
            }
        });
    };
    PBIApiComponent.prototype.modalOpen = function (modal, msgType, size) {
        this.message = "";
        this.openModal = modal;
        this.modalContent = "";
        this.schemaContent = "";
        this.createModalText = "Create";
        this.showDataTypes = false;
        this.showPolicy = false;
        this.createModalClick = function () { };
        switch (msgType) {
            case "deleteDataset":
                this.modalContent = "Are you sure you would like to delete this dataset?";
                this.confirmed = this.deleteDataset;
                break;
            case "clearTable":
                this.modalContent = "Are you sure you would like to clear this table's data?";
                this.confirmed = this.clearTable;
                break;
            case "createDataset":
                this.schemaContent = this.defaultDatasetSchema;
                this.showDataTypes = true;
                this.showPolicy = true;
                this.createModalClick = this.createDataset;
                break;
            case "addTableRows":
                this.createModalText = "Add";
                this.schemaContent = this.defaultTableRows;
                this.createModalClick = this.addTableRows;
                break;
            case "updateTableSchema":
                this.createModalText = "Update";
                this.schemaContent = this.defaultTableSchema;
                this.createModalClick = this.updateTableSchema;
                break;
        }
        modal.open(size);
    };
    PBIApiComponent = __decorate([
        core_1.Component({
            selector: "pbiapi",
            templateUrl: "/partial/pbiapi",
            providers: [pbiapi_service_1.PBIApiService],
            directives: [common_1.CORE_DIRECTIVES, ng2_bs3_modal_1.MODAL_DIRECTIVES],
            styles: [
                ".ng-valid[required] {\n            border-left: 5px solid #5cb85c; /* green */\n        }",
                ".ng-invalid {\n            border-left: 5px solid #d9534f; /* red */\n        }"
            ]
        }), 
        __metadata('design:paramtypes', [pbiapi_service_1.PBIApiService, router_1.Router])
    ], PBIApiComponent);
    return PBIApiComponent;
}());
exports.PBIApiComponent = PBIApiComponent;
//# sourceMappingURL=pbiapi.component.js.map