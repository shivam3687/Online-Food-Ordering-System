import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://shivam202kmr_db_user:8102103687@cluster0.gzrtego.mongodb.net/online_food_ordering_website').then(()=>console.log("DB Connected"));
}