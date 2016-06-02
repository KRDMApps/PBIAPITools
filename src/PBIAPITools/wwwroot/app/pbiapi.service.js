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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
require("./rxjs.operators");
var PBIApiService = (function () {
    function PBIApiService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    PBIApiService.prototype.get = function (onNext) {
        this.http.get("api/pbiapi").map(function (response) { return response.text(); }).subscribe(onNext, function (err) { return console.error(err); });
    };
    PBIApiService.prototype.getGroups = function (onNext) {
        this.http.get("api/pbiapi/groups").map(function (response) { return response.json(); }).subscribe(onNext, function (err) { return console.error(err); });
    };
    PBIApiService.prototype.getDatasets = function (onNext) {
        if (this.useGroup) {
            this.http.get("api/pbiapi/groups/" + this.groupId + "/datasets").map(function (response) { return response.json(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
        else {
            this.http.get("api/pbiapi/datasets").map(function (response) { return response.json(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
    };
    PBIApiService.prototype.deleteDataset = function (onNext) {
        if (this.useGroup) {
            this.http.delete("api/pbiapi/groups/" + this.groupId + "/datasets/delete/" + this.datasetId).map(function (response) { return response.text(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
        else {
            this.http.delete("api/pbiapi/datasets/delete/" + this.datasetId).map(function (response) { return response.text(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
    };
    PBIApiService.prototype.createDataset = function (onNext) {
        if (this.useGroup) {
            this.http.post("api/pbiapi/groups/" + this.groupId + "/datasets/create/" + this.policy, JSON.stringify(this.datasetSchema), this.options).map(function (response) { return response.text(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
        else {
            this.http.post("api/pbiapi/datasets/create/" + this.policy, JSON.stringify(this.datasetSchema), this.options).map(function (response) { return response.text(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
    };
    PBIApiService.prototype.getTables = function (onNext) {
        if (this.useGroup) {
            this.http.get("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables").map(function (response) { return response.json(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
        else {
            this.http.get("api/pbiapi/datasets/" + this.datasetId + "/tables").map(function (response) { return response.json(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
    };
    PBIApiService.prototype.updateTableSchema = function (onNext) {
        if (this.useGroup) {
            this.http.put("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables/update/" + this.tableName, JSON.stringify(this.tableSchema), this.options).map(function (response) { return response.text(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
        else {
            this.http.put("api/pbiapi/datasets/" + this.datasetId + "/tables/update/" + this.tableName, JSON.stringify(this.tableSchema), this.options).map(function (response) { return response.text(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
    };
    PBIApiService.prototype.addTableRows = function (onNext) {
        if (this.useGroup) {
            this.http.post("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables/" + this.tableName + "/rows/add", JSON.stringify(this.tableRows), this.options).map(function (response) { return response.text(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
        else {
            this.http.post("api/pbiapi/datasets/" + this.datasetId + "/tables/" + this.tableName + "/rows/add", JSON.stringify(this.tableRows), this.options).map(function (response) { return response.text(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
    };
    PBIApiService.prototype.clearTable = function (onNext) {
        if (this.useGroup) {
            this.http.delete("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables/clear/" + this.tableName + "/rows").map(function (response) { return response.text(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
        else {
            this.http.delete("api/pbiapi/datasets/" + this.datasetId + "/tables/clear/" + this.tableName + "/rows").map(function (response) { return response.text(); }).subscribe(onNext, function (err) { return console.error(err); });
        }
    };
    PBIApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PBIApiService);
    return PBIApiService;
}());
exports.PBIApiService = PBIApiService;
