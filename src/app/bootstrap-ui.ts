/*
 * UI Thread with Angular
 */

import {bootstrap as worker} from 'angular2/web_worker/ui';

worker('/loaders/app-loader.js');
