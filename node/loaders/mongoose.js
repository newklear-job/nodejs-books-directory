const mongoose = require('mongoose')
require('dotenv').config()

export default async () => {
  let dbUrl = process.env.DATABASE_URL
  if (process.env.NODE_ENV === 'test') {
    dbUrl = process.env.DATABASE_URL_TEST
  }
  mongoose.connect(dbUrl, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', (error) => console.error(error))
  db.once('open', () => console.log('Connected to Database'))
  return db
}
