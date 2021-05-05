<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div class="relative bg-white mx-auto max-w-md px-5 font-secondary">
      <!-- Heading -->
      <div class="flex justify-between relative py-5">
        <nuxt-link to="/dashboard">
          <svg
            class="fill-current text-gray-400 absolute left-0 w-4 h-4 hover:text-secondary"
            viewBox="0 0 8 12"
            fill="none"
          >
            <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" />
          </svg>
        </nuxt-link>
        <h1 class="text-primary text-sm capitalize">{{ domain }}</h1>
        <div
          class="flex items-center justify-center rounded-full border-2 border-gray-400 h-5 w-5 cursor-pointer"
          @click="help = !help"
        >
          <span v-if="help" class="text-xs text-gray-400">x</span>
          <span v-else class="text-xs text-gray-400">?</span>
        </div>
      </div>

      <Thankyou
        subtitle="Pertanyaan"
        image="domain.svg"
        :buttons="[
          {
            label: 'Mulai',
            url: '/qna/' + this.domain.toLowerCase(),
            theme: 'border-secondary bg-secondary text-white'
          }
        ]"
      >
        <h1 slot="title" class="text-lg text-white  mb-10">
          Untuk kriteria <span class="text-secondary">{{ domain }},</span> Siapa
          yang kamu rekomendasikan?
        </h1>
      </Thankyou>

      <Help :title="domain" :show="help">
        <p slot="desc" class="mb-4">
          Keterampilan desain perangkat lunak digunakan untuk mengembangkan dan
          menggambarkan arsitektur perangkat lunak suatu sistem berdasarkan
          persyaratan perangkat lunaknya: terdiri dari deskripsi tentang
          bagaimana perangkat lunak didekomposisi menjadi komponen dan antarmuka
          antara komponen tersebut. Komponen ditentukan pada tingkat detail yang
          memungkinkan konstruksinya. Bidang keterampilan ini juga mencakup
          keterampilan yang berkaitan dengan proses dan teknik untuk kualitas
          desain perangkat lunak, analisis, dan evaluasi.
        </p>
        <p slot="link" class="mb-4">Detail lingkup domain: <a href="#" class="text-secondary font-bold">http://domaindesign</a></p>
        <ol slot="rules">
          <li class="mb-4">
            Pengguna dapat memilih max. 3 alterrans per halaman yang dirasa
            sesuai dan paling baik dengan domain <span class="text-secondary">{{ domain }}</span> dan jika menurut
            pengguna dalam 1 halaman tidak ada yang sesuai bisa langsung
            klik tombol lanjut untuk melanjutkan ke halaman berikutnya.
            <img src="~/static/img/screenshoot/image1.png" alt="screenshoot1" class="rounded-lg mt-4">
          </li>
          <li class="mb-4">
            Dalam pemilihan tidak tergantung dalam senior/junior jadi dalam
            alterrans yang dipilih adalah hasil dari opini menurut mengguna yang
            paling berkopenten dalam domain <span class="text-secondary">{{ domain }}</span>
          </li>
          <li class="mb-4">
            Progress bar menandakan status dari progress uda sampai berapa
            persen, progress bar naik ketika dalam halaman ada yang dipilih dan
            jika progress bar sudah mencapai angka prosentase yang ditentukan
            pengguna dapat mengakhiri dan bisa di lanjut di lain waktu untuk
            pemilih alterrans berdasarkan domain.
            <img src="~/static/img/screenshoot/image2.png" alt="screenshoot1" class="rounded-lg mt-4">
          </li>
        </ol>
      </Help>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Thankyou from '~/components/utilities/Thankyou.vue';
import Help from '~/components/utilities/Help.vue';

@Component({
  components: { Thankyou, Help },
})
export default class Criteria extends Vue {
  domain: string = '';

  domainId: string | (string | null)[] = 'nodata';

  help: boolean = false;

  local: string | null = localStorage.getItem('rss_criteria');

  goToQnaPage(): void {
    this.$router.push(`/qna/${this.domain.toLowerCase()}`);
  }

  init() {
    if (this.local) {
      const domain = JSON.parse(this.local);
      const url = this.$route.params.domain;
      if (domain.criteria_name.toLowerCase() === url) {
        this.domain = domain.criteria_name;
        this.domainId = domain.id;
      }
    }
  }

  mounted() {
    this.init();
  }
}
</script>
