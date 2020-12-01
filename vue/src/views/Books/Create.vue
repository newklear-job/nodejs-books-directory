<template>
  <div class="create-form">
    <BookForm></BookForm>
    <div>
      <h4 v-if="feedback">Book created successfully!</h4>
      <router-link to="/books/" class="btn btn-warning">Back</router-link>
      <button class="btn btn-success">Create</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BookForm from '@/components/Books/Form.vue'

export default defineComponent({
  components: {
    BookForm
  },
  setup () {
  }
})
</script>

<style>
.create-form {
  max-width: 300px;
  margin: auto;
}
</style>
