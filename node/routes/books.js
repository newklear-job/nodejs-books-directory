import { Router } from 'express'
const router = Router()

export default (app) => {
  app.use('/books', router)

  router.get('/', async (req, res) => {
    try {
      const users = 'hello world!'
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
}
