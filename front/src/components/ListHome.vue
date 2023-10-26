<template>
    <div class="list-container">
        <router-link v-for="item in items" :key="item.id" :to="`/list/${item.id}`" class="list-item">
            <div class="list-item__title">{{ item.name }}</div>
        </router-link>
        <button class="btn btn--primary" @click="openModal">Ajouter une liste</button>
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
</style>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import AddList from '@/components/forms/AddList.vue';
</script>

<script lang="ts" >
export default {

    data() {
        return {
            items: [],
            isModalOpen: false,
        };
    },

    methods: {
        async getData() {
            const response = await fetch('http://localhost:3000/lists');
            const data = await response.json();
            this.items = data;
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
    },

    mounted() {
        this.getData();
    },


};

</script>
