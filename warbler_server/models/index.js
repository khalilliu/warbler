var mongoose = require("mongoose");

mongoose.set('debug',true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/warbler',{
    keepAlive:true,
    reconnectTries:Number.MAX_VALUE,
    useMongoClient:true
}).then(()=>{console.log('mongodb connect...')});


module.exports.User = require("./user");
module.exports.Message = require("./message");