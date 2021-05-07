<template>
  <div
    class="absolute top-0 left-0 w-full flex bg-primary py-4 bg-opacity-90"
    style="margin-top:60px; height: calc(100vh - 60px);"
    v-show="show"
  >
    <div class="flex flex-col text-left px-5 w-full overflow-auto">
      <h2 class="text-white mb-5 font-bold">{{ title }}</h2>
      <div class="text-white font-base text-sm">
        <slot name="articles"></slot>
      </div>
      <div class="text-white font-base text-sm">
        <h1 class="text-white mb-5 font-bold">Aturan</h1>
        <ol v-for="(item, i) in rules" :key="i">
          <li class="mb-4">
            {{ item.desc }}
            <img
              :src="'/img/' + item.image"
              alt="exp"
              class="rounded-lg mt-4"
            />
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Help extends Vue {
  @Prop({ required: false, type: String }) title?: string;

  @Prop({ required: false, type: Boolean }) show!: boolean;

  rules: object[] = [
    {
      id: 1,
      desc:
        'Pengguna dapat memilih max. 3 alterrans per halaman yang dirasa sesuai dan paling baik dengan domain dan jika menurut pengguna dalam 1 halaman tidak ada yang sesuai bisa langsungklik tombol lanjut untuk melanjutkan ke halaman berikutnya.',
      image: 'exp-selected.png',
    },
    {
      id: 2,
      desc:
        'Dalam pemilihan tidak tergantung dalam senior/junior jadi dalam alterrans yang dipilih adalah hasil dari opini menurut mengguna yang paling berkopenten dalam domain.',
      image: 'exp-senior.png',
    },
    {
      id: 3,
      desc:
        'Jika dalam 1 halaman tidak ada yang dirasa tidak sesuai, paling baik ataupun tidak dikenal bisa langsung klik tombol "Lanjut"',
      image: 'exp-btn-next.png',
    },
    {
      id: 4,
      desc:
        'Progress bar menandakan status dari progress uda sampai berapa persen, progress bar naik ketika dalam halaman ada yang dipilih dan jika progress bar sudah mencapai angka prosentase yang ditentukan pengguna dapat mengakhiri dan bisa di lanjut di lain waktu untuk pemilih alterrans berdasarkan domain.',
      image: 'exp-progressbar.png',
    },
  ];
}
</script>
