<template>
  <div id="app"> 
    <!-- <button
      v-for="lang in $ml.list"
      :key="lang"
      @click="$ml.change(lang)"
      v-text="lang"
    /> -->

    <div :class="['app', `app--${theme}`, {blur: blur}]">
      <div class="app-vertical-position">
        <div class="app-horizontal-position" :style="{maxWidth: appState === 0 ? '100%' : '80%'}">
      <div class="toggle-button-cover">
        <div class="button-cover">
          <div class="button b2" id="button-10">
            <input type="checkbox" class="checkbox" v-model="isChecked">
            <div class="knobs">
              <span>RU</span>
            </div>
            <div class="layer"></div>
          </div>
        </div>
      </div>

          <transition name="fade-in-screen" mode="out-in" class="test-screen-hide">
            <component
              :is="currentComponent"
              v-bind="{prizes}"
              :questions="questionsCategories[currentQuizIndex].catQuestions"
              @scrollToQuiz="scrollToQuiz"/>
          </transition>

        </div>
      </div>
      <div class="dummy"></div>

    </div>
    <portal-target name="popup" @change="portalHandle"/>
  </div>
</template>

<script>
import winners from './assets/winners.json';
import questions from './assets/questions.json';
import questionsCategories from './assets/questionsCategories.json';
import prizes from './assets/prizes.json';

import RouletteView from './components/RouletteView';
import TestView from './components/TestView';
import WinnersRibbon from './components/WinnersRibbon';

import {bus} from '@/main.js';

const ROULETTE = 0;
const TEST = 1;

export default {
  name: 'App',
  components: {
    WinnersRibbon,
    TestView,
    RouletteView,
  },
  data() {
    return {
      theme: 'dark',
      blur: false,
      appState: ROULETTE,
      winners,
      questions,
      questionsCategories,
      prizes,
      currentQuizIndex: 0,
      isQuiz: false,
      isChecked: false
    };
  },
  watch: {
    isChecked(){
      console.log(this.isChecked)
      console.log(this.$ml.current)
      this.$ml.change(this.$ml.current === 'ru-RU' ? 'en-US' : 'ru-RU')
    }
  },
  computed: {
    currentComponent() {
      return !this.isQuiz ? 'RouletteView' : 'TestView'
    },
    componentProps() {
      switch (this.appState) {
        case ROULETTE:
          return {
            prizes,
          };
        case TEST:
          return {
            questions,
            prizes,
          };
      }
    },
  },
  created(){
    var userLang = navigator.language || navigator.userLanguage;
    // console.log(userLang);
    if (userLang === 'en-US'){
      this.$ml.change('userLang')
      
    }

    bus.$on('toRoulette', () => {
      this.isQuiz = false
    })
  },
  mounted() {
    const APP_MODE = process.env.VUE_APP_MODE;

    if (APP_MODE === 'roulette') {
      this.appState = ROULETTE;
    }
    else if (APP_MODE === 'quiz') {
      this.appState = TEST;
    }
  },
  methods: {
    portalHandle(newContent) {
      this.blur = newContent;
    },
    scrollToQuiz(index){
      // this.$refs.test.$el.scrollIntoView({ behavior: 'smooth', block: 'start'})
      this.isQuiz = !this.isQuiz
      
      console.log(this.isQuiz)
      this.currentQuizIndex = index 
    }
  }
}
</script>

<style l>
.app {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: minmax(auto, 550px) 1fr 110px;
  overflow: auto;
}

.app--dark {
  background-color: #18004D;
}

.app--light {
  background-color: #E5E5E5;
}

/* App Winners */
.app__winners  {
  max-width: 570px;
  margin: 0 auto;
  overflow-y: hidden;
}
@media (min-width: 600px) {
  .app__winners {
    width: 100%;
  }
}
@media (max-width: 599.99px) {
  .app__winners {
    width: 80%;
  }
}

/* App Test */
.app-horizontal-position {
  margin-left: auto;
  margin-right: auto;
  display: grid;
  height: 100%;
}

@media (max-width: 599.99px) {
  .app-horizontal-position {
    max-height: 570px;
  }
}

.app-vertical-position {
  position: relative;
  /*margin-top: 10%;*/
}

.blur {
  filter: blur(2px);
}

.fade-enter-active, .fade-leave-active {
  opacity: 100%;
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.dummy {
  margin-top: 10px;
}
</style>
