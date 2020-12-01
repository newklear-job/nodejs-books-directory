<template>
  <div class="form-group">
    <label for="title">Title</label>
    <input
      type="text"
      class="form-control"
      id="title"
      required
      v-model="bookUpdated.title"
    />
  </div>

  <div class="form-group">
    <label for="author">Author</label>
    <input
      class="form-control"
      id="author"
      required
      v-model="bookUpdated.author"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  props: {
    bookToUpdate: {
      type: Object,
      required: false
    }
  },
  setup (props) {
    const bookUpdated = reactive({
      title: props?.bookToUpdate?.title,
      author: props?.bookToUpdate?.author,
      content: props?.bookToUpdate?.content,
      createdAt: props?.bookToUpdate?.createdAt,
      publishedAt: props?.bookToUpdate?.publishedAt
    })
    return { bookUpdated }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
