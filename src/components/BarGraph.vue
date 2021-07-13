<template>
  <div class="bar-graph">
    <div
      class="bar"
      v-for="(barHeight, index) in barHeights"
      :key="index"
      :style="{
        height: barHeight,
      }"
      @mouseover="$emit('mouseOver', index)"
      @mouseleave="$emit('mouseLeave')"
       @click="$emit('barSelect', index)"
    />
    
    <div class="yaxis-label" 
      v-for="(label, index) in yAxisLabels" 
      :key="index"

      :style="`bottom: ${label.positionFromBottom}`"
    >
      {{ label.label }}
    </div>
  </div>

  <div class="xaxis-display">


    <div class="xaxis-label" v-for="(label, index) in xAxisLabels" :key="index"
    >
    {{ label }}
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      isActive: {
        type: Boolean,
      },
      barHeights: {
        type: Array,
        default: () => []
      },
      xAxisLabels: {
        type: Array,
        default: () => []
      },
      yAxisLabels: {
        type: Array,
        default: () => []
      }
    },
  }
</script>

<style scoped>

.bar-graph {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  border-left: 1px solid grey;
  border-bottom: 1px solid grey;

  width: 700px;
  height: 400px;

  position: relative;
}

.bar {
  background-color: orange;
  width: 40px;
}

.selected-bar {
  background-color: blue;
  width: 40px;
}

.xaxis-display {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  width: 700px;
  height: 20px;
}

.xaxis-label {
  font-size: 12px;
}

.yaxis-label {
  position: absolute;
  right: 100%;
}

.bar:hover {
  border: 1px solid black;
  outline: #4CAF50 solid 4px;
}
</style>