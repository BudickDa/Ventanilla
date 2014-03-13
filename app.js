
/**
 * Module dependencies.
 */
var fs = require('fs');
var http = require('http');
var path = require('path');
express = require('express.io');
app = express().http().io();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('foobarIsMySecretButYouShouldChangeThisForProduction'));
app.use(express.session({secret: 'foobarIsMySecretButYouShouldChangeThisForProduction'}));
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*Init Ventanilla*/
var ventanilla = require('ventanilla');
/*generated config*/
var config = require('./config.json');

var hardware = {};
initVentanilla(app,hardware);



/*foreach(board in config.boards){
  foreach(item in board){    
  }
}*/

/*Routen*/
app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});
app.get('/backend', function(req, res){
  res.render('index', { title: 'Express' });
});
app.get('/reload', function(req,res){
/*this should be secured someday!*/
  hardware = {};
  return initVentanilla(app);
});

app.get('/config', function(req, res){
  res.set('Cache-Control', 'no-cache');
  fs.readFile('config.json', 'utf8', function (err, data) {
    if (err) throw err;
    config = JSON.parse(data);
  });
  return res.json(config);
});

//todo: comment
function initVentanilla(app){
  ventanilla.initHardware(config, function(initilizedHardware){
    hardware = initilizedHardware;
    /*Routes for modules via socket.io*/
    return app.io.route('block',function(req){
      for(boardIndex in hardware.arduinoBoards){
        for(uid in hardware.arduinoBoards[boardIndex].sensors){
          sendData(req,hardware,uid,hardware.arduinoBoards[boardIndex].sensors[uid]);
        }
      }
    });
  });
}
/*
* Return route of arduino module. 
* Input:
*   - hardware: hardware object created by ventanilla
*   - i: the uid of the board
*   - j: the uid of the sensor
*/
function sendData(req,hardware,uid,sensor){
  return sensor.on('data', function(){
    req.io.broadcast('uid'+uid,this.output(this.value));
  });
}

/*Make app listen*/
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



