<template>
  <div class="roulette-screen">
    <div class="roulette__text">
      <p class="roulette__motivation">{{$ml.get('rouletteTitleRart1')}}</p>
      <p class="roulette__reward">{{$ml.get('rouletteTitleRart2')}}</p>
    </div>
    <div class="roulette__frame">
      <ul :class="rouletteClasses" :style="rouletteStyles">
        <li v-for="(prize, index) of prizes" :key="index + 1" class="roulette-item">
          <!-- <div v-if="prize.isRotationMore" class="roulette__prize-text-position">
            <span class="roulette__prize-text">
              крутить ещё
            </span>
          </div> -->
          <img class="roulette__prize-image" :src="prize.prizeImage" alt="">
        </li>
      </ul>
    </div>
    <div class="roulette__controls">
      <action-button theme-type="light" @click="rotationRoulette">{{ $ml.get('actionText') }}</action-button>
    </div>

    <portal v-if="popupShow" to="popup">
      <popup :prize="prizes[currentPrizeIndex]" @next="nextHandler"/>
    </portal>
  </div>
</template>

<script>
import { randomIndex } from '../helpers';
import ActionButton from './ActionButton';
import Popup from './roulette/Popup';
import {bus} from '@/main.js';
import { MLBuilder } from 'vue-multilanguage'

export default {
  name: 'RouletteView',
  components: {
    ActionButton,
    Popup,
  },
  props: {
    maxRotations: {
      type: Number,
      default: 1,
    },
    prizes: {
      type: Array,
      required: true,
    },
    animationDuration: {
      type: Number,
      default: 3,
    }
  },
  created(){
    // console.log(this.$root.lang)
    // this.$root.lang = 'ru'
    // console.log(this.$root.lang)
    // console.log('mounted')
  },
  data() {
    return {
      currentRotation: 0,
      currentPrizeIndex: -1,
      animationRun: false,
      popupShow: false,
      actionText: 'крутить',
    };
  },
  mounted(){
    // console.log(this.maxRotations)
  },
  computed: {
    mlactionText () {
      return new MLBuilder('actionText').with(this.setActionText())
    },
    rotationMoreIndexes() {
      return this.prizes.reduce((acc, prize, index) => {
        if (prize.isRotationMore) {
          acc.push(index);
        }
        return acc;
      }, []);
    },
    targetPrizeIndex() {
      return this.prizes.findIndex(prize => prize.isTargetPrize);
    },
    rouletteClasses() {
      return ['roulette', this.currentPrizeIndex !== -1 ? `number-${this.currentPrizeIndex + 1}` : ''];
    },
    rouletteStyles() {
      return {
        animationDuration: `${this.animationDuration}s`,
      };
    },

  },
  methods: {
    rotationRoulette() {
      if (this.animationRun || this.currentRotation >= this.maxRotations) {
        return;
      }
      this.animationRun = true;
        // console.log(this.currentRotation < this.maxRotations)
        this.currentPrizeIndex = randomIndex(0, this.prizes.length - 1);
        this.currentRotation++;
        // console.log(this.currentPrizeIndex)

      setTimeout(() => {
        this.animationRun = false;
        this.actionText = this.setActionText();
        this.$emit('scrollToQuiz', this.currentPrizeIndex)
        // this.popupShow = true

      }, this.animationDuration * 1000);
    },
    setActionText() {
      const currentPrize = this.currentPrizeIndex !== null && this.prizes[this.currentPrizeIndex];
      let text = 'крутить';
      if (this.currentRotation >= this.maxRotations) {
        text = 'ответить на вопросы';
      }
      return text;
    },
    nextHandler() {
      this.$emit('next');
    },
  },
};
</script>

<style lang="scss">
  .roulette-screen {

  }

  .roulette {
    width: 308px;
    height: 308px;
    padding: 0;
    margin: 0;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    counter-reset: num;
    background:
      center / contain no-repeat url("../../public/img/roulette__table.png");
    animation-timing-function: cubic-bezier(0,.4,.4,1.04);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;

    @for $i from 1 through 4 {
      &.number-#{$i} {
        animation-name: 'number-#{$i}';
      }
    }
  }

  .roulette-item {
    position: absolute;
    top: 30px;
    right: 0;
    left: 0;
    display: block;
    margin: auto;
    width: 100px;
    height: 124px;
    transform-origin: 50px 124px;

    @for $i from 1 through 4 {
      &:nth-of-type(#{$i}) {
        transform: rotate(#{$i * 90deg});
      }
    }
  }

  @for $d from 1 through 4 {
    @keyframes number-#{$d} {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(#{360 * 7 - 90 * $d}deg);
      }
    }
  }

  .roulette__controls {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .roulette__button {
    background-color: #0051EF;
    color: #FFFFFF;
    font-size: 1rem;
    text-transform: uppercase;
    border-radius: 1rem;
    border: none;
  }
  .roulette__frame {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    background: center / contain no-repeat url("../../public/img/roulette-field.png");
    overflow: hidden;
    &:after {
      content: "";
      display: block;
      margin: auto;
      width: 72px;
      height: 75px;
      background: center / contain no-repeat url("../../public/img/roulette__arrow.png");
      position: absolute;
      top: -16px;
      right: -2px;
      left: 0;
    }
  }
  .roulette__prize-image {
    display: block;
    max-width: 63%;
    margin: 0 auto;
    max-height: 70px;
  }

  .roulette__prize-text-position {
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .roulette__prize-text {
    writing-mode: tb-rl;
    transform: rotate(180deg);
    font-size: 0.8rem;
    font-weight: 600;
    text-align: end;
    text-transform: uppercase;
    color: #FFFFFF;
  }

  .roulette__motivation {
    margin-top: 0;
    margin-bottom: 0.5rem;
    line-height: 1.1;
    text-transform: uppercase;
    color: #96B9FF;
    text-align: center;
  }
  @media (max-width: 599.99px) {
    .roulette__motivation {
      font-size: 1rem;
    }
  }

  .roulette__reward {
    margin-top: 0;
    font-weight: 600;
    line-height: 1.1;
    text-transform: uppercase;
    color: #96B9FF;
    text-align: center;
  }
  @media (max-width: 599.99px) {
    .roulette__reward {
      font-size: 1.4rem;
    }
  }
</style>