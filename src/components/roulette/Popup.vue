<template>
  <div class="popup-wrapper">
    <div class="popup">
      <!-- <header class="header">
        <div class="prize-description">
          <p class="prize-description__title">ваш приз:</p>
          <h2 class="prize-description__name">{{ prize.prizeName }}</h2>
        </div>
        <div class="prize-image">
          <img :src="`${prize.prizeImage}`" :alt="`prize image ${prize.prizeName}`">
        </div>
      </header> -->
      <div class="popup__body">
        <div class="congratulation">
          <div class="congratulation__image">
            <div class="image-wrapper">
              <img src="../../../public/img/smile.png" alt="congratulation image">
            </div>
          </div>
          <p class="congratulation__title">{{message}}</p>
        </div>
      </div>
      <footer class="footer">
        <action-button tag="button" :href="link" theme="dark" @click="actionHandler">{{$ml.get('tryAgain')}}</action-button>
      </footer>
    </div>
  </div>
</template>

<script>
import ActionButton from '../ActionButton';
import {bus} from '@/main.js';

export default {
  name: 'Popup',
  components: {
    ActionButton,
  },
  props: {
    // prize: {
    //   type: Object,
    //   required: true,
    // },
    message: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      link: process.env.VUE_APP_LANDING_PAGE,
    };
  },
  methods: {
    actionHandler() {
      bus.$emit('toRoulette');
    },
  },
};
</script>

<style>
  /* Popup Wrapper */
  .popup-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
  }

  /* Popup */
  .popup {
    position: absolute;
    left: 50%;
    top: 50%;
    max-width: 85%;
    border-radius: 1rem;
    background-color: #96B9FF;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 768px){
    .popup {
        max-width: none;
        width: 90%;
    }
  }
  .popup .action__button{
    font-size: 16px;
  }

  /* header */
  .header {
    position: relative;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr auto;
  }
  @media (max-width: 992px){
    .header{
      grid-template-columns: 1fr;
    }
    
  }

  .popup__body {
    text-align: center;
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

  /* Prize Image */
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

  .congratulation {
    max-width: 80%;
    margin: 3% auto 0;
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
    width: 60px;
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

  .footer {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
</style>