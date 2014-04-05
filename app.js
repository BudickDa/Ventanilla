
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
app.get('/ui/:uid', function(req, res){
  res.render('index',{uid: req.param('uid')});
});
app.get('/backend', function(req, res){
  res.render('backend');
});
//register Sensor
app.post('/registerBlock', function(req, res){
  try{
    //Block Object contains all the data we need
    var block = req.body.block;
    hardware.blocks[block.uid] = block;
  }
  catch(e){
    console.log(e);
    return res.json(e);
  }
  try{
    ventanilla.registerBlock(block,function(block){
      console.log(block);
      sendData(req,block);
      //everything went better than expected
      return res.json(false);
    });
  }catch(e){
    console.log(e);
    return res.json(e);
  }
});

app.get('/reload', function(req,res){
/*this should be secured someday!*/
  hardware = {};
  return initVentanilla(app);
});
//todo: comment
//var block;
app.io.route('block',function(req){
  //block = req;
});

//todo: config on harddisk is no solution... I think we need a database to persist configurations made in the backend
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
  ventanilla.init(function(initHardware){
    hardware = initHardware;
    ventanilla.ready = true;
    app.listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
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
function sendData(req,hardware,sensor){
  console.log("Register Sensor: "+sensor.uid);
  return sensor.on('data', function(){
    //console.log(this.output(this.value));
    req.io.broadcast('uid'+sensor.uid,this.output(this.value));
  });
}

/*Make app listen*/

