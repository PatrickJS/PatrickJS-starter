#!/bin/bash

cd /home/vjcspy/sites/retail-cloud/cloud/dist/bundle

export ROOT_URL='http://xds.smartosc.com' export MAIL_URL=smtp://bot@smartosc.com:thestar0@smtp.gmail.com:465 && export MONGO_URL=mongodb://localhost:27017/cloud&& export PORT=2005 &&  node main.js
