<template>
  <div class="quiz">
    <div class="question__number">&#8470;{{ questionNum }}</div>
    <p class="question">
      {{ question.text }}
    </p>
    <answer-list
      :answers="question.answers"
      :answer-state="answerState"
      @answer="answerHandler"/>
  </div>
</template>

<script>
import AnswerList from './AnswerList';

export default {
  name: 'Quiz',
  components: {
    AnswerList,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
    answerState: {
      type: Object,
      default: null,
    },
    questionNum: {
      type: Number,
      required: true,
    },
  },
  methods: {
    answerHandler(answerId) {
      this.$emit('answer', answerId);
    },
  },
};
</script>

<style scoped>
/* Question Text */
.question {
  margin-top: 10px;
  line-height: 1.1;
  color: #300057;
}
@media (min-width: 600px) {
  .question {
    font-size: 3rem;
  }
}
@media (max-width: 599.99px) {
  .question {
    font-size: 1.4rem;
    margin-bottom: 0;
  }
}

/* Question Number */
.question__number {
  margin-top: 1rem;
  line-height: 1.1;
  color: #FFFFFF;
}
@media (min-width: 600px) {
  .question__number {
    font-size: 3rem;
  }
}
@media (max-width: 599.99px) {
  .question__number {
    font-size: 1.4rem;
  }
}
</style>