
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

//todo: comment
var blockRoute;
app.io.route('block',function(req){
  blockRoute = req;
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
      console.log("Update block "+block.uid);

      if(block.input !== blocks[block.uid].input && blocks[block.uid].input !==undefined){
        blocks[block.uid].input = block.input;
      }
      return res.json(false);
    }
  }
  catch(e){
    console.log(e);
    return res.json(e);
  }
  try{
    ventanilla.registerBlock(block,function(uid){
      sendData(blocks[uid]);
      //everything went better than expected
      return res.json(false);
    });
  }catch(e){
    console.log(e);
    return res.json(e);
  }
});

function sendData(block){
  console.log("Generating route...")
  try{
    /*
    * the new block object contains the old block object as object... this is a little bit akward.
    */
    console.log("Get Data from Block: "+block.block.uid);
    if(block.block.type==="Sensor"){
      console.log("This Block is a sensor...");
      return block.on('data', function(){
        app.io.broadcast('uid'+block.uid,this.output(this.value));
      });
    }
  }catch(e){
    console.log("Error in sendData in app.js: " + e);
  }
}



