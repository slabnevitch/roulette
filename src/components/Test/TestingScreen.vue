<template>
  <test-wrapper>
    <Header/>
    <div class="test__body">
      <question-indicator :question-num="questionNum" />
      <transition name="fade-in" mode="out-in">
        <quiz
          v-if="activeQuestion"
          :key="activeQuestion.id"
          :answerState="answerState"
          :question="activeQuestion"
          :question-num="questionNum"
          @answer="answerHandler"/>
      </transition>
    </div>
    <footer class="footer">
      <action-button theme="dark" @click="nextQuestion">{{$ml.get('testNext')}}</action-button>
    </footer>
  </test-wrapper>
</template>

<script>
import TestWrapper from './TestWrapper';
import Header from './Header';
import QuestionIndicator from './QuestionIndicator';
import Quiz from './Quiz';
import ActionButton from '../ActionButton';

export default {
  name: 'TestScreen',
  components: {
    TestWrapper,
    Header,
    QuestionIndicator,
    Quiz,
    ActionButton
  },
  props: {
    questions: {
      type: Array,
      required: true,
    },
    testLength: {
      type: Number,
      default: 4,
    }
  },
  data() {
    return {
      questionNum: 1,
      result: {},
      answerState: null
    };
  },
  computed: {
    activeQuestion() {
      console.log(this.result)
      return this.questions[this.questionNum - 1];
    },
     congratulationText() {
      console.log(this.testResult)
      return `Вы правильно ответили на ${this.testResult} вопросов из 4`
    }
  },
  methods: {
    nextQuestion() {
      if (!this.answerState) {
        return;
      }
      if (this.questionNum >= this.testLength) {
        this.$emit('next', 'testing');
        this.$emit('test-result', this.result);
        return;
      }
      this.answerState = null;
      this.questionNum++;
    },
    answerHandler(answerId) {
      const SUCCESS = 'success';
      const FAIL = 'fail';
      const questionId = this.activeQuestion.id;
      const { rightAnswerId } = this.activeQuestion;
      if (rightAnswerId === answerId) {
        this.answerState = { [answerId]: SUCCESS };
        if (!this.result[questionId]) {
          this.result[questionId] = SUCCESS;
        }
      } else {
        this.answerState = { [answerId]: FAIL };
        if (!this.result[questionId]) {
          this.result[questionId] = FAIL;
        }
      }
    },
  },
};
</script>

<style scoped>
.fade-in-enter-active, .fade-in-leave-active {
  transition: all 0.2s;
}
.fade-in-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.fade-in-enter {
  transform: translateX(100%);
}
</style>