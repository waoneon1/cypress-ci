<template>
  <div class="flex items-center relative bg-primary -mx-5" style="height: calc(100vh - 60px);">
    <div class="flex flex-col justify-center items-center text-center px-5 w-full">
      <img class="mb-10 w-2/3" :src="require('~/static/img/svg/' + image)" alt="description domain" />
      <span v-show="subtitle" class="text-xs text-gray-400 mb-5">{{ subtitle }}</span>
      <slot name="title"></slot>
      <slot name="content"></slot>
      <div class="flex space-x-4" v-if="buttons.length">
        <nuxt-link
          v-for="(item, i) in buttons"
          :key="i"
          :to="item.url"
          class="rounded-full py-3 px-8 mb-1 border border-solid focus:outline-none cursor-pointer flex items-center mx-auto justify-center"
          :class="item.theme"
        >
          {{ item.label }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Thankyou extends Vue {
  @Prop({ required: false, type: String }) subtitle?: string;

  @Prop({ required: false, type: String }) image?: string;

  @Prop({ required: false, type: Array }) buttons?: { label: string; url: string; theme: string }[];
}
</script>
