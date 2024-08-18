import mongoose from 'mongoose'
import config from '@/config/setting.config.js'

const connectToDatabase = async () => {
  const uri = config.mongodb.uri

  if (!uri) {
    throw new Error('MongoDB URI is not defined')
  }

  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

export default connectToDatabase
