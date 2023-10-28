<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="text">Contenu de l'item</label>
      <input type="text" id="text" name="text" v-model="text" />
    </div>
    <div class="form-actions">
      <button class="btn btn--primary" type="submit">Ajouter</button>
    </div>
  </form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    async submitForm() {
      const response = await fetch(import.meta.env.VITE_API_URL + "/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: this.text,
          listId: this.$route.params.id,
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
