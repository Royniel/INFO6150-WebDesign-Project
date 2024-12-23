const mongoose = require('mongoose');

// Defining the User schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['individual', 'company'] },
    petsLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PetListing' }],
    petsListed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PetListing' }]
});

module.exports = mongoose.model('User', UserSchema);
