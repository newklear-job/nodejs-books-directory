<template>
  <div class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"

        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"

        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>

      </div>
    </form>

    <button class="badge badge-primary mr-2"
    >
      UnPublish
    </button>
    <button class="badge badge-primary mr-2"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
    >
      Update
    </button>
    <p></p>
  </div>

  <div>
    <br/>
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BookEdit'
}
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
