import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {PBIApiComponent} from "./pbiapi.component";
import {AboutComponent} from "./about.component";
import {ContactComponent} from "./contact.component";
import {TermsComponent} from "./terms.component";
declare var System: any;

@Component({
    selector: "app",
    template: `<div class="page-header">
                    <h1>Power BI API Interface</h1>
                </div>
                <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">
                                <span class="glyphicon glyphicon-sunglasses"></span>
                            </a>
                        </div>
                        <ul class="nav navbar-nav">
                            <li [class.active]="isActive('/home')">
                                <a [routerLink]="['/home']">Home</a>
                            </li>
                        </ul>
                        <ul class="nav navbar-nav">
                            <li [class.active]="isActive('/about')">
                                <a [routerLink]="['/about']">About</a>
                            </li>
                        </ul>
                        <ul class="nav navbar-nav">
                            <li [class.active]="isActive('/contact')">
                                <a [routerLink]="['/contact']">Contact</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="content padding has-header">
                    <router-outlet></router-outlet>
                </div>`,
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    { path: '/home', component: PBIApiComponent },
    { path: '/Home', component: PBIApiComponent },
    { path: '/about', component: AboutComponent },
    { path: '/About', component: AboutComponent },
    { path: '/contact', component: ContactComponent },
    { path: '/Contact', component: ContactComponent },
    { path: '/terms', component: TermsComponent },
    { path: '/Terms', component: TermsComponent }
])
export class PBIAPIToolsApp implements OnInit {
    constructor(private router: Router) {
        var routes = router.routeTree;
    }

    ngOnInit() {
    }

    isActive(path: string): boolean {
        return (this.router.serializeUrl(this.router.urlTree).toLowerCase() === path.toLowerCase());
    }
}