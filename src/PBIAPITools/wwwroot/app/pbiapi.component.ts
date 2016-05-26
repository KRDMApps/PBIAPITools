import {Component, OnInit} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {Router} from '@angular/router';
import {PBIApiService} from "./pbiapi.service";

@Component({
    selector: "pbiapi",
    templateUrl: "/partial/pbiapi",
    providers: [PBIApiService],
    directives: CORE_DIRECTIVES
})
export class PBIApiComponent implements OnInit {
    result: any[][];
    groups: any[][];
    datasets: any[][];
    tables: any[][];
    status: any[][];
    groupId: string;
    datasetId: string;
    tableName: string;
    isLoading: boolean = false;

    constructor(private service: PBIApiService, private router: Router) { }

    ngOnInit() {
        this.get();
    }

    get() {
        this.isLoading = true;
        this.service.get(result => {
            if (result) {
                if (result == "unauthenticated") {
                    this.router.navigate(['/login']);
                }
                this.isLoading = false;
            }
        });
    }

    getGroups() {
        this.isLoading = true;
        this.service.getGroups(groups => {
            if (groups) {
                console.log(groups);
                this.isLoading = false;
            }
        });
    }

    getDatasets(groupId: string) {
        this.isLoading = true;
        this.service.groupId = groupId;
        this.service.getDatasets(datasets => {
            if (datasets) {
                console.log(datasets);
                this.isLoading = false;
            }
        });
    }

    getTables(groupId: string, datasetId: string) {
        this.isLoading = true;
        this.service.groupId = groupId;
        this.service.datasetId = datasetId;
        this.service.getTables(tables => {
            if (tables) {
                console.log(tables);
                this.isLoading = false;
            }
        });
    }

    clearTable(groupId: string, datasetId: string, tableName: string) {
        this.isLoading = true;
        this.service.groupId = groupId;
        this.service.datasetId = datasetId;
        this.service.tableName = tableName;
        var test = this.service.clearTable(status => {
            if (status) {
                console.log(status);
                this.isLoading = false;
            }
        });
    }
}