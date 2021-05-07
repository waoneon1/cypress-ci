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
        subtitle="Deskripsi"
        image="domain.svg"
        :buttons="[
          {
            label: 'Mulai',
            url: '/qna/' + this.domain.toLowerCase(),
            theme: 'border-secondary bg-secondary text-white'
          }
        ]"
      >
        <h1
          slot="title"
          class="text-sm text-white mb-10 px-5"
          v-html="dataCriteria()"
        ></h1>
      </Thankyou>

      <Help :title="domain" :show="help"></Help>
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

  dataCriteria(): string {
    const dataCriteria = [
      {
        criteria_name: 'Design',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk membuat <b class='text-secondary'>design arsitektur</b>, ataupun <b class='text-secondary'>design interface</b>",
      },
      {
        criteria_name: 'Requirements',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk melakukan <b class='text-secondary'>proses analisis</b> baik fungsional maupun non-fungsional, <b class='text-secondary'>mengumpulkan data</b>, hingga <b class='text-secondary'>merumuskan kebutuhan</b> suatu pengembangan aplikasi.",
      },
      {
        criteria_name: 'Construction',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengubah spesifikasi desain menjadi solusi perangkat lunak</b> fungsional yang memenuhi kebutuhan pelanggan. Kompetensi ini termasuk proses <b class='text-secondary'>perencanaan</b>, <b class='text-secondary'>perancangan</b>, <b class='text-secondary'>pemrograman</b>, <b class='text-secondary'>debugging</b>, <b class='text-secondary'>pengujian</b>, dan <b class='text-secondary'>pengintegrasian</b> komponen perangkat lunak.",
      },
      {
        criteria_name: 'Testing',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengevaluasi kualitas produk</b> secara keseluruhan, yang <b class='text-secondary'>memerlukan eksekusi kode</b>. Termasuk juga kemampuan melakukan verifikasi dinamis dan kemampuan dalam memilih serangkaian kasus uji yang sesuai.",
      },
      {
        criteria_name: 'Sustainment',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>menangani masalah pemeliharaan</b> termasuk di dalamnya berupa dokumentasi, penerapan, operasi, keamanan, manajemen konfigurasi, pelatihan (pengguna dan personel pemeliharaan), meja bantuan, manajemen produk COTS, pembaruan teknologi, dan penghentian perangkat lunak. ",
      },
      {
        criteria_name: 'Process',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengidentifikasi aktivitas proses</b> dan kombinasi yang perlu dimodifikasi untuk mencapai tujuan proyek dengan lebih baik.",
      },
      {
        criteria_name: 'Systems Engineering',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengidentifikasi kebutuhan proses development</b>, membuat <b class='text-secondary'>Life Cycle Model</b>, memahami <b class='text-secondary'>konsep operasional</b> seperti limitasi, environment, depedency, serta kemampuan untuk <b class='text-secondary'>memberikan solusi-solusi alternatif</b> dengan baik.",
      },
      {
        criteria_name: 'Quality',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>menghasilkan produk berkualitas tinggi</b>, yang didefinisikan sebagai produk yang sesuai dengan persyaratannya dan memenuhi kebutuhan pengguna. ",
      },
      {
        criteria_name: 'Security',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengidentifikasi potensi kerentanan keamanan</b>, mereplika proses penyerang, mereview dan <b class='text-secondary'>mengetahui attack patterns</b>. Termasuk juga proses <b class='text-secondary'>collecting</b> dan <b class='text-secondary'>monitoring metrics</b> untuk memastikan bahwa proses pengembangan software sudah mengikuti prosedur yang benar.",
      },
      {
        criteria_name: 'Config Management',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk melakukan <b class='text-secondary'>manajemen konfigurasi</b>, mulai dari identifikasi software configuration identification, software configuration control, software configuration status accounting, software configuration auditing, dan software release management and delivery",
      },
      {
        criteria_name: 'Measurement',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengukur atribut manajemen</b>, seperti penjadwalan dan anggaran terhadap pengembangan suatu produk. Penekanan pada kompetensi ini adalah bagaimana <b class='text-secondary'>mengukur proses</b> dan <b class='text-secondary'>produk</b> itu sendiri",
      },
      {
        criteria_name: 'HCI',
        description:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk memberikan Human-Computer Interaction yang baik sehingga produk dapat digunakan dengan sesuai oleh penggunanya. Proses ini terdiri mulai dari proses <b class='text-secondary'>requirements gathering</b>, <b class='text-secondary'>interaction</b> pada aplikasi, hingga melakukan <b class='text-secondary'>evaluasi</b> setelah produk diluncurkan",
      },
    ];
    if (this.local) {
      const domain = JSON.parse(this.local);
      const crit = dataCriteria.filter(
        (arr) => arr.criteria_name === domain.criteria_name,
      )[0];
      return crit ? crit.description : 'no data';
    }
    return 'no data';
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
