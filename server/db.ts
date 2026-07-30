import mongoose from 'mongoose';

export let isMongoConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('user:password') || uri === 'MY_MONGODB_URI') {
    console.log('ℹ️ MONGODB_URI not configured or using default template. Operating with Mongoose and memory fallback mode.');
    isMongoConnected = false;
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isMongoConnected = true;
    console.log('✅ Connected successfully to MongoDB Atlas via Mongoose.');
    return true;
  } catch (error) {
    console.warn('⚠️ Could not connect to MongoDB Atlas:', (error as Error).message);
    console.log('ℹ️ Falling back to Mongoose in-memory persistence layer so portal remains fully interactive.');
    isMongoConnected = false;
    return false;
  }
}
