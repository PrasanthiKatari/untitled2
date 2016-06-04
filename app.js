var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql= require('mysql');




var app = express();
var pool=mysql.createPool({
  host:'g8r9w9tmspbwmsyo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user:'ckaxbwfxnaht37s9',
  password:'dfb06foiwmy2gwy0',
  database:'fapzrey0e61b3lyj',
  ConnectionLimit:20
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Expose-Headers', 'Authorization, header-a');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();

});
app.get('/',function(req,res){
  res.send("welcome to api")
})

app.get('/display',bodyParser.json(), function(req, res, next) {

  pool.getConnection(function(err,connection){
    var query='select * from usertypes';
    connection.query(query,function(err,rows){
      connection.release();
      if(err){
        console.log(err);
        res.status(500).send('500 Error : ' + err);
      }
      else
      {
        res.status(200).json(rows);
      }
    })

  })
});

app.post('/Insert',function(req,res,next){
  pool.getConnection(function(err,connection){
    var query="insert into usertypes(userTypeID,userType,Passwords,Email) values"+"('" + req.body['userTypeID'] + "','" +req.body['userType'] + "','"+ req.body['Passwords'] + "','" +req.body['Email'] +"')";
    console.log('queryt'+query);
    connection.query(query,function(err,rows){
      if(err){
        console.log(err);
        res.status(500).send('500 Error :' + err);
      }
      else
      {
        console.log(rows);
        res.status(200).json(rows);
      }
    })
  })
})
app.use(redirectUnmatched);

function redirectUnmatched(req,res){
  console.log("No route matched - redirctUnmatched");
  res.status(404).send('404 Error :No Rows Found');

}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
