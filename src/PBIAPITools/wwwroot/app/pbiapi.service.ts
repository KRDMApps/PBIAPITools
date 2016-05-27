import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import "./rxjs.operators";

@Injectable()
export class PBIApiService {
    groupId: string;
    datasetId: string;
    tableName: string;
    useGroup: boolean;
    tableSchema: string;
    datasetSchema: string;
    policy: string;
    tableRows: string;

    constructor(private http: Http) { }

    get(onNext: (json: any) => void) {
        this.http.get("api/pbiapi").map(response => response.text()).subscribe(onNext, err => console.error(err));
    }

    getGroups(onNext: (json: any) => void) {
        this.http.get("api/pbiapi/groups").map(response => response.json()).subscribe(onNext, err => console.error(err));
    }

    getDatasets(onNext: (json: any) => void) {
        if (this.useGroup) {
            this.http.get("api/pbiapi/groups/" + this.groupId + "/datasets").map(response => response.json()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.get("api/pbiapi/datasets").map(response => response.json()).subscribe(onNext, err => console.error(err));
        }
    }

    deleteDataset(onNext: (json: any) => void) {
        if (this.useGroup) {
            this.http.delete("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId).map(response => response.json()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.delete("api/pbiapi/datasets/" + this.datasetId).map(response => response.json()).subscribe(onNext, err => console.error(err));
        }
    }

    createDataset(onNext: (json: any) => void) {
        if (this.useGroup) {
            this.http.post("api/pbiapi/groups/" + this.groupId + "/datasets", this.datasetSchema).map(response => response.json()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.post("api/pbiapi/datasets", this.datasetSchema).map(response => response.json()).subscribe(onNext, err => console.error(err));
        }
    }

    setRetentionPolicy(onNext: (json: any) => void) {
        if (this.useGroup) {
            this.http.post("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.policy, "").map(response => response.json()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.post("api/pbiapi/datasets/" + this.policy, "").map(response => response.json()).subscribe(onNext, err => console.error(err));
        }
    }

    getTables(onNext: (json: any) => void) {
        if (this.useGroup) {
            this.http.get("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables").map(response => response.json()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.get("api/pbiapi/datasets/" + this.datasetId + "/tables").map(response => response.json()).subscribe(onNext, err => console.error(err));
        }
    }

    updateTableSchema(onNext: (json: any) => void) {
        if (this.useGroup) {
            this.http.put("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables/" + this.tableName, this.tableSchema).map(response => response.json()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.put("api/pbiapi/datasets/" + this.datasetId + "/tables/" + this.tableName, this.tableSchema).map(response => response.json()).subscribe(onNext, err => console.error(err));
        }
    }

    addTableRows(onNext: (json: any) => void) {
        if (this.useGroup) {
            this.http.post("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables/" + this.tableName + "/rows", this.tableRows).map(response => response.json()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.post("api/pbiapi/datasets/" + this.datasetId + "/tables/" + this.tableName + "/rows", this.tableRows).map(response => response.json()).subscribe(onNext, err => console.error(err));
        }
    }

    clearTable(onNext: (json: any) => void) {
        if (this.useGroup) {
            this.http.delete("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables/" + this.tableName + "/rows").map(response => response.text()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.delete("api/pbiapi/datasets/" + this.datasetId + "/tables/" + this.tableName + "/rows").map(response => response.text()).subscribe(onNext, err => console.error(err));
        }
    }
}