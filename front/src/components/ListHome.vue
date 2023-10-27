<template>
  <div class="list-container">
    <router-link
      v-for="list in lists"
      :key="list.id"
      :to="`/list/${list.id}`"
      class="list-item"
    >
      <div class="list-item__title">{{ list.name }}</div>
      <div class="list-item__actions">
        <span @click="deleteList(list.id, $event)"
          ><img src="@/assets/delete.svg" alt="delete"
        /></span>
      </div>
    </router-link>
    <button class="btn btn--primary" @click="openModal">
      Ajouter une liste
    </button>
  </div>
  <Modal v-if="isModalOpen" @close="closeModal" title="Nouvelle liste">
    <AddList @closeModal="closeModal" @refreshData="refreshData" />
  </Modal>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1024px;
}

.list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  position: relative;
}

.list-item:hover {
  background-color: #eee;
}

.list-item:hover div {
  color: #000;
}

.list-item__title {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
  text-decoration: none;
  text-align: center;
}

.list-item__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  gap: 1rem;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
}
.list-item__actions span img {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}
</style>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import AddList from "@/components/forms/AddList.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      lists: [],
      isModalOpen: false,
    };
  },

  methods: {
    async getData() {
      const response = await fetch("http://localhost:3000/lists");
      const data = await response.json();
      this.lists = data;
      console.log(data);
    },

    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    refreshData() {
      this.getData();
    },

    async deleteList(id: number, e: Event) {
      e.preventDefault();
      const response = await fetch(`http://localhost:3000/lists/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.getData();
      }
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
