import dns from 'node:dns';
import mongoose from 'mongoose';
import { env } from './env.js';

// Some networks block the DNS lookup that MongoDB Atlas needs.
// Using public DNS servers fixes this.
dns.setServers(['8.8.8.8', '1.1.1.1']);

export async function connectDatabase() {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}