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
  app.post('/query/',function(req,res){
    var lat = req.body.latitude;
    var long = req.body.longitude;
    var distance= req.body.distance;
    var male = req.body.male;
    var female = req.body.female;
    var other = req.body.other;
    var minAge= req.body.minAge;
    var maxAge= req.body.maxAge;
    var favlang= req.body.favlang;
    var reqVerified= req.body.reqVerified;



    var query = User.find({});


    if(distance){
      query = query.where('location').near({center: {type: 'Point', coordinates: [long,lat]},
      maxDistance : distance * 1609.34, spherical: true
    });
    }

    if(male || female || other){
      query.or([{'gender':male},{'gender':female},{'gender': other}]);
    }

    if(minAge){
      query =query.where('age').gte(minAge);
    }

    if(maxAge){
      query=query.where('age').lte(maxAge);
    }

    if(favlang){
      query=query.where('favlang').equals(favlang);
    }

    if(reqVerified){
      query = query.where('htmlverified').equals("Hore!!!! Verified user!");
    }

    query.exec(function(err,users){
      if(err)
        res.send(err);

      res.json(users);
    });

  });
};
