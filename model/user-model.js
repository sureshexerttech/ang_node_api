'use strict';
var sql = require('../config/db.js');
const jwt = require('jsonwebtoken');
const jwtKey = 'my_secret_key';
const jwtExpirySeconds = 300;
var User = function( user ){
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.useremail = user.username;
    this.password = user.password;
    this.mobileNo = user.mobileNo;
    this.createat = new Date();
    this.updatedat = "";
}

User.createUser = function( newuser, result ){
     sql.query("INSERT INTO user_reg set ?", newuser, function(err, res) {
         if(err) {
             console.log('error: ', err);
             result(err, null);
         } else{
             console.log(res.insertId);
             result(null, res.insertId);    
         }
     });
}

User.getbyUserId = function(userId, result) {
    sql.query(" select firstname,lastname from user_reg where u_id = ?", userId, function(err, res){
        if(err) {
            console.log('error: ', err);
            result(err, null);
        } else{
            console.log(res);
            result(null, res);    
        }
    });
}

User.getAllUser = function(result) {
    sql.query(" select * from user_reg ", function(err, res){
        if(err) {
            console.log('error: ', err);
            result(null, err);
        } else{
            console.log(res);
            result(null, res);    
        }
    });
}

User.UpdatebyId = function(userId, user, result) {
    sql.query(" UPDATE user_reg SET firstname = ?, lastname = ?, useremail = ?, password = ?, mobileNo = ? where u_id = ? ",
       [user.firstname,user.lastname,user.useremail,user.password,user.mobileNo,userId], function(err, res){
        if(err) {
            console.log('error: ', err);
            result(null, err);
        } else{
            console.log(res);
            result(null, res);    
        }
    });
}

User.Remove = function(userId, result) {
    sql.query(" delete from user_reg where u_id = ?", [userId], function(err, res){
        if(err) {
            console.log('error: ', err);
            result(err, null);
        } else{
            console.log(res);
            result(null, res);    
        }
    });
}

User.getbyUserCredential = function(username, password, result) {
    sql.query(" select * from user_reg where useremail = ? and password = ?", [username, password], function(err, res){
        if(err) {
            console.log('error: ', err);
            result(err, null);
        } else{
            if (res.length > 0){
                const token = jwt.sign({ username }, jwtKey, {
                    algorithm: 'HS256',
                    expiresIn: jwtExpirySeconds
                })
                console.log(res.length);
                let response = {"accesstoke":token, "userDetails": res,"success":'Ok'}
                result(null, response); 
         } else {
               let response = {success:'error', message: 'No User found'}
               result(null, response); 
         }
        }
    });
}

module.exports = User;