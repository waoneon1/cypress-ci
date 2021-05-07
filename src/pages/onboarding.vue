<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div class="relative bg-white mx-auto max-w-md font-secondary">
      <!-- Heading -->
      <div class="px-5">
        <div class="flex justify-center relative py-5">
          <h1 class="text-primary text-sm capitalize">
            Selamat Datang di Aplikasi RRS
          </h1>
        </div>
      </div>
      <div class="h-1 w-full border-b"></div>

      <div class="px-5" v-for="(item, i) in onboards" :key="i">
        <div
          v-if="i === step"
          class="flex items-center relative -mx-5"
          style="height: calc(100vh - 122px)"
        >
          <div
            class="flex flex-col justify-center items-center text-center px-5 w-full"
          >
            <img class="mb-8" :src="'/img/' + item.image" alt="onboarding" />
            <h1
              class="text-2xl text-primary mb-8 max-w-xs font-mulish font-bold"
            >
              {{ item.title }}
            </h1>
            <span class="text-xs text-primary mb-6 max-w-xs">
              <span v-html="item.content"></span>
            </span>

            <div class="px-5 mx-auto max-w-md">
              <ul class="flex justify-center gap-x-2">
                <li
                  v-for="(item, i) in onboards"
                  :key="i"
                  :class="
                    `h-3 w-3 cursor-pointer hover:bg-secondary ${
                      i === step ? 'bg-secondary' : 'bg-gray-400'
                    } rounded-full`
                  "
                  @click="step = i"
                ></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="fixed bottom-0 left-0 right-0">
        <!-- navigation circle -->
        <div
          class="mx-auto max-w-md bg-white px-5 pb-5 bg-white rounded-t-xl shadow-lg"
        >
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
              @click="step += 1"
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

  onboards: object[] = [
    {
      title: 'Apa itu RRS',
      content:
        'RRS adalah sebuah aplikasi untuk memberikan ranking berdasarkan <b>kompetensi</b> dan <b>rekomendasi kamu</b> kepada seluruh engineer di alterra, mengacu kepada <b>Software Engineer Competency Matrix</b>',
      image: 'svg/onboard1.svg',
    },
    {
      title: 'Software Engineer Competency Matrix',
      content:
        'Terdapat 12 Competency matrix (domain) yang digunakan pada aplikasi, diadaptasi dari <a href="http://dahlan.unimal.ac.id/files/ebooks/SWECOM.pdf" target="_blank" class="text-secondary">SWECOM</a>',
      image: 'svg/onboard2.svg',
    },
    {
      title: 'Pilih Alterans Rekomendasimu',
      content:
        'Alterrans bisa <b>memilih hingga 3 orang</b> yang paling kompeten di setiap sesinya. Alterrans diharapkan memilih employee sebanyak-banyaknya pada setiap competency (domain) yang tersedia',
      image: 'svg/onboard3.svg',
    },
    {
      title: 'Pilih Bantuan',
      content:
        'Klik ikon <svg class="fill-current inline-block text-gray-400" width="15" height="15" viewBox="0 0 20 20"><path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 17H9V15H11V17ZM13.07 9.25L12.17 10.17C11.45 10.9 11 11.5 11 13H9V12.5C9 11.4 9.45 10.4 10.17 9.67L11.41 8.41C11.78 8.05 12 7.55 12 7C12 5.9 11.1 5 10 5C8.9 5 8 5.9 8 7H6C6 4.79 7.79 3 10 3C12.21 3 14 4.79 14 7C14 7.88 13.64 8.68 13.07 9.25Z"/></svg> untuk mendapatkan bantuan/panduan pada saat menggunakan aplikasi ini',
      image: 'svg/onboard5.svg',
    },
  ];
}
</script>
