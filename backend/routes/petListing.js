const express = require('express');
const PetListing = require('../models/PetListing');
const User = require('../models/User');
const upload = require('../middleware/upload'); 

const router = express.Router();

// Route for uploading images
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).json({ msg: err });
      } else {
        if (req.file == undefined) {
          res.status(400).json({ msg: 'No file selected' });
        } else {
          res.json({ filePath: `/uploads/${req.file.filename}` });
        }
      }
    });
  });

// Route for adding a new pet listing
router.post('/add', async (req, res) => {
    const { name, animalType, age, breed, sex, colour, userListed, imageURL } = req.body;

    try {
        const newPetListing = new PetListing({ name, animalType, age, breed, sex, colour, userListed, imageURL });
        await newPetListing.save();

        const user = await User.findById(userListed);
        user.petsListed.push(newPetListing.id);
        await user.save();

        res.json(newPetListing);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route for fetching all unapproved pet listings
router.get('/unapproved', async (req, res) => {
    try {
        const listings = await PetListing.find({ approved: false });
        res.json(listings);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route for approving a pet listing
router.put('/approve/:id', async (req, res) => {
    try {
        const listing = await PetListing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        listing.approved = true;
        await listing.save();

        res.json({ message: 'Listing approved' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route for fetching all pet listings
router.get('/', async (req, res) => {
    try {
        const listings = await PetListing.find();
        res.json(listings);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route for fetching a pet listing by ID
router.get('/:id', async (req, res) => {
    try {
        const listing = await PetListing.findById(req.params.id).populate('likedUsers', 'name').populate('comments.userId', 'name');
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(listing);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route for liking a pet listing
router.post('/like/:id', async (req, res) => {
    const { userId } = req.body;
    try {
        const listing = await PetListing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        if (!listing.likedUsers.includes(userId)) {
            listing.likedUsers.push(userId);
            await listing.save();

            const user = await User.findById(userId);
            if (user && !user.petsLiked.includes(req.params.id)) {
                user.petsLiked.push(req.params.id);
                await user.save();
            }
        }

        res.json({ message: 'Pet liked successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route for adding a comment to the pet listing
router.post('/comment/:id', async (req, res) => {
    const { userId, comment } = req.body;
    try {
        const listing = await PetListing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const commentObject = { userId: userId.toString(), name: user.name, comment: comment.toString() };
        listing.comments.push(commentObject);
        await listing.save();

        res.json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route for markign a pet as adopted
router.put('/adopt/:id', async (req, res) => {
    const { userId } = req.body;

    try {
        const listing = await PetListing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        listing.adoptedStatus = true;
        listing.adoptedUser = userId;
        await listing.save();

        res.json({ message: 'Pet adopted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route for deleting a pet listing
router.delete('/:id', async (req, res) => {
    try {
        const listing = await PetListing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        await PetListing.findByIdAndDelete(req.params.id);
        res.json({ message: 'Listing deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
