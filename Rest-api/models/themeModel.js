const mongoose = require('mongoose');
const userModel = require('./userModel');
const { Date} = mongoose.Schema.Types;

const themeSchema = new mongoose.Schema({
    themeName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        require:true,
        
        
    }, 
    username: {
        type: String,
        require:true
        
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Theme', themeSchema);
