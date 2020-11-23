import { Book } from '~/models/book'
import { getBook } from '~/middlewares/books'
import { Router } from 'express'
const router = Router()

export default (app) => {
  app.use('/books', router)

  router.get('/', async (req, res) => {
    try {
      const users = await Book.find()
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  router.get('/:id', getBook, async (req, res) => {
    res.json(res.book)
  })

  router.post('/', async (req, res) => {
    const book = new Book(req.body)
    try {
      const newUser = await book.save()
      res.status(201).json(newUser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

  router.put('/:id', getBook, async (req, res) => {
    res.book.set(req.body)
    try {
      const updatedBook = await res.book.save()
      res.json(updatedBook)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

  router.delete('/:id', getBook, async (req, res) => {
    try {
      await res.book.remove()
      res.json({ message: 'Book removed' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
}
