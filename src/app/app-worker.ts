require('reflect-metadata');
require('zone.js');

import {bootstrapWebWorker} from "angular2/web_worker/worker";
import {App} from "./app";

bootstrapWebWorker(App);
