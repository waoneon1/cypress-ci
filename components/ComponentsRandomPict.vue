<template>
  <div>
    <div class="flex justify-center md:my-8">
      <div class="relative">
        <img
          class="absolute top-0 mt-8"
          src="~/static/img/login_achive.png"
          style="left: -60px;"
        />
        <div class="rounded-3xl shadow-lg md:p-12 p-6 inline-block">
          <div 
            v-for="(empl, index) in emplList"
            :key="index"
          >
            <img :src="empl.src" :width="empl.width" :class="empl.class" />
          </div>
          <p class="font-medium text-sm text-primary w-full text-center">
            Relative Ranking System
          </p>
        </div>
        <img
          class="absolute top-0 mt-16"
          src="~/static/img/login_grap.png"
          style="right: -60px;"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface emplType {
  src: string,
  width: string,
  class: string
}

@Component
export default class ComponentsRandomPict extends Vue {
  emplList: emplType[] =
  [
    {
      src: '/img/img-01.png',
      width: '75px',
      class: 'ml-16'
    },
    {
      src: '/img/img-02.png',
      width: '50px',
      class: 'ml-1 -mt-5'
    },
    {
      src: '/img/img-03.png',
      width: '40px',
      class: 'ml-32 -mt-8'
    },
    {
      src: '/img/img-04.png',
      width: '35px',
      class: 'ml-12 -mt-3'
    },
    {
      src: '/img/img-05.png',
      width: '35px',
      class: 'ml-24 -mt-4'
    },
    {
      src: '/img/img-06.png',
      width: '15px',
      class: 'ml-20'
    },
  ]
}
</script>

<style scoped></style>
