<template>
  <div class="roulette__frame">
    <ul :class="rouletteClasses">
      <li v-for="(prize, index) of prizes" :key="index + 1" class="roulette-item"></li>
    </ul>
  </div>
</template>

<script>
import ActionButton from '../ActionButton';
export default {
  name: 'Roulette',
  components: {
    ActionButton,
  },
  props: {
    currentPrizeIndex: {
      type: Number,
      required: true,
    },
    prizes: {
      type: Array,
      required: true,
    }
  },
  computed: {
    rouletteClasses() {
      return ['roulette', this.currentPrizeIndex !== -1 ? `number-${this.currentPrizeIndex + 1}` : ''];
    },
  },
};
</script>

<style lang="scss">
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
    center / contain no-repeat url("../../../public/img/roulette__table.png");
  animation-timing-function: cubic-bezier(0,.4,.4,1.04);
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  &:after {
    content: "";
    display: block;
    width: 30px;
    height: 30px;
    background-image: linear-gradient(to bottom, #E0C560, #FFFFFF, #E0C560);
    border-radius: 50%;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    box-shadow: 0 0 21px rgba(0, 0, 0, 0.25);
  }

  @for $i from 1 through 8 {
    &.number-#{$i} {
      animation-name: 'number-#{$i}';
    }
  }
}

.roulette-item {
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  position: absolute;
  display: block;
  width: 120px;
  height: 154px;
  transform-origin: 60px 154px;

  @for $i from 1 through 8 {
    &:nth-of-type(#{$i}) {
      transform: rotate(#{$i * 45deg});
    }
  }
}

@for $d from 1 through 8 {
  @keyframes number-#{$d} {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(#{360 * 7 - 45 * $d}deg);
    }
  }
}

.roulette__frame {
  display: flex;
  justify-content: center;
  background: center / contain no-repeat url("../../../public/img/roulette-field.png");
}
</style>