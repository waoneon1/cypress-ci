<template>
  <div class="bg-gray-100 md:h-screen overflow-x-hidden" id="swipe">
    <div class="relative my-0 mx-auto h-full max-w-md bg-white p-5 sm:p-10">
      <SwipeableCard />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SwipeableCard from '~/components/SwipeableCard.vue';

@Component({
  layout: 'login',
  components: {
    SwipeableCard,
  },
})
export default class SwipeDemo extends Vue {

}
</script>

<style>
body {
  margin: 0;
  z-index: 0;
}
#swipe {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>