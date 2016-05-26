import {Component, OnInit} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {Router} from '@angular/router';
import {ApiService} from "./api.service";

@Component({
    selector: "pbiapi",
    templateUrl: "/partial/pbiapi",
    providers: [ApiService],
    directives: CORE_DIRECTIVES
})
export class ApiComponent implements OnInit {
    apiOccurances: number = 0;
    data: number[];
    result: any[][];
    isLoading: boolean = false;

    constructor(private service: ApiService, private router: Router) { }

    ngOnInit() {
        this.get();
    }

    get() {
        this.isLoading = true;
        this.service.get(atResult => {
            console.error(atResult);
            if (atResult) {
                console.error(atResult);
                if (atResult == "unauthenticated") {
                    this.router.navigate(['/login']);                }
                this.isLoading = false;
                this.apiOccurances++;
            }
        });
    }
}