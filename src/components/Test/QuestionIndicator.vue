<template>
  <div class="indicator">
    <div
      v-for="num in 4"
      :key="num"
      :class="['indicator-item', (num === questionNum) ? 'indicator-item--active' : '']" />
  </div>
</template>

<script>
export default {
  name: 'QuestionIndicator',
  props: {
    questionNum: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.indicator {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 5px;
}
.indicator-item {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}
.indicator-item--active {
  border-color: #FFFFFF;
}
</style>