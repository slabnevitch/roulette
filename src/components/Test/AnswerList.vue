<template>
  <ul class="answer-list">
    <answer-item
      v-for="answer in answers"
      :key="answer.id"
      :answer="answer"
      :current-answer-state="answerState ? answerState[answer.id] : null"
      @click="clickHandler(answer.id)"/>
  </ul>
</template>

<script>
import AnswerItem from './AnswerItem';

export default {
  name: 'AnswerList',
  components: {
    AnswerItem,
  },
  props: {
    answers: {
      type: Array,
      required: true,
    },
    answerState: {
      type: Object,
      default: null,
    },
  },
  methods: {
    clickHandler(answerId) {
      this.$emit('answer', answerId);
    },
  },
};
</script>

<style scoped>
.answer-list {
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>