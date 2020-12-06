import { Filter } from './index'

class BookFilter extends Filter {
  title (title) {
    return new RegExp(`${title}`, 'i')
  }

  author (author) {
    return new RegExp(`${author}`, 'i')
  }

  content (content) {
    return new RegExp(`${content}`, 'i')
  }

  publishedAt (publishedAt) {
    return new Date(publishedAt)
  }

  createdAt (createdAt) {
    return { $gte: new Date(createdAt) }
  }
}
export { BookFilter }
