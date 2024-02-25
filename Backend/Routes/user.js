const express = require('express')
const User = require('../models/user1')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post("/signup", (req, res) => {
  console.log(req.body.email,req.body.password);
  const hash = bcrypt.hashSync(req.body.password, 10);

      const user = new User({
        email: req.body.email,
        password: hash})
      console.log(req.body.email,req.body.password);
      User.findOne({email:req.body.email})
      .then(user1=>{
        console.log(user1);
        if(user1){
          return res.status(401).json({
            message: "User Already Exist"
          })
        }

        user.save().then(result => {
          console.log(result);
          if(!result){
            return res.status(500).json({
              message: "Error Creating USer"
            })
          }
          res.status(201).json({
            message: "User created!",
            result: result
          });
      })
        })   
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
    })
   
  router.post("/login", (req, res, next) => {
    let fetchedUser;
    console.log(fetchedUser);
  
    User.findOne({email:req.body.email})
    .then(User=>{
      if(!User){
        return res.status(401).json({
          message: "Auth failed no such user"
        })
      }
      fetchedUser=User;
      return bcrypt.compare(req.body.password, User.password);
    }).then(result=>{
      if(!result){
        return res.status(401).json({
          message: "Auth failed inccorect password"
        })
      }
      const token = jwt.sign(
        { email: fetchedUser.email,
          userId: fetchedUser.userId },
        "abc",
        { expiresIn: "1h" }
      );
      console.log("cbks");
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
      console.log(req.body.userId);
    })
    .catch(e=>{
     
      console.log(e)
    
    })
  })
module.exports = router