const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initdata=require("./data.js");

main().then((req)=>{
    console.log("mongoose connection successfull");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/HavenStay");
};

const initDB=async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"6a40029db6ad312fe42a83c2"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");    
}

initDB();