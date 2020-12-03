import { BookForm } from '@/store/store-types'

export const state = {
  bookForm: <BookForm> {
    title: '',
    author: '',
    content: '',
    publishedAt: '',
    createdAt: ''
  }
}

export type State = typeof state
