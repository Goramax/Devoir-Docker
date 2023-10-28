<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="name">Nom de la liste</label>
      <input type="text" id="name" v-model="name" />
    </div>
    <div class="form-actions">
      <button class="btn btn--primary" type="submit">Ajouter</button>
    </div>
  </form>
</template>

<script lang="ts">
// on form submit, get name and post it to the API
export default {
  data() {
    return {
      name: "",
    };
  },

  methods: {
    async submitForm() {
      const response = await fetch(import.meta.env.VITE_API_URL + "/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
        }),
      });

      if (response.ok) {
        this.$emit("closeModal");
        this.$emit("refreshData");
      } else {
        console.error("Error");
      }
    },
  },
};
</script>
