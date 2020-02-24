'use strict';

var User = require('../model/user-model.js');

exports.list_alluser = function(req, res){
    User.getAllUser(function(err, task){
        if(err){
            res.send(err);
        } else {
            console.log('res', task);
            res.json({ success:'Ok', clientResponse: task});
        }

    });

} 

exports.creat_user = function(req, res){
    var new_user = new User(req.body);
    console.log(new_user)
    //handel error
    if( !new_user.useremail || !new_user.password ){
        res.send({ error:true, message: 'Please provide username/password' });
    } else {
    User.createUser(new_user, function(err, task){
        if(err){
            res.send(err);
        } else {
            console.log('res', task);
            res.json({ success:'Ok', message: 'Successfully Registred',userid: task});
        }

    });
 }
} 

exports.read_user = function(req, res){
    console.log('3')
    User.getbyUserId(req.params.taskId, function(err, task){
        if(err){
            res.send(err);
        } else {
            console.log('res', task);
            res.json(task);
        }

    });

}

exports.update_user = function(req, res){
    console.log('4')
    User.UpdatebyId(req.params.taskId, new User(req.body), function(err, task){
        if(err){
            res.send(err);
        } else {
            console.log('res', task);
            res.json(task);
        }

    });

}

exports.delete_user = function(req, res){
    console.log('5')
    User.Remove(req.params.taskId, function(err, task){
        if(err){
            res.send(err);
        } else {
            console.log('res', task);
            res.json({ message: 'User successfully deleted' });
        }

    });
}
    
    exports.validateuser = function(req, res){
        User.getbyUserCredential(req.body.username,req.body.password, function(err, task){
            if(err){
                res.send(err);
            } else {
                console.log('res', task);
                res.json(task);
            }
    
        });
    }
   