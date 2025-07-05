import mongoose from 'mongoose'
declare global {
    var mongoose: any
  }
  
const MONGODB_URI:any = process.env.MONGODB_URl
if (!MONGODB_URI) {
  throw new Error('❌ MongoDB URI missing')
}

let cached = global.mongoose || { conn: null, promise: null }

async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'warriorplus-affiliate',
    }).then((mongoose) => mongoose)
    
    
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
