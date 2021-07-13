<template>
  <div class="popup">
    <div class="popup-inner">
      <slot></slot>
      
      <div class="button-group">
        <button class="popup-close"
        @click="$emit('close')">
          Cancel
        </button>
          <button class="popup-done" @click="$emit('submit')">
          Done
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Popup",
  }
</script>

<style scoped>
.popup {
  position: relative;
  top: 20px;
  border-radius: 12em;
  z-index: 99;
  background-color:white;
  border: 1px solid #dadce0;
  font-size: 16px;
  
 
  border-radius: 12px;
  box-shadow: 2px 2px 2px 1px rgba(148, 64, 64, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;
}

.button-group {
  margin: 14px 4px 10px 0px;
  position: absolute;
  right: 10px;
  bottom: 4px;
}

.popup-inner {
  padding: 40px 60px;
}

.popup-close {
  background-color: transparent;
  border: none;
  letter-spacing: 0.6px;
  color: #1a73e8;
}

.popup-close:hover {
  background-color: #a8cdfd;
  border-radius: 12px;
  padding: 4px;
  letter-spacing: 0.6px;
  color: #1a73e8;
}

.popup-done {
  margin-left: 10px;
  background-color: transparent;
  border: none;
  letter-spacing: 0.6px;
  color: #a5b4c7;
}
</style>