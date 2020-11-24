import { router as booksRouter } from './books'

export default async (expressApp) => {
  expressApp.use('/books', booksRouter)
}
