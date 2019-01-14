// External Dependancies
var mongoose = require('mongoose');

const projectSchema = mongoose.Schema({ 
    title: String,
    type: Number, 
    year: String,
    status: String,
    area: String,
    location: String,
    avatar: String,
    mainImage: String,
    singleImages: Array,
    doubleImages: Array,
    dateTime: String
});

module.exports =  mongoose.model('Project', projectSchema);