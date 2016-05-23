import "rxjs/Rx"
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ApiService {
    constructor(private http: Http) { }

    get(onNext: (json: any) => void) {
        this.http.get("api/pbiapi").map(response => response.text()).subscribe(onNext, err => console.error(err));
    }

    login(onNext: (json: any) => void) {
        this.http.get("api/pbiapi/login").map(response => response.json()).subscribe(onNext, err => console.error(err));
    }
}