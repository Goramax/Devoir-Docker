<template>
    <div class="modal-container">
        <div class="modal">
            <div class="modal__header">
                <button @click="closeModal">&times;</button>
                <h2 class="modal__title">{{ title }}</h2>
            </div>
            <div class="modal__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
    background-color: rgba(0,0,0,0.2);
}

.modal {
    position: relative;
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
}

.modal__header h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: black;
    text-align: center;
    text-transform: uppercase;
}

.modal__header button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>

<script lang="ts">
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
}

</script>