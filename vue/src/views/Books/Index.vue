<template>
  <div class="list row">
    <div class="col-md-10">
      <h4>Books List</h4>
      <router-link to="/books/create" class="btn btn-warning">Create book</router-link>
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Created at</th>
          <th>Published at</th>
          <th>Controls</th>
        </tr>
        <tr>
          <th><input v-model="filters.title" type="text" class="form-control" placeholder="Search by title"/></th>
          <th><input v-model="filters.author" type="text" class="form-control" placeholder="Search by author"/></th>
          <th><input v-model="filters.createdAt" type="text" class="form-control" placeholder="Search by created"/></th>
          <th><input v-model="filters.publishedAt" type="text" class="form-control" placeholder="Search by created"/></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(book, index) in books" :key="index">
          <td>
            {{ book.title }}
          </td>
          <td>
            {{ book.author }}
          </td>
          <td>
            {{ $filters.formatTime(book.createdAt) }}
          </td>
          <td>
            {{ $filters.formatTime(book.publishedAt) }}
          </td>
          <td>
            <router-link :to="`/books/${book._id}/edit`" class="badge badge-warning">Edit</router-link>
            <button @click="deleteBook(book._id)" type="button" class="badge badge-danger">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import _ from 'lodash'

export default defineComponent({
  setup () {
    /* get books */
    const books = ref([])
    const getBooks = _.throttle(() => {
      axios.get(`${process.env.VUE_APP_API_DOMAIN}/books`, { params: filters })
        .then(response => {
          books.value = response.data
        })
        .catch(error => {
          console.error(error)
        })
    }, 200)
    /* get books */

    /* filters */
    const route = useRoute()
    const filters = reactive <any>({
      title: route.query.title,
      author: route.query.author,
      createdAt: route.query.createdAt,
      publishedAt: route.query.publishedAt
    })
    getBooks()

    function updateQueryParams () {
      const usedFilters = _.pickBy(filters, _.identity)
      const urlSearchParams = new URLSearchParams(usedFilters)
      const queryParams = urlSearchParams.toString()

      if (queryParams) { history.replaceState(history.state, '', `?${queryParams}`) }
    }
    watch(filters, () => {
      updateQueryParams()
      getBooks()
    })

    onActivated(() => {
      updateQueryParams()
      getBooks()
    })
    /* filters */

    function deleteBook (id : string) {
      axios
        .delete(`${process.env.VUE_APP_API_DOMAIN}/books/${id}`)
        .then(_response => {
          getBooks()
        })
        .catch(error => {
          console.error(error)
        })
    }
    return { books, filters, deleteBook }
  }
})
</script>

<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

table {
  margin: 0 auto; /* or margin: 0 auto 0 auto */
}
</style>
