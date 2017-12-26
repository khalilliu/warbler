var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        default:'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg'
    },
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        refs:'Message'
    }]
});

UserSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified("password")){return next();}
    bcrypt.hash(user.password,10)
        .then(function(hashedPassword){
            user.password = hashedPassword;
            next();
        }, function(err){
            return next(err);
        });
})

UserSchema.methods.comparePassword = function(password,next){
    bcrypt.compare(password,this.password,function(err,isMatch){
        if(err)return next(err);
        next(err,isMatch);
    })
}

var User = mongoose.model('User',UserSchema);

module.exports = User;