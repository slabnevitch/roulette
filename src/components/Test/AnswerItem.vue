<template>
  <li class="answer-list__item">
    <button
      :class="answerClasses"
      :style="answerStyle"
      type="button"
      @click="$emit('click')">
      {{ answer.text }}
    </button>
  </li>
</template>

<script>
  export default {
    name: 'AnswerItem',
    props: {
      answer: {
        type: Object,
        required: true,
      },
      currentAnswerState: {
        type: String,
        default: null,
      }
    },
    computed: {
      answerClasses() {
        return {
          'answer-list__button': true,
          'answer-list__button--success': this.currentAnswerState === 'success',
          'answer-list__button--fail': this.currentAnswerState === 'fail',
        };
      },
      answerStyle() {
        const styles = {};
        if (this.answer.text.length > 6) {
          styles['font-size'] = '1rem';
        }
        return styles;
      },
    },
  };
</script>

<style scoped>
.answer-list__item {
  margin-left: 0;
}

/* Answer List Button */
.answer-list__button {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding-top: 6px;
  padding-bottom: 6px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
}
@media (min-width: 600px) {
  .answer-list__item {
    font-size: 3rem;
  }
}
@media (max-width: 599.99px) {
  .answer-list__item {
    font-size: 1.4rem;
  }
}

.answer-list__button--fail {
  background: rgba(255, 154, 154, 0.74);
}

.answer-list__button--success {
  background: rgba(182, 255, 220, 0.74);
}
</style>