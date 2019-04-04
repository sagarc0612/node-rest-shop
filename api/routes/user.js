const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');


router.post("/signup",(req,res,next) => {
    User.find({
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        email:req.body.email,
        BirthDate:req.body.BirthDate,
            
    
    })
        .exec()
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: "mail exist"
                })
            } else {
                bcrypt.hash(req.body.password,10,(err,hash) => {
                    if(err){
                        return res.status(500).json({
                            error:err
                        });
                    } else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            FirstName: req.body.FirstName,
                            LastName: req.body.LastName,
                            email: req.body.email,
                            password:hash,
                            BirthDate:req.body.BirthDate
                    });
                    user
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: 'user created'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                          error: err
                        });
                    });
                
            }
        })
    
    
        }
    });
 });
 router.post('/login', (req,res,next) => {
     User.find({ email: req.body.email})
         .exec()
         .then(user => {
             if(user.length < 1){
                 return res.status(404).json({
                     message: "Mail not found, User does not exist"
                 });

             } else{
                 bcrypt.compare(req.body.password , user[0].password, (err,result)=> {
                     if(err) {
                         return res.status(401).json({
                             message:"Auth failed"
                         });
                     }
                     if(result){
                         const token = jwt.sign(
                             {
                             email: user[0].email,
                             userId: user[0]._id
                         },
                         process.env.JWT_KEY,
                         {
                             expiresIn:"24h"
                         }
                         );
                         return res.status(200).json({
                             message:"auth success",
                             token:token
                         });
                     }
                     res.status(401).json({
                         message:"auth failedd"
                     });
                 });
             }
         })
         .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
        });
 });
 
 router.delete('/:userId',(req,res,next) => {
     User.remove({_id: req.params.userId})
         .exec()
         .then(result => {
            res.status(200).json({
                messahe: 'user deleted'
            });
        })
         .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
        });
 });
 

module.exports = router; 