import {Component, OnInit} from "@angular/core";

@Component({
    selector: "static",
    template: `<static>
    <blockquote>{{message}}</blockquote>
</static>`
})

export class StaticComponent implements OnInit {
    message: string;

    constructor() { }

    ngOnInit() {
        this.message = "There is a 'message' property bound to the <blockqoute> element."
    }
}