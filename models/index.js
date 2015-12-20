var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://123.57.143.189/zfpxchat');
exports.User = mongoose.model('User',new Schema({
    username:String,
    password:String,
    email:String
}));