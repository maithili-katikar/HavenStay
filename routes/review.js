const express=require("express");
const router=express.Router({mergeParams:true});

const wrapAsync=require("../utils/wrapAsync.js")

const ExpressError=require("../utils/ExpressError.js")

const Listing=require("../models/listing.js");
const Review=require("../models/review.js");

const listingSchema=require("../schema.js");
const {reviewSchema}=require("../schema.js"); 
// these are of JOI 

const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//review route
// post route
router.post("/",isLoggedIn ,validateReview,wrapAsync(reviewController.createReview));    

// delete review route post route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;