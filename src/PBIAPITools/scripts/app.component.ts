import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {StaticComponent} from "./static.component";
import {ApiComponent} from "./api.component";
import {RedirectComponent} from "./redirect.component";
import {LoginComponent} from "./login.component";

declare var System: any;

@Component({
    selector: "app",
    template: `<div class="page-header">
                    <h1>PowerBI API Tools</h1>
                </div>
                <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">
                                <span class="glyphicon glyphicon-sunglasses"></span>
                            </a>
                        </div>
                        <ul class="nav navbar-nav">
                            <li [class.active]="isActive('/index')">
                                <a [routerLink]="['/index']">Home</a>
                            </li>
                            <!--<li [class.active]="isActive('/login')">
                                <a [routerLink]="['/login']">Login</a>
                            </li>-->
                            <li [class.active]="isActive('/pbiapi')">
                                <a [routerLink]="['/pbiapi']">PBI API</a>
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
    { path: '/index', component: StaticComponent },
    { path: '/login', component: LoginComponent },
    { path: '/redirect', component: RedirectComponent },
    { path: '/pbiapi', component: ApiComponent }
])
export class PBIAPIToolsApp implements OnInit {
    constructor(private router: Router) {
        var routes = router.routeTree;
    }

    ngOnInit() {
        this.router.navigate(['/login']);
    }

    isActive(path: string): boolean {
        return (this.router.serializeUrl(this.router.urlTree) === path);
    }
}