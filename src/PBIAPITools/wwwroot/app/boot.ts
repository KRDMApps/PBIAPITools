/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from "@angular/router";
import {HTTP_PROVIDERS} from "@angular/http";
import {PBIAPIToolsApp} from './app.component';
import {enableProdMode} from '@angular/core';

enableProdMode();

bootstrap(PBIAPIToolsApp, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);