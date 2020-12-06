import { Filter } from './index'
import moment from 'moment'

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
    const dateTime = moment.utc(publishedAt)
    if (!dateTime.isValid()) {
      throw Error('invalid date format')
    }
    return dateTime
  }

  createdAt (createdAt) {
    const dateTime = moment.utc(createdAt)
    if (!dateTime.isValid()) {
      throw Error('invalid date format')
    }
    return { $gte: dateTime }
  }
}
export { BookFilter }
