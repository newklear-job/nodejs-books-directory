import { Book } from '~/models/book'
import faker from 'faker'

const createBookObject = () => {
  return {
    title: faker.name.firstName(),
    content: faker.lorem.words(15),
    publishedAt: faker.date.recent(),
    author: faker.name.firstName()
  }
}

const createBook = () => {
  const book = new Book(createBookObject())
  try {
    return book.save()
  } catch (err) {
    console.error(err)
    return createBook()
  }
}

const generate = (count = 1) => {
  const books = []
  for (let i = 0; i < count; i++) {
    books.push(createBook())
  }
  return Promise.all(books)
}

export default {
  generate,
  createBookObject
}
