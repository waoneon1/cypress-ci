<template>
  <div
    class="absolute top-0 left-0 w-full flex bg-primary py-4 bg-opacity-90" style="margin-top:60px; height: calc(100vh - 60px);"
    v-show="show"
  >
    <div class="flex flex-col text-left px-5 w-full overflow-auto">
      <h2 class="text-white mb-5 font-bold">{{ title }}</h2>
      <div class="text-white font-base text-sm">
        <h1 class="text-white mb-5 font-bold">Deskripsi</h1>
        <slot name="desc"></slot>
        <slot name="link"></slot>
      </div>
      <div class="text-white font-base text-sm">
        <h1 class="text-white mb-5 font-bold">Aturan</h1>
        <ol>
          <li class="mb-4">
            Pengguna dapat memilih max. 3 alterrans per halaman yang dirasa
            sesuai dan paling baik dengan domain dan jika menurut
            pengguna dalam 1 halaman tidak ada yang sesuai bisa langsung
            klik tombol lanjut untuk melanjutkan ke halaman berikutnya.
            <img src="~/static/img/exp-selected.png" alt="exp-selected" class="rounded-lg mt-4">
          </li>
          <li class="mb-4">
            Dalam pemilihan tidak tergantung dalam senior/junior jadi dalam
            alterrans yang dipilih adalah hasil dari opini menurut mengguna yang
            paling berkopenten dalam domain.
          </li>
          <li class="mb-4">
            Progress bar menandakan status dari progress uda sampai berapa
            persen, progress bar naik ketika dalam halaman ada yang dipilih dan
            jika progress bar sudah mencapai angka prosentase yang ditentukan
            pengguna dapat mengakhiri dan bisa di lanjut di lain waktu untuk
            pemilih alterrans berdasarkan domain.
            <img src="~/static/img/exp-progressbar.png" alt="exp-progressbar" class="rounded-lg mt-4">
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
}
</script>
