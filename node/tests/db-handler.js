import { MongoMemoryServer } from 'mongodb-memory-server'
const mongoose = require('mongoose')

const mongod = new MongoMemoryServer()

/**
 * Connect to the in-memory database.
 */

const connectDatabase = async () => {
  await mongoose.disconnect()
  const uri = await mongod.getUri()
  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }

  await mongoose.connect(uri, mongooseOpts)
}

/**
 * Remove all the data for all db collections.
 */
const clearDatabase = async () => {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL === mongoose.connection._connectionString) {
    return
  }
  const collections = mongoose.connection.collections
  for (const key in collections) {
    if (Object.prototype.hasOwnProperty.call(collections, key)) {
      const collection = collections[key]
      await collection.deleteMany()
    }
  }
}

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async () => {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL === mongoose.connection._connectionString) {
    return
  }
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

export { connectDatabase, clearDatabase, closeDatabase }
