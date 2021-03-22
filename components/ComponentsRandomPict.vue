<template>
  <div class="flex justify-center">
    <div class="relative -ml-3">
      <img
        class="absolute top-0 mt-4 md:mt-8 -ml-16"
        src="~/static/img/login_achive.png"
      />
      <div class="rounded-3xl shadow-lg p-3 md:p-10 inline-block">
        <div v-for="(empl, index) in shuffle(emplList)" :key="index">
          <img :src="empl.src" :width="empl.width" :class="empl.class" />
        </div>

        <!-- <img :src="emplList[0].src" width="75px" class="ml-16" />
        <img :src="emplList[1].src" width="50px" class="ml-1 -mt-5" />
        <img :src="emplList[2].src" width="40px" class="ml-32 -mt-8" />
        <img :src="emplList[3].src" width="35px" class="ml-12 -mt-3" />
        <img :src="emplList[4].src" width="35px" class="ml-24 -mt-4" />
        <img :src="emplList[5].src" width="15px" class="ml-20" /> -->

        <p
          class="mt-2 font-medium text-xs md:text-sm text-primary w-full text-center"
        >
          Relative Ranking System
        </p>
      </div>
      <img
        class="absolute top-0 right-0 mt-16 -mr-20"
        src="~/static/img/login_grap.png"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface emplType {
  src: string;
  width: string;
  class: string;
}

@Component
export default class ComponentsRandomPict extends Vue {
  emplList: emplType[] = [
    {
      src: '/img/img-01.png',
      width: '75px',
      class: 'ml-16',
    },
    {
      src: '/img/img-02.png',
      width: '50px',
      class: 'ml-1 -mt-5',
    },
    {
      src: '/img/img-03.png',
      width: '40px',
      class: 'ml-32 -mt-8',
    },
    {
      src: '/img/img-04.png',
      width: '35px',
      class: 'ml-12 -mt-3',
    },
    {
      src: '/img/img-05.png',
      width: '35px',
      class: 'ml-24 -mt-4',
    },
    {
      src: '/img/img-06.png',
      width: '15px',
      class: 'ml-20',
    },
  ];

  shuffle(dataRdm: any): string {
    let currentIndex = dataRdm.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = dataRdm[currentIndex];
      dataRdm[currentIndex] = dataRdm[randomIndex];
      dataRdm[randomIndex] = temporaryValue;
    }

    return dataRdm;
  }
}
</script>

<style scoped></style>
