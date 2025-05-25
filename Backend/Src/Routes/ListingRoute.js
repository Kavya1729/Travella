const express = require('express');
const router = express.Router();
const { allListings, getListing, createListing, updateListing, deleteListing } = require('../Controllers/ListingController');

router.get('/', allListings);
router.get('/:id',getListing);  //check why not working
router.post('/create',createListing);
router.put('/update/:id',updateListing);
router.delete('/delete/:id',deleteListing);

module.exports = router;