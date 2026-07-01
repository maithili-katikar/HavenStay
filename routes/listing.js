const express=require("express");
const router=express.Router();

const wrapAsync=require("../utils/wrapAsync.js")

const ExpressError=require("../utils/ExpressError.js")

const listingSchema=require("../schema.js");
const {reviewSchema}=require("../schema.js");

const Listing=require("../models/listing.js");

const {validateListing,isLoggedIn, isOwner}=require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
//index route
.get(wrapAsync(listingController.index))
//create route
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));
// .post(upload.single("listing[image]"),(req,res)=>{
//     res.send(req.file);
// });

//new route
router.get("/new",isLoggedIn ,listingController.renderNewForm);

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

router.route("/:id")
//update route
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
//Delete route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))
//show route
.get(wrapAsync(listingController.showListing));

module.exports=router;