#!/bin/bash

echo 'Installing required NPM global packages...'
npm install typings webpack-dev-server rimraf webpack -g --no-progress
echo 'Installing NPM packages...'
npm install --no-progress

