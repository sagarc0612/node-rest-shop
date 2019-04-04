const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    FirstName:{ type: String , required:true },
    LastName:{ type: String , required:true},
     email:{ type:String, 
        required:true ,
        unique: true,
         match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
          },
    password:{ type:String, required: true},
   //password2:{ type:String,required:true},
    BirthDate:{ type:Date, requires:true}
    // product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    // quantity:{type: Number,default:1}
    // // name:{ type:String,required:true},
    // price:{ type:Number,required:true}

});

module.exports = mongoose.model('User',userSchema);