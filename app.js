
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
blocks = {};
apiInterfaces = {};
ventanilla.init();
/*Make app listen*/
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/*Routen*/
app.get('/ui/:uid', function(req, res){
  res.render('index',{uid: req.param('uid')});
});
app.get('/backend', function(req, res){
  res.render('backend');
});


app.post('/api', function(req, res){
    var key = req.body.key;
    if(apiInterfaces[key] !== undefined){
      try{
        return res.json(apiInterfaces[key](req.body.value));
      }catch(e){
        return res.json(500,{error:e});
      }
    }else{
      return res.json(404);
    }
});



//delete sensors
app.post('/delete', function(req, res){
  var msg = "All blocks deleted.";
  try{
    //Block Object contains all the data we need
    var uids = req.body.uids;
  }
  catch(e){
    console.log(e);
    msg = e;
    return res.json(msg);
  }
  for(i in uids){
    try{
      delete blocks[uids[i]];
      console.log("Block " + uids[i] + " deleted.")
    }catch(e){
      msg = e;
    }
  }
  return res.json(msg);
});

//register Sensor
app.post('/registerBlock', function(req, res){
  try{
    //Block Object contains all the data we need
    var block = req.body.block;
  }
  catch(e){
    console.log(e);
    return res.json(e);
  }
  try{
    if(blocks[block.uid]!==undefined){
      if(blocks[block.uid].block.type !== "ArduinoUno"){
        console.log("Delete old block "+block.uid);
        delete blocks[block.uid];
      }
    }
  }
  catch(e){
    console.log(e);
    return res.json(e);
  }
  try{
    console.log("Will create " + block.name + " - recieved$");
    ventanilla.registerBlock(block);
  }
  catch(e){
    return res.json(e);
  }
});




