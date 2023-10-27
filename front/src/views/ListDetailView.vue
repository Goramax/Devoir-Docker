<template>
  <div class="main-container">
    <div class="list-container">
      <span class="title-container"
        ><h2>{{ list.name }}</h2></span
      >
      <div
        class="list-item"
        v-for="item in items"
        :key="item.id"
        :class="{ completed: item.isCompleted }"
      >
        <div class="list-item__title">
          {{ item.text }}
        </div>
        <div class="list-item__actions">
          <span @click="deleteItem(item.id, $event)"
            ><img src="@/assets/delete.svg" alt="delete"
          /></span>
          <input
            type="checkbox"
            :id="item.id"
            :checked="item.isCompleted"
            @change="toggleItem(item.id, $event)"
          />
        </div>
      </div>
      <button class="btn btn--primary" @click="openModal">
        Ajouter un item
      </button>
    </div>
  </div>
  <Modal v-if="isModalOpen" @close="closeModal" title="Nouvel item">
    <AddItem @closeModal="closeModal" @refreshData="refreshData" />
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import AddItem from "@/components/forms/AddItem.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      items: [],
      list: {},
      isModalOpen: false,
    };
  },
  methods: {
    async getData() {
      const response = await fetch(
        `http://localhost:3000/items/list/${this.$route.params.id}`
      );
      const data = await response.json();
      this.items = data;
    },
    async getList() {
      const response = await fetch(
        `http://localhost:3000/lists/${this.$route.params.id}`
      );
      const data = await response.json();
      this.list = data;
    },
    async deleteItem(id: number, event: Event) {
      event.preventDefault();
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTimeout(() => {
          this.getData();
        }, 100);
      }
    },
    async toggleItem(id: number, event: Event) {
      event.stopPropagation();
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isCompleted: event.target.checked ?? false,
        }),
      });
      if (response.ok) {
        setTimeout(() => {
          this.getData();
        }, 100);
      }
    },
    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },
  },
  mounted() {
    this.getData();
    this.getList();
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 4rem 1rem;
}
.list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1024px;
  padding: 20px;
  background: #fff;
  border-radius: 25px;
}

.list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  position: relative;
  background-color: var(--color-background);
}

.list-item.completed {
  background-color: #006400;
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

.title-container {
  padding: 0 1rem 1rem 1rem;
  width: 80%;
}
h2 {
  color: black;
  padding: 1rem 0;
  border-bottom: 1px solid #000;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}
</style>
