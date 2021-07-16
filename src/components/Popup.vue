<template>
  <div class="popup-background">


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
  </div>
</template>

<script>
  export default {
    name: "Popup",
  }
</script>

<style scoped>
.popup-background {
  width: 100%;
  height: 100%;
  background-color: rgba(32,33,36,0.6);  
  display: flex;
  justify-content: center;
}

.popup {
  /* position: relative;
  top: 20px; */
  border-radius: 12em;
  z-index: 99;
  background-color:white;
  border: 1px solid #dadce0;
  font-size: 16px;
  
 
  border-radius: 12px;
  box-shadow: 2px 2px 2px 1px rgba(148, 64, 64, 0.1);
/* 
  display: flex;
  align-items: center;
  justify-content: center;

 */

  position: fixed;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  /* width: 100%;
  height: 100%; */
}

.button-group {
  margin: 14px 10px;
  position: absolute;
  right: 10px;
  bottom: 4px;
  
}

.popup-inner {
  padding: 40px 60px;
}

button {
  color: #a5b4c7;
  background-color: transparent;
  border: none;
  letter-spacing: 0.6px;
  width: 50px;
}

button:hover {
  background-color: #d1e2f8;
  border-radius: 12px;
  padding: 6px 12px;
  letter-spacing: 0.6px;
  color: #1a73e8;
}

</style>