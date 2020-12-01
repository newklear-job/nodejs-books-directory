<template>
  <div class="edit-form">
    <BookForm v-if="bookToUpdate" :book-to-update="bookToUpdate"></BookForm>
    <div>
      <h4 v-if="feedback">Book created successfully!</h4>
      <router-link to="/books/" class="btn btn-warning">Back</router-link>
      <button class="btn btn-success">Update</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import BookForm from '@/components/Books/Form.vue'

export default defineComponent({
  components: {
    BookForm
  },
  setup () {
    const route = useRoute()
    const bookId: string = route.params.id as string

    const bookToUpdate = ref <null | Object>(null)

    function getBook (id : string) {
      axios
        .get(`${process.env.VUE_APP_API_DOMAIN}/books/${id}`)
        .then(response => {
          bookToUpdate.value = response.data
        })
        .catch(error => {
          console.error(error)
        })
    }
    getBook(bookId)
    return { bookToUpdate }
  }
})
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
