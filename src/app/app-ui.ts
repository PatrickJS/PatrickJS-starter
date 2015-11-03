require('reflect-metadata');
require('zone.js');

import {bootstrap} from 'angular2/web_worker/ui';

require("!style!css!../public/css/angular2_material.css");

bootstrap('/loaders/app-loader.js');
