import "rxjs/Rx"
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class PBIApiService {
    groupId: string;
    datasetId: string;
    tableName: string;

    constructor(private http: Http) { }

    get(onNext: (json: any) => void) {
        this.http.get("api/pbiapi").map(response => response.text()).subscribe(onNext, err => console.error(err));
    }

    getGroups(onNext: (json: any) => void) {
        this.http.get("api/pbiapi/groups").map(response => response.text()).subscribe(onNext, err => console.error(err));
    }

    getDatasets(onNext: (json: any) => void) {
        this.http.get("api/pbiapi/groups/" + this.groupId + "/datasets").map(response => response.text()).subscribe(onNext, err => console.error(err));
    }

    getTables(onNext: (json: any) => void) {
        this.http.get("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables").map(response => response.text()).subscribe(onNext, err => console.error(err));
    }

    clearTable(onNext: (json: any) => void) {
        this.http.delete("api/pbiapi/groups/" + this.groupId + "/datasets/" + this.datasetId + "/tables/" + this.tableName + "/rows").map(response => response.text()).subscribe(onNext, err => console.error(err));
    }
}