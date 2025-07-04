const mongoose = require('mongoose');

const listengSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    images:[
        {
            url:{
                type:String,
                required:true,
            },
            public_id:{
                type:String,
                required:true,
            }
        }
    ],
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});

const Listing = mongoose.model('Listing', listengSchema);
module.exports = Listing;
