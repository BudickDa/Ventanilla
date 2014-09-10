#!/bin/sh
cd $(dirname $0)
cd node_modules/ventanilla
npm install
cd ../ventanilla-arduino
npm install
cd ..
cd ..
npm install
node app.js
