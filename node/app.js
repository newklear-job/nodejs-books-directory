import loader from '~/loaders'
const express = require('express')

const app = express()

async function startServer () {
  await loader({ expressApp: app })

  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Your server is ready !')
  })
}

process.on('unhandledRejection', (error, promise) => {
  console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise)
  console.log(' The error was: ', error)
})

startServer()

export { app } // for tests
