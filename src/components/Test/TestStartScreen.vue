<template>
  <test-wrapper>
    <Header/>
    <div class="test__body">
      <div class="test__prizes">
        <img class="test__prizes-image" src="/img/group-prize.png" alt="prizes image">
      </div>
    </div>
    <footer>
      <footer class="footer">
        <action-button theme="dark" @click="$emit('next', 'start')">{{$ml.get('testNext')}}</action-button>
      </footer>
    </footer>
  </test-wrapper>
</template>

<script>
import TestWrapper from './TestWrapper';
import Header from './Header';
import ActionButton from '../ActionButton';
import { MLBuilder } from 'vue-multilanguage'

export default {
  name: 'TestStart',
  components: {
    Header,
    TestWrapper,
    ActionButton,
  },
  data(){
    return{
      message: ''
    }
  },
  mounted(){
     // this.message = $ml.get('HeaderPart1')
  },
  computed: {
    mlHeaderPart1 () {
      return new MLBuilder('rouletteTitleRart1')
    }
  }

};
</script>

<style scoped>
.test__prizes {
  display: grid;
  height: 100%;
  justify-items: center;
}
.test__prizes-image {
  align-self: center;
  width: 90%;
  max-width: 500px;
}
</style>