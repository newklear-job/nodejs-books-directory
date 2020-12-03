import { MutationTree } from 'vuex'
import { State } from './state'
import { BookForm } from '@/store/store-types'

export type Mutations<S = State> = {
  bookForm(state: S, payload: BookForm): void,
  bookFormUpdateField(state: S, { field, value } : BookFormUpdateProperty): void
}

export const mutations: MutationTree<State> & Mutations = {
  bookForm (state, payload: BookForm) {
    state.bookForm = {
      title: payload.title,
      author: payload.author,
      content: payload.content,
      publishedAt: payload.publishedAt,
      createdAt: payload.createdAt
    }
  },
  bookFormUpdateField (state, { field, value } : BookFormUpdateProperty) {
    if (state.bookForm[field] !== undefined) { state.bookForm[field] = value }
  }
}

interface BookFormUpdateProperty {
  field: string,
  value: string
}
