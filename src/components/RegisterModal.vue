<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content">
          <slot/>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>

  .modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

.modal-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

.modal-content {
    padding: 20px 30px;
  }

</style>
