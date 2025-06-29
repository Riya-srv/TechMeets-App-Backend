const mongoose = require("mongoose");

const meetUpsSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    type: { type: String, 
        enum: ["Online", "Offline"], 
        required: true },
    image: { 
        type: String,
        required: true
     }, 
     host: {
        type: String,
        required: true
     },
    description: { 
        type: String 
    },
    speakers:[{
        name:{
            type:String,
            required:true,
        },
        picture:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            required:true,
        }
    }],
    price: { 
        type: Number 
    },
        dressCode: {
        type:String,
    },
        ageRestrictions:{
        type:String,
    },
        venue: { 
        type: String 
    },
    tags: { 
        type: [String] 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("MeetUps", meetUpsSchema);
