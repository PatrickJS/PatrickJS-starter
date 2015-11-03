//require('reflect-metadata'); - needed if the worker.dev.js bundle is not used

import {bootstrapWebWorker} from "angular2/web_worker/worker";
import {App} from "./app";

bootstrapWebWorker(App);
