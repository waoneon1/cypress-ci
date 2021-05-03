<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div class="relative bg-white mx-auto max-w-md font-secondary">
      <!-- Heading -->
      <div class="px-5">
        <div class="flex justify-center relative py-5">
          <h1 class="text-primary text-sm capitalize">Onboarding</h1>
        </div>
      </div>
      <div class="h-1 w-full border-b"></div>

      <div class="px-5" v-for="(item, i) in onboards" :key="i">
        <div v-if="i === step" class="flex items-center relative -mx-5" style="height: calc(100vh - 122px)">
          <div class="flex flex-col justify-center items-center text-center px-5 w-full">
            <img class="mb-8" :src="require('~/static/img/' + item.image)" alt="onboarding" />
            <h1 class="text-2xl text-primary mb-8 max-w-xs font-mulish font-bold">
              {{ item.title }}
            </h1>
            <span class="text-xs text-primary mb-6 max-w-xs">
              {{ item.content }}
            </span>

            <div class="px-5 mx-auto max-w-md">
              <ul class="flex justify-center gap-x-2">
                <li
                  v-for="(item, i) in onboards"
                  :key="i"
                  :class="`h-3 w-3 ${ i === step ? 'bg-secondary' : 'bg-gray-400' } rounded-full`"
                ></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="fixed bottom-0 left-0 right-0">
        <!-- navigation circle -->
        <div class="mx-auto max-w-md bg-white px-5 pb-5 bg-white rounded-t-xl shadow-lg">
          <div :class="`flex ${step == 0 ? 'justify-end' : 'justify-between'}`">
            <!-- kembali -->
            <button
              @click="step -= 1"
              v-show="step !== 0"
              class="rounded-full py-2 px-6 border border-solid border-secondary bg-white hover:bg-secondary text-secondary hover:text-white focus:outline-none inline-block"
            >
              <span class="font-bold text-sm">Kembali</span>
            </button>
            <!-- selanjutnya -->
            <button
              @click="step += 1 "
              v-show="step < onboards.length - 1"
              class="ml-2 rounded-full py-2 px-6 border border-solid border-secondary bg-secondary hover:bg-yellow-700 text-white focus:outline-none inline-block"
            >
              <span class="font-bold text-sm">Lanjut</span>
            </button>
            <!-- selesai -->
            <nuxt-link
              to="/dashboard"
              v-show="step === onboards.length - 1"
              class="ml-2 rounded-full py-2 px-6 border border-solid border-secondary bg-secondary hover:bg-yellow-700 text-white focus:outline-none inline-block"
            >
              <span class="font-bold text-sm">Selesai</span>
            </nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Onboarding extends Vue {
  step = 0;

  onboards: object[] = [{
    title: 'RRS WEB',
    content: 'Aplikasi untuk memberikan ranking kepada seluruh engineer di alterra berdasarkan 12 software competency matrix',
    image: 'onboard2.png',
  }, {
    title: '12 Software Competency Matrix',
    content: 'Requirements, Design, Construction, Testing, Sustainment, Process, Systems Engineering, Quality, Security, Config Management, Measurement, HCI',
    image: 'onboard2.png',
  }, {
    title: 'Rekomendasi Domain',
    content: 'Rekomendasi akan muncul jika management menginginkan ada suatu competency yang diprioritaskan di waktu tertentu',
    image: 'onboard3.png',
  }, {
    title: 'Pilih Alterrans',
    content: 'Alterrans diharapkan memilih employee sebanyak-banyaknya pada setiap competency (domain) yang tersedia',
    image: 'onboard4.png',
  }, {
    title: 'Data Terpilih',
    content: 'Saat melakukan pemilihan employee, untuk setiap phase yang dilalui sistem akan secara berkala menyimpan data ke database,jadi alterrans bisa melanjutkan kapan pun mereka mau',
    image: 'onboard1.png',
  }, {
    title: 'Helper',
    content: 'Klik helper jika membutuhkan bantuan ketika menjalankan aplikasi ini',
    image: 'onboard5.png',
  }]
}
</script>
