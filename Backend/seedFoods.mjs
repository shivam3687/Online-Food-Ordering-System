import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import foodModel from './models/foodModel.js';

dotenv.config();

const uploadsPath = path.join(process.cwd(), 'uploads');

const foodItems = [
  { name: 'Greek salad', price: 12, category: 'Salad', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_1.png' },
  { name: 'Veg salad', price: 18, category: 'Salad', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_2.png' },
  { name: 'Clover Salad', price: 16, category: 'Salad', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_3.png' },
  { name: 'Chicken Salad', price: 24, category: 'Salad', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_4.png' },
  { name: 'Lasagna Rolls', price: 14, category: 'Rolls', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_5.png' },
  { name: 'Peri Peri Rolls', price: 12, category: 'Rolls', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_6.png' },
  { name: 'Chicken Rolls', price: 20, category: 'Rolls', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_7.png' },
  { name: 'Veg Rolls', price: 15, category: 'Rolls', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_8.png' },
  { name: 'Ripple Ice Cream', price: 14, category: 'Deserts', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_9.png' },
  { name: 'Fruit Ice Cream', price: 22, category: 'Deserts', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_10.png' },
  { name: 'Jar Ice Cream', price: 10, category: 'Deserts', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_11.png' },
  { name: 'Vanilla Ice Cream', price: 12, category: 'Deserts', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_12.png' },
  { name: 'Chicken Sandwich', price: 12, category: 'Sandwich', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_13.png' },
  { name: 'Vegan Sandwich', price: 18, category: 'Sandwich', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_14.png' },
  { name: 'Grilled Sandwich', price: 16, category: 'Sandwich', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_15.png' },
  { name: 'Bread Sandwich', price: 24, category: 'Sandwich', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_16.png' },
  { name: 'Cup Cake', price: 14, category: 'Cake', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_17.png' },
  { name: 'Vegan Cake', price: 12, category: 'Cake', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_18.png' },
  { name: 'Butterscotch Cake', price: 20, category: 'Cake', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_19.png' },
  { name: 'Sliced Cake', price: 15, category: 'Cake', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_20.png' },
  { name: 'Garlic Mushroom ', price: 14, category: 'Pure Veg', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_21.png' },
  { name: 'Fried Cauliflower', price: 22, category: 'Pure Veg', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_22.png' },
  { name: 'Mix Veg Pulao', price: 10, category: 'Pure Veg', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_23.png' },
  { name: 'Rice Zucchini', price: 12, category: 'Pure Veg', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_24.png' },
  { name: 'Cheese Pasta', price: 12, category: 'Pasta', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_25.png' },
  { name: 'Tomato Pasta', price: 18, category: 'Pasta', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_26.png' },
  { name: 'Creamy Pasta', price: 16, category: 'Pasta', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_27.png' },
  { name: 'Chicken Pasta', price: 24, category: 'Pasta', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_28.png' },
  { name: 'Buttter Noodles', price: 14, category: 'Noodles', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_29.png' },
  { name: 'Veg Noodles', price: 12, category: 'Noodles', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_30.png' },
  { name: 'Somen Noodles', price: 20, category: 'Noodles', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_31.png' },
  { name: 'Cooked Noodles', price: 15, category: 'Noodles', description: 'Food provides essential nutrients for overall health and well-being', baseImage: 'food_32.png' }
];

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const files = fs.readdirSync(uploadsPath);
    const imageMap = {};
    for (const file of files) {
      if (file.includes('food_')) {
        const key = file.split('food_')[1];
        imageMap[`food_${key}`] = file;
      }
    }

    const existingCount = await foodModel.countDocuments();
    if (existingCount > 0) {
      console.log(`Food collection already has ${existingCount} documents. Skipping insert.`);
      process.exit(0);
    }

    const payload = foodItems.map(item => {
      const imageName = imageMap[item.baseImage] || item.baseImage;
      return {
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: imageName
      };
    });

    const inserted = await foodModel.insertMany(payload);
    console.log(`Inserted ${inserted.length} food items.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();