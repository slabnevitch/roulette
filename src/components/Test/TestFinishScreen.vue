<template>
  <!-- <test-wrapper> -->
    <!-- <header class="header-finish">
      <div class="prize-description">
        <p class="prize-description__title">ваш приз:</p>
        <h2 class="prize-description__name">{{ prize.prizeName }}</h2>
      </div>
      <div class="prize-image">
        <img :src="prize.prizeImage" :alt="`prize image ${prize.prizeName}`">
      </div>
    </header>
    <div class="test-body">
      <div class="congratulation">
        <div class="congratulation__image">
          <div class="image-wrapper">
            <img :src="'./img/smile.png'" alt="congratulation image">
          </div>
        </div>
        <p class="congratulation__title">Молодец!</p>
        <p class="congratulation__text">
          {{ congratulationText }}
        </p>
      </div>
    </div> -->
    <!-- <ActionButton></ActionButton> -->
    <!-- <footer class="footer">
      <action-button tag="a" :href="link" theme="dark">Попробовать еще раз</action-button>
    </footer> -->
  <!-- </test-wrapper> -->
    <portal v-if="popupShow" to="popup">
      <popup :prize="prize" :message="$ml.get('congratulationText')"/>
    </portal>
</template>

<script>
import TestWrapper from './TestWrapper';
import ActionButton from '../ActionButton';
import Popup from '../roulette/Popup';
import { MLBuilder } from 'vue-multilanguage'

export default {
  name: 'TestFinishScreen',
  components: {
    TestWrapper,
    ActionButton,
    Popup
  },
  props: {
    externalLink: {
      type: String,
      required: true,
      default: '#',
    },
    prize: {
      type: Object,
      required: true,
    },
    testResult: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      popupShow: true,
      link: process.env.VUE_APP_LANDING_PAGE,
    };
  },
  computed: {
    mlcongratulationText() {
      console.log(this.testResult)
      // return `Вы правильно ответили на ( ${this.testResult} ) вопросов из 4`
      return new MLBuilder('quizFinalMsg').with('f', this.testResult)
      // switch (this.testResult) {
      //   case 4:
      //     return 'Ты отлично справился, нажми на кнопку ниже и забери свой приз';
      //   default:
      //     return 'Ты немного ошибся, но все равно справился, нажми на кнопку ниже и забери свой приз';
      // }
    }
  }
};
</script>

<style scoped>
.header-finish {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
}

.prize-image {
  width: 100px;
  height: 80px;
  position: relative;
}

.prize-image img {
  position: absolute;
  width: 100%;
  top: -30%;
  right: 0;
}

/* Prize Description Title */
.prize-description__title {
  margin-top: 0;
  margin-bottom: 10px;
  color: #FFFFFF;
  text-transform: uppercase;
}
@media (max-width: 599.99px){
  .prize-description__title {
    font-size: 1.1rem;
  }
}

/* Prize Description Name */
.prize-description__name {
  margin: 0;
  font-weight: 600;
  color: #1C0057;
  text-transform: uppercase;
}
@media (max-width: 599.99px) {
  .prize-description__name {
    font-size: 1.4rem;
  }
}

/* Congratulation */
.congratulation {
  max-width: 80%;
  margin: 5% auto 0;
  display: grid;
  align-items: center;
  text-align: center;
}

/* Congratulation Image */
.congratulation__image {
  display: flex;
  justify-content: center;
}
.congratulation__image img {
  width: 80px;
}

/* Congratulation Title*/
.congratulation__title {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #1C0057;
  text-transform: uppercase;
}
@media (max-width: 599.99px) {
  .congratulation__title {
    font-size: 1.4rem;
  }
}
/* Congratulation Text */
.congratulation__text {
  margin: 0;
  color: #300057;
}
@media (max-width: 599.99px) {
  .congratulation__text {
    font-size: 1rem;
  }
}
</style>