
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

app.post('sync', function(req, res){
  try{
    //Block Object contains all the data we need
    var postBlocks = req.body.blocks;
  }
  catch(e){
    console.log(e);
    return res.json(e);
  }
  for(i in postBlocks){
    var block = postBlocks[i];
    try{
      if(blocks[block.uid]===block){
        console.log("Syncing Block " + blocks[block.uid].uid);
        ventanilla.registerBlock(block,function(uid){
          sendData(blocks[uid]);
        });
      }
    }catch(e){
      console.log(e);
      return res.json(e);
    }
    return res.json(false);
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
    var postBlocks = req.body.blocks;
  }
  catch(e){
    console.log(e);
    return res.json(e);
  }
  for(i in postBlocks){
    var block = postBlocks[i];
    try{
      if(blocks[block.uid]!==undefined){
        console.log("Update block "+block.uid);
        if(block.input !== blocks[block.uid].input && blocks[block.uid].input !==undefined){
          blocks[block.uid].input = block.input;
        }
      }
    }
    catch(e){
      console.log(e);
      return res.json(e);
    }
    try{
      console.log("Register block "+block.uid);
      ventanilla.registerBlock(block,function(uid){
        sendData(blocks[uid]);
        //everything went better than expected
        return res.json(false);
      });
    }catch(e){
      console.log(e);
      return res.json(e);
    }
  }
  return res.json(false);
});

function sendData(block){
  console.log("Generating route...")
  try{
    /*
    * the new block object contains the old block object as object... this is a little bit akward.
    */
    console.log("Get Data from Block: "+block.block.uid);
    if(block.block.type==="Sensor"){
      console.log("This Block is a sensor.");
      return sendSensorData(block);
    }
    else{
      blocks[block.uid].value = block.output
    }
  }catch(e){
    console.log("Error in sendData in app.js: " + e);
  }
}

function sendSensorData(block){
  try{
    block.on('data', function(){
      try{
        blocks[block.uid].value = this.output(this.value);
        app.io.broadcast('uid'+block.uid,this.output(this.value));
      }catch(e){
        console.log("Error at sendSensorData in app.js: " + e);
        return false;
      }
    });
  }catch(e){
    console.log("Error at sendSensorData in app.js: " + e);
    return false;
  }

}

