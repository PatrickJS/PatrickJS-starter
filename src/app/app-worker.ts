require('reflect-metadata');
require('zone.js');

import {HTTP_PROVIDERS} from 'angular2/http';

import {bootstrapWebWorker} from "angular2/web_worker/worker";
import {App} from "./app";

bootstrapWebWorker(App, [HTTP_PROVIDERS]);
