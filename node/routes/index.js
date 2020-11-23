import booksRouter from './books'

export default async (expressApp) => {
  booksRouter(expressApp)
}
