@echo off
cd%~dp0
cd node_modules\ventanilla
call npm install
cd ..
cd ventanilla-arduino
call npm install
cd ..
cd ..
call npm install
node app.js