<template>
  <div class="edit-form">
    <BookForm></BookForm>
    <div>
      <p v-if="feedback">{{ feedback }}</p>
      <router-link to="/books" class="btn btn-warning">Back</router-link>
<!--      <button class="btn btn-warning" @click="$router.go(-1)">Back history</button>-->
      <button class="btn btn-success" @click="update">Update</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
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

    const bookForm = computed(() => store.getters.bookForm)
    const feedback = ref < null | string >(null)
    function update () {
      axios
        .put(`${process.env.VUE_APP_API_DOMAIN}/books/${bookId}`, bookForm.value)
        .then(response => {
          store.commit('bookForm', response.data)
          feedback.value = 'Updated!'
        })
        .catch(error => {
          console.error(error)
          feedback.value = error.response.data.message
        })
    }

    return { update, feedback }
  }
})
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
