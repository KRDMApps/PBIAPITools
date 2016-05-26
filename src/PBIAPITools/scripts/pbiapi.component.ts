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
    groupId: any;
    datasetId: any;
    tableName: any;
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
                this.groups = groups.value;
                console.log(groups.value);
                this.isLoading = false;
            }
        });
    }

    getDatasets() {
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.getDatasets(datasets => {
            if (datasets) {
                this.datasets = datasets.value;
                console.log(datasets.value);
                this.isLoading = false;
            }
        });
    }

    getTables() {
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.getTables(tables => {
            if (tables) {
                this.tables = tables.value;
                console.log(tables.value);
                this.isLoading = false;
            }
        });
    }

    clearTable() {
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        var test = this.service.clearTable(status => {
            if (status) {
                this.status = status;
                console.log(status);
                this.isLoading = false;
            }
        });
    }

    onSelect(value: string) { }
}