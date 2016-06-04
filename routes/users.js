var express = require('express');
var mysql= require('mysql');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

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
  res.send('respond with a resource');
});

router.get('/Insert',function(req,res,next){
  res.send('mahesh');
})

module.exports = router;
