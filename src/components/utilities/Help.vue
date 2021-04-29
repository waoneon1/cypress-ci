<template>
  <div 
    class="absolute top-0 left-0 w-full flex bg-gray-900 py-4 bg-opacity-90" style="margin-top:60px; height: calc(100vh - 60px);"
    v-show="show"
  >
    <div class="flex flex-col text-left px-5 w-full overflow-auto">
      <h2 class="text-white mb-5 font-bold">{{ title }}</h2>
      <div class="text-white font-base text-sm">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Help extends Vue {
  @Prop({ required: false, type: Boolean }) title!: boolean;

  @Prop({ required: false, type: Boolean }) show!: boolean;
}
</script>
