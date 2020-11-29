<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            v-for="(book, index) in books"
            :key="index"
        >
          title
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div>
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label>
        </div>
        <div>
          <label><strong>Description:</strong></label>
        </div>
        <div>
          <label><strong>Status:</strong></label>
        </div>

        <router-link :to="'/books/1/edit'" class="badge badge-warning">Edit</router-link>
      </div>
      <div>
        <br/>
        <p>Please click on a Tutorial... </p>
      </div>
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
        .get('http://localhost:3000/books')
        .then(response => {
          books.value = response.data
        })
        .catch(error => {
          console.error(error)
        })
    }

    getBooks()

    return { books }
  }
})
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
