import { GetterTree } from 'vuex'
import { State } from './state'
import { BookForm } from '@/store/store-types'

export type Getters = {
  bookForm(state: State): BookForm
}

export const getters: GetterTree<State, State> & Getters = {
  bookForm: (state) => {
    return state.bookForm
  }
}
