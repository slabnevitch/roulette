<template>
  <transition name="fade-in-screen" mode="out-in" class="test-screen-hide">
    <component
      :is="currentScreen"
      v-bind="currentScreenProps"
      :currentQuizIndex="currentQuizIndex"
      @next="nextHandler"
      @test-result="testResultHandler"/>
  </transition>
</template>

<script>
import TestStartScreen from './Test/TestStartScreen';
import TestingScreen from './Test/TestingScreen';
import TestFinishScreen from './Test/TestFinishScreen';

export default {
  name: 'Test',
  components: {
    TestStartScreen,
    TestingScreen,
    TestFinishScreen,
  },
  props: {
    questions: {
      type: Array,
      default: () => [],
    },
    prizes: {
      type: Array,
      required: true,
    },
    currentQuizIndex: {
      type: Number
    }
  },
  data() {
    return {
      testState: 0,
      testResult: 0,
    };
  },
  mounted(){
    console.log(this.prizes)
  },
  computed: {
    targetPrize() {
      return this.prizes.find(prize => prize.isTargetPrize);
    },
    currentScreen() {
      switch (this.testState) {
        case 0:
          return 'TestStartScreen';
        case 1:
          return 'TestingScreen';
        case 2:
          return 'TestFinishScreen';
      }
    },
    currentScreenProps() {
      switch (this.testState) {
        case 1:
          return {
            questions: this.questions
          };
        case 2:
          return {
            externalLink: '#',
            testResult: this.testResult,
            prize: this.targetPrize,
          };
      }
    },
  },
  methods: {
    nextHandler(e) {
      this.testState++;
    },
    testResultHandler(result) {
      const reducer = (acc, key) => result[key] === 'success' ? ++acc : acc;
      this.testResult = Object.keys(result).reduce(reducer, 0);
      
    },
  },
};
</script>

<style>
.test__body {
  margin-top: 1rem;
}

.footer {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.fade-in-screen-enter-active, .fade-in-screen-leave-active {
  transition: all 0.2s;
}
.fade-in-screen-leave-to {
  transform: scale(0.9) translateX(-120%);
}
.fade-in-screen-enter {
  transform: scale(0.9) translateX(100%);
}
.test-screen-hide:after  {
  content: "";
  position: absolute;
  top: 5%;
  height: 90%;
  width: 15px;
  transition: all 0.2s;
  background-color: #907EFF;
  left: 0;
  border-top-right-radius: 21px;
  border-bottom-right-radius: 21px;
}
</style>