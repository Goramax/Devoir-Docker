<template>
    <div class="modal-container">
    <div class="modal">
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

}
.modal {
    position: relative;
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
}

</style>