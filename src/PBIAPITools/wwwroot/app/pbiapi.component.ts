import {Component, OnInit, ViewChild} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {Router} from "@angular/router";
import {PBIApiService} from "./pbiapi.service";
import {MODAL_DIRECTIVES, ModalResult, ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
    selector: "pbiapi",
    templateUrl: "/partial/pbiapi",
    providers: [PBIApiService],
    directives: [CORE_DIRECTIVES, MODAL_DIRECTIVES],
    styles: [
        `.ng-valid[required] {
            border-left: 5px solid #5cb85c; /* green */
        }`,
        `.ng-invalid {
            border-left: 5px solid #d9534f; /* red */
        }`
    ]
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
    showDataTypes: boolean = false;
    showPolicy: boolean = false;
    openModal: ModalComponent;
    modalContent: string;
    modalTitle: string;
    confirmed: any;
    message: string;
    policy: string = "basicFIFO";
    defaultTableSchema: string = `{
        "name": "Product", "columns": 
        [
            { "name": "ProductID", "dataType": "Int64"},
            { "name": "Name", "dataType": "string"},
            { "name": "Category", "dataType": "string"},
            { "name": "IsCompete", "dataType": "bool"},
            { "name": "ManufacturedOn", "dataType": "DateTime"},
            { "name": "NewColumn", "dataType": "string"}
        ]
    }`;
    defaultDatasetSchema: string = `{
        "name": "SalesMarketing",
        "tables": 
        [
            {
            "name": "Product", "columns": 
                [
                { "name": "ProductID", "dataType": "Int64"},
                { "name": "Name", "dataType": "string"},
                { "name": "Category", "dataType": "string"},
                { "name": "IsCompete", "dataType": "bool"},
                { "name": "ManufacturedOn", "dataType": "DateTime"}
                ]
            }
        ]
    }`;
    defaultTableRows: string = `{
        "rows": 
        [
                {
                "ProductID":1,
                "Name":"Adjustable Race",
                "Category":"Components",
                "IsCompete":true,
                "ManufacturedOn":"07/30/2014"
            }
        ]
    }`;
    schemaContent: string;
    createModalText: string = "Create";
    createModalClick = () => { };

    constructor(private service: PBIApiService, private router: Router) { }

    ngOnInit() {
        this.get();
    }

    get() {
        this.isLoading = true;
        this.service.get(result => {
            if (result) {
                if (result == "unauthenticated") {
                    this.router.navigate(["/login"]);
                }
                this.isLoading = false;
                this.getGroups();
            }
        });
    }

    getGroups() {
        this.message = "";
        this.isLoading = true;
        this.service.getGroups(groups => {
            if (groups) {
                this.groups = groups.value;
                this.groupId = "0";
                this.isLoading = false;
                this.datasets = [];
                this.tables = [];
            }
        });
    }

    getDatasets(clear: boolean) {
        if (clear) this.message = "";
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.getDatasets(datasets => {
            if (datasets) {
                this.datasets = datasets.value;
                this.datasetId = this.datasets[0]["Id"];
                this.isLoading = false;
                this.tables = [];
            }
        });
    }

    deleteDataset() {
        this.message = "";
        this.openModal.dismiss();
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.deleteDataset(status => {
            if (status) {
                this.message = "Successfully deleted the selected dataset";
                this.isLoading = false;
                this.getDatasets(false);
            }
        });
    }

    createDataset() {
        this.message = "";
        this.openModal.dismiss();
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.policy = this.policy;
        this.service.datasetSchema = JSON.stringify(JSON.parse(this.schemaContent));
        this.service.createDataset(status => {
            if (status) {
                this.message = "Successfully created the dataset";
                this.isLoading = false;
                this.getDatasets(false);
            }
        });
    }

    getTables(clear: boolean) {
        if (clear) this.message = "";
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.getTables(tables => {
            if (tables) {
                this.tables = tables.value;
                this.tableName = this.tables[0]["Name"];
                this.isLoading = false;
            }
        });
    }

    updateTableSchema() {
        this.message = "";
        this.openModal.dismiss();
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.tableSchema = JSON.stringify(JSON.parse(this.schemaContent));
        this.service.updateTableSchema(status => {
            if (status) {
                this.message = "Successfully updated the schema for the selected table";
                this.isLoading = false;
            }
        });
    }

    addTableRows() {
        this.message = "";
        this.openModal.dismiss();
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.tableRows = JSON.stringify(JSON.parse(this.schemaContent));
        this.service.addTableRows(status => {
            if (status) {
                this.message = "Successfully added rows to the selected table";
                this.isLoading = false;
            }
        });
    }

    clearTable() {
        this.message = "";
        this.openModal.dismiss();
        this.isLoading = true;
        this.service.groupId = this.groupId;
        this.service.datasetId = this.datasetId;
        this.service.tableName = this.tableName;
        this.service.useGroup = this.groupId && this.groupId != "0" ? true : false;
        this.service.clearTable(status => {
            if (status) {
                this.message = "Successfully cleared all data from the selected table";
                this.isLoading = false;
            }
        });
    }

    modalOpen(modal: ModalComponent, msgType: string, size: string) {
        this.message = "";
        this.openModal = modal;
        this.modalTitle = "";
        this.modalContent = "";
        this.schemaContent = "";
        this.createModalText = "Create";
        this.showDataTypes = false;
        this.showPolicy = false;
        this.createModalClick = () => { };
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
                this.modalTitle = "Create Dataset";
                this.schemaContent = this.defaultDatasetSchema;
                this.showDataTypes = true;
                this.showPolicy = true;
                this.createModalClick = this.createDataset;
                break;
            case "addTableRows":
                this.modalTitle = "Add Table Rows";
                this.createModalText = "Add";
                this.schemaContent = this.defaultTableRows;
                this.createModalClick = this.addTableRows;
                break;
            case "updateTableSchema":
                this.modalTitle = "Update Table Schema";
                this.createModalText = "Update";
                this.schemaContent = this.defaultTableSchema;
                this.createModalClick = this.updateTableSchema;
                break;
        }
        modal.open(size);
    }
}