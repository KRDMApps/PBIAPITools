import {Http, Headers, RequestOptions} from "@angular/http";
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
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

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
            this.http.delete("api/pbiapi/groups/" + this.groupId + "/datasets/delete/" + this.datasetId).map(response => response.text()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.delete("api/pbiapi/datasets/delete/" + this.datasetId).map(response => response.text()).subscribe(onNext, err => console.error(err));
        }
    }

    createDataset(onNext: (json: any) => void) {
        if (this.useGroup) {
            this.http.post("api/pbiapi/groups/" + this.groupId + "/datasets/create/" + this.policy, JSON.stringify(this.datasetSchema), this.options).map(response => response.text()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.post("api/pbiapi/datasets/create/" + this.policy, JSON.stringify(this.datasetSchema), this.options).map(response => response.text()).subscribe(onNext, err => console.error(err));
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
            this.http.put("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables/update/" + this.tableName, JSON.stringify(this.tableSchema), this.options).map(response => response.text()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.put("api/pbiapi/datasets/" + this.datasetId + "/tables/update/" + this.tableName, JSON.stringify(this.tableSchema), this.options).map(response => response.text()).subscribe(onNext, err => console.error(err));
        }
    }

    addTableRows(onNext: (json: any) => void) {
        if (this.useGroup) {
            this.http.post("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables/" + this.tableName + "/rows/add", JSON.stringify(this.tableRows), this.options).map(response => response.text()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.post("api/pbiapi/datasets/" + this.datasetId + "/tables/" + this.tableName + "/rows/add", JSON.stringify(this.tableRows), this.options).map(response => response.text()).subscribe(onNext, err => console.error(err));
        }
    }

    clearTable(onNext: (json: any) => void) {
        if (this.useGroup) {
            this.http.delete("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables/clear/" + this.tableName + "/rows").map(response => response.text()).subscribe(onNext, err => console.error(err));
        } else {
            this.http.delete("api/pbiapi/datasets/" + this.datasetId + "/tables/clear/" + this.tableName + "/rows").map(response => response.text()).subscribe(onNext, err => console.error(err));
        }
    }
}