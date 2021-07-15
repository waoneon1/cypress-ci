<template>
  <div class="bg-gray-100 h-screen overflow-hidden relative">
    <div class="bg-black h-screen w-full absolute bg-opacity-50 mx-auto max-w-md min-h-screen z-30 flex justify-center items-center"
      style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);">
      <div class="text-white text-center px-10">
        <h1 class="font-bold mb-5">Anda Belum Memilih Alterran</h1>
        <p class="text-sm mb-16">Silahkan lanjutkan memilih Alterrans sampai minimum pick (9 orang)</p>
        <nuxt-link class="mx-auto rounded-full py-3 px-5 border border-solid border-secondary bg-secondary hover:bg-yellow-700 text-white focus:outline-none flex items-center mx-auto justify-center inline-block"
          :to="`/prepare/whitelist?callback=${criteria}`"
        >
          <span class="font-bold text-sm">
            Kembali ke Persiapan
          </span>
        </nuxt-link>
      </div>
    </div>
    <div class="relative bg-white mx-auto max-w-md min-h-screen px-5 font-secondary pb-36">
      <!-- Heading -->
      <div class="flex justify-between relative py-5">
        <div>
          <!-- Added back button in here -->
        </div>
        <h1 class="text-primary text-sm capitalize">Criteria {{criteria}}</h1>
        <div class="flex items-center justify-center rounded-full border-2 border-gray-400 h-5 w-5 cursor-pointer">
          <span class="text-xs text-gray-400">?</span>
        </div>
      </div>

      <!-- Content: Answer -->
      <div class="animate-pulse">
        <div class="w-full h-10 bg-gray-200 rounded-md mb-5"></div>
        <div class="w-full grid grid-cols-2 xs:grid-cols-3 gap-5">
          <div  v-for="(item, i) in 9" :key="i" class="rounded-xl overflow-hidden cursor-pointer">
            <div class="bg-gray-100 w-full h-28 w-full overflow-hidden relative pulse"></div>
            <div class="flex w-full h-10 bg-gray-200 justify-center bg-white text-sm px-2 py-1 overflow-hidden">
            </div>
          </div>
        </div>
      </div>
      <!-- else allPageLoading -->

      <!-- Navigation Footer -->
      <div class="fixed bottom-0 left-0 right-0">
        <div
          class="mx-auto max-w-md bg-white bg-white rounded-b-xl shadow-lg w-full h-2 transform rotate-180"
        ></div>
        <div
          class="mx-auto max-w-md bg-white px-5 pb-2 bg-white rounded-t-xl shadow-lg"
        >
          <p class="text-xs text-gray-400">Progress</p>
          <div class="flex items-center justify-center mb-2">
            <div class="relative pr-2 w-full">
              <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div :style="`width:${ 10 }%`" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
              </div>
            </div>
            <span class="text-xs inline-block text-primary">{{ 10 }}%</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="relative">
              <p class="text-xs text-gray-400 mb-2">
                Terpilih 0 dari 0
              </p>
              <div class="flex h-10">
                <div
                  v-for="(item, i) in 3"
                  :key="i"
                >
                  <img
                    :class="
                      `w-9 h-9 border border-gray-300 border-dashed rounded-full relative ${indenClass[i]}`
                    "
                    src="~/static/img/blank.jpeg"
                    :alt="item"
                  />
                </div>
              </div>
            </div>
            <div class="inline-block flex">
              <button class="ml-2 rounded-full py-2 px-4 border border-solid border-secondary bg-secondary hover:bg-yellow-700 text-white focus:outline-none flex items-center mx-auto justify-center inline-block">
                <span class="font-bold text-sm">
                  Lanjut
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class SkeletonQna extends Vue {
  indenClass: string[] = ['', '-left-2', '-left-3.5'];
  @Prop({ required: true, type: String }) criteria!: string;
}
</script>

<style>
.autotrim {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pulse .v-lazy-image {
  -webkit-animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.pulse .v-lazy-image-loaded {
  -webkit-animation: none;
  animation: none;
}
</style>
