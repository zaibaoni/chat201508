var models = require('../models');

exports.reg = function(req,res){
  var user = req.body;
    models.User.findOne({username:user.username},function(err,dbUser){
        if(dbUser){
            res.send({code:0,msg:'用户名已存在'});
        }else{
            new models.User(user).save(function(err,user){
                req.session.user = user;
                res.send({code:1,msg:'注册成功'});
            });
        }
    })

}

exports.login = function(req,res){
    var user = req.body;
    models.User.findOne(user,function(err,user){
        if(err){
            return res.send({code:0,msg:'登陆失败'});
        }else{
            if(user){
                req.session.user = user;
                return res.send({code:1,user:user});
            }else{
                return res.send({code:0,msg:'登陆失败'});
            }
        }
    });
}

exports.logout = function(req,res){
    req.session.user = null;
    return res.send({code:1,msg:'退出成功'});
}
exports.validate = function(req,res){
    if(req.session.user){
        return res.send({code:1,user:req.session.user});
    }else{
        return res.send({code:0,msg:'未登陆'});
    }
}