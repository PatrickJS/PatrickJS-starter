#!/bin/bash

cd /home/congnv/sites/cloud

export MAIL_URL=smtp://bot@smartosc.com:thestar0@smtp.gmail.com:465
export MONGO_URL=mongodb://localhost:27017/cloud
export ROOT_URL='http://xcloud.smartosc.com'
export PORT=2005
node main.js --port 2005
