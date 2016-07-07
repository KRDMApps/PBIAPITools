"use strict";
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var app_component_1 = require('./app.component');
var core_1 = require('@angular/core');
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.PBIAPIToolsApp, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS]);
