<template>
  <div class="create-form">
    <BookForm></BookForm>
    <div>
      <h4 v-if="feedback">Book created successfully!</h4>
      <router-link to="/books/" class="btn btn-warning">Back</router-link>
      <button class="btn btn-success" @click="create">Create</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import BookForm from '@/components/Books/Form.vue'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    BookForm
  },
  setup () {
    const store = useStore()

    const bookForm = computed(() => store.getters.bookForm)
    function create () {
      console.log(bookForm.value)
    }
    return { create }
  }
})
</script>

<style>
.create-form {
  max-width: 300px;
  margin: auto;
}
</style>
