import {Component, OnInit} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ApiService} from "./api.service";

@Component({
    selector: "pbiapi",
    templateUrl: "/partial/pbiapi",
    providers: [ApiService],
    directives: CORE_DIRECTIVES
})
export class LoginComponent implements OnInit {
    apiOccurances: number = 0;
    data: number[];
    isLoading: boolean = false;

    constructor(private service: ApiService) { }

    ngOnInit() {
        this.login();
    }

    login() {
        this.isLoading = true;
        this.service.get(data => {
            if (data) {
                this.data = data;
                this.isLoading = false;
                this.apiOccurances++;
            }
        });
    }
}