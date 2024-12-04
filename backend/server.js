const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
 
dotenv.config();
 
const app = express();
const PORT = process.env.PORT || 5001;
 
app.use(express.json());
 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 