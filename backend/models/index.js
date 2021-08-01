const mongoose = require('mongoose');
const url = process.env.Database
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true, useFindAndModify:false},(err)=>{
    if (err){
        console.log('Some error occured',err)
    }
    else{
        console.log("Data base connected successfully")
    }

})

require('./user.model');
require('./todo.model');
require('./course.model');
require('./courseEnrollment.model')