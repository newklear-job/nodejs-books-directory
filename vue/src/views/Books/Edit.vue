<template>
  <div class="edit-form">
    <BookForm></BookForm>
    <div>
      <h4 v-if="feedback">Book created successfully!</h4>
      <router-link to="/books/" class="btn btn-warning">Back</router-link>
      <button class="btn btn-success" @click="update">Update</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useStore } from '@/store'
import BookForm from '@/components/Books/Form.vue'

export default defineComponent({
  components: {
    BookForm
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const bookId: string = route.params.id as string

    const bookForm = computed(() => store.getters.bookForm)
    function getBook (id : string) {
      axios
        .get(`${process.env.VUE_APP_API_DOMAIN}/books/${id}`)
        .then(response => {
          store.commit('bookForm', response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
    getBook(bookId)

    function update () {
      console.log(bookForm.value)
    }

    return { update }
  }
})
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
