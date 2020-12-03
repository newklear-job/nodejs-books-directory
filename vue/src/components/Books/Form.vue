<template>
  <div class="form-group">
    <label for="title">Title</label>
    <input
      type="text"
      class="form-control"
      id="title"
      required
      v-model="bookForm.title"
    />
  </div>

  <div class="form-group">
    <label for="author">Author</label>
    <input
      class="form-control"
      id="author"
      required
      v-model="bookForm.author"
    />
  </div>

  <div class="form-group">
    <label for="content">Content</label>
    <textarea
      class="form-control"
      id="content"
      required
      rows="6" cols="50"
      v-model="bookForm.content"
    />
  </div>

  <div class="form-group">
    <label for="publishedAt">Published at</label>
    <input
      class="form-control"
      id="publishedAt"
      required
      v-model="bookForm.publishedAt"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup () {
    const store = useStore()

    const bookForm = reactive({}) as any
    for (const [key] of Object.entries(store.getters.bookForm)) {
      bookForm[key] = computed({
        get () {
          return store.getters.bookForm[key]
        },
        set (value: string) {
          store.commit('bookFormUpdateField', {
            field: key,
            value: value
          })
        }
      })
    }
    return { bookForm }
  }
})
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
