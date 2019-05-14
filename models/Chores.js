const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Chore = new Schema({
    chore_description: {
        type: String
    },
    chore_responsible: {
        type: String
    },
    
    chore_completed: {
        type: Boolean
    },
    
    chore_address:{
        type: Object
    }
	
});

module.exports = mongoose.model('Chore', Chore);