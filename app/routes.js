var mongoose = require('mongoose');
var User = require('./model.js');

module.exports= function(app){

  //GET all users
  app.get('/users', function(req,res){
    var query= User.find({});
    query.exec(function(err,users){
      if(err){
        res.send(err);
      }

      res.json(users);
    });
  });

  //POST user
  app.post('/users', function(req,res){
    var newUser= new User(req.body);
    newUser.save(function(err){
      if(err)
        res.send(err);
      res.json(req.body);
    });
  });
};
