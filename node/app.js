import loader from '~/loaders'
const express = require('express')

async function startServer () {
  const app = express()

  await loader({ expressApp: app })

  const booksRouter = require('./routes/books') // todo: move router somewhere else.
  app.use('/books', booksRouter)

  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Your server is ready !')
  })
}

startServer()
