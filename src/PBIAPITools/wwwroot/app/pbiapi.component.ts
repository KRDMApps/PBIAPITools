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
    tableSchema: string;
    datasetSchema: string;
    isLoading: boolean = false;
    useGroup: boolean = (this.groupId && this.groupId != "0" && this.groupId != "1") ? true : false;

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
                this.groupId = "0";
                this.isLoading = false;
            }
        });
    }

    getDatasets() {
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.useGroup = this.useGroup;
        this.service.getDatasets(datasets => {
            if (datasets) {
                this.datasets = datasets.value;
                this.datasetId = this.datasets[0]["Id"];
                this.isLoading = false;
            }
        });
    }

    deleteDataset() {
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.useGroup = this.useGroup;
        this.service.deleteDataset(status => {
            if (status) {
                this.status = status;
                this.isLoading = false;
            }
        });
    }

    createDataset() {
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.useGroup = this.useGroup;
        // Todo
        this.service.datasetSchema = "";
        this.service.createDataset(status => {
            if (status) {
                this.status = status;
                this.isLoading = false;
                this.getDatasets();
            }
        });
    }

    setRetentionPolicy(policy: string) {
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.useGroup = this.useGroup;
        this.service.policy = policy;
        this.service.setRetentionPolicy(status => {
            if (status) {
                this.status = status;
                this.isLoading = false;
            }
        });
    }

    getTables() {
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.useGroup = this.useGroup;
        this.service.getTables(tables => {
            if (tables) {
                this.tables = tables.value;
                this.tableName = this.tables[0]["Name"];
                this.isLoading = false;
            }
        });
    }

    updateTableSchema() {
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        this.service.useGroup = this.useGroup;
        // Todo
        this.service.tableSchema = "";
        this.service.updateTableSchema(status => {
            if (status) {
                this.status = status;
                this.isLoading = false;
            }
        });
    }

    addTableRows() {
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        this.service.useGroup = this.useGroup;
        // Todo
        this.service.tableRows = "";
        this.service.addTableRows(status => {
            if (status) {
                this.status = status;
                this.isLoading = false;
            }
        });
    }

    clearTable() {
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        this.service.useGroup = this.useGroup;
        this.service.clearTable(status => {
            if (status) {
                this.status = status;
                this.isLoading = false;
            }
        });
    }
}