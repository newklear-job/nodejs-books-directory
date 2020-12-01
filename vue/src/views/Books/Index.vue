<template>
  <div class="list row">
    <div class="col-md-10">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>
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
            <button type="button" class="badge badge-danger">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  setup () {
    const books = ref([])

    function getBooks () {
      axios
        .get(`${process.env.VUE_APP_API_DOMAIN}/books`)
        .then(response => {
          books.value = response.data
        })
        .catch(error => {
          console.error(error)
        })
    }

    getBooks()
    const data: Array<string | number> = []
    return { books, data }
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
