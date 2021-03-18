<template>
  <div class="font-mulish fixed w-full z-50" v-show="showAlert">
    <div :class="`flex justify-between px-6 py-4 items-center bg-${theme}`">
      <div :class="`flex items-center justify-center flex-none rounded-full w-5 h-5 font-bold cursor-pointer text-${theme}`">
        <img v-if="theme == 'success'" src="~/static/img/svg/check.svg" alt="">
        <img v-else src="~/static/img/svg/exclamation.svg" alt="">
      </div>
      <div class="flex-grow relative ml-5">
        <h4 class="text-sm font-bold text-white">{{ title }}</h4>
        <p class="text-xs font-light text-white">{{ description }}</p>
      </div>
      <div
        @click="showAlert = false"
        :class="`flex items-center justify-center flex-none rounded-full w-5 h-5 font-bold cursor-pointer text-${theme}`">
        <img src="~/static/img/svg/cross.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

  @Component
export default class ClassAlert extends Vue {
    @Prop({ required: true, type: String }) title!: string;

    @Prop({ required: true, type: String }) description!: string;

    @Prop({ required: true, type: String }) theme!: string;

    showAlert: Boolean = true;
}
</script>

<style>
</style>
