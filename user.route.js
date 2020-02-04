const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./user.model');
const jwt = require('jsonwebtoken');


router.post('/signup', function(req, res) {

    
    bcrypt.hash(req.body.CLIENTID ,10, function (err, hash){

       if(err) {
          return res.status(500).json({
             error: err
          });
       }
       else {
          const user = new User({
             _id: new  mongoose.Types.ObjectId(),
             CLIENTID: hash,   
             CLIENTSECRET: hash,
             MBAGEN: req.body.MBAGEN,
             MBDESN: req.body.MBDESN,
             MBHTEL: req.body.MBHTEL
          });
          user.save().then(function(result) {
             if(result) {
                const JWTToken = jwt.sign({
                    CLIENTID: user.CLIENTID,
                    CLIENTSECRET: user.CLIENTSECRET,
                    MBAGEN: user.MBAGEN,
                    MBDESN: user.MBDESN,
                    MBHTEL: user.MBHTEL,
                    _id: user._id
                   },
                   'secret',
                    {
                      expiresIn: '2h'
                    });
                    return res.status(200).json({
                        "RESP_CODE": 200,
                        "RESP_MSG": "Success",
                        token: JWTToken
                    });
               }
          })          
          .catch(error => {
             res.status(500).json({
                error: err
             });
          });
       }
    });
 });
 

router.post('/signin', function(req, res){
   User.findOne({CLIENTSECRET: req.body.CLIENTSECRET})
   .exec()
   .then(function(user) {
      bcrypt.compare(req.body.CLIENTID, user.CLIENTID, function(err, result){
         if(err) {
            return res.status(401).json({
                "RESP_CODE": 401,
                "RESP_MSG": "Missing required field",
                "RESP_DATETIME" : "",
                "MBAGEN" : ""
            });
        }else if(req.body.CLIENTID == "string"){
            res.json({
                "RESP_CODE": 402,
                "RESP_MSG": "Invalid Format",
                "RESP_DATETIME" : "",
                "MBAGEN" : ""
                })
       }if(result) {
        return res.status(200).json({
            "RESP_CODE": 200,
            "RESP_MSG": "Success",
            "RESP_DATETIME" : "",
            "MBAGEN_FromDatabase" : result,
            "Database_Response" : ""
        });
        }return res.status(301).json({
            "RESP_CODE": 301,
            "RESP_MSG": "Not success, not found ",
            "RESP_DATETIME" : "",
            "MBAGEN" : ""
            });
      });
   })
        .catch(error => {
            res.status(500).json({
            error: error
        });
    });;
});


module.exports = router;