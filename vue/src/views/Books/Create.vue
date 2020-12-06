<template>
  <div class="create-form">
    <BookForm></BookForm>
    <div>
      <p v-if="feedback">{{ feedback }}</p>
      <router-link to="/books" class="btn btn-warning">Back</router-link>
      <button class="btn btn-success" @click="create">Create</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, ref } from 'vue'
import BookForm from '@/components/Books/Form.vue'
import { useStore } from '@/store'
import axios from 'axios'

export default defineComponent({
  components: {
    BookForm
  },
  setup () {
    const store = useStore()

    const bookForm = computed(() => store.getters.bookForm)

    function clearBookForm () {
      store.commit('bookForm', {
        title: '',
        author: '',
        content: '',
        publishedAt: ''
      })
    }

    const feedback = ref<null | string>(null)

    function create () {
      axios
        .post(`${process.env.VUE_APP_API_DOMAIN}/books/`, bookForm.value)
        .then(_response => {
          clearBookForm()
          feedback.value = 'Created!'
        })
        .catch(error => {
          console.error(error)
          feedback.value = error.response.data.message
        })
    }

    onActivated(() => {
      clearBookForm()
    })

    return { create, feedback }
  }
})
</script>

<style>
.create-form {
  max-width: 300px;
  margin: auto;
}
</style>
