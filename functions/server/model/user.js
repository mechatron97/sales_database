const mongoose=require("mongoose");
const passportlocalmongoose=require("passport-local-mongoose");

// eslint-disable-next-line new-cap
const UserSchema=mongoose.Schema({
  username: String,
  Password: String,
});

UserSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model("User", UserSchema);
