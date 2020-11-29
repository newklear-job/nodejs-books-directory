<template>
  <div class="submit-form">
    <div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          name="description"
        />
      </div>

      <button class="btn btn-success">Submit</button>
    </div>

    <div>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BookCreate'
}
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
