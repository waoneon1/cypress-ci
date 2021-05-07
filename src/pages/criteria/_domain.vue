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
          v-html="dataCriteria().shortdec"
        ></h1>
      </Thankyou>

      <Help :title="domain" :show="help">
        <div
          slot="help-detail"
          class="text-white text-sm"
          v-html="dataCriteria().description"
        ></div>
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

  dataCriteria(): string {
    const dataCriteria = [
      {
        criteria_name: 'Design',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk membuat <b class='text-secondary'>design arsitektur</b>, ataupun <b class='text-secondary'>design interface</b>",
        description:
          "<p class='mb-3'>Keterampilan desain perangkat lunak digunakan untuk mengembangkan dan menggambarkan arsitektur perangkat lunak suatu sistem berdasarkan persyaratan perangkat lunaknya: bagaimana perangkat lunak didekomposisi menjadi komponen dan antarmuka antara komponen tersebut. Komponen tersebut ditentukan pada tingkat detail yang memungkinkan konstruksinya.</p><p class='mb-3'>Bidang keterampilan ini juga mencakup keterampilan yang berkaitandengan proses dan teknik untuk kualitas desain perangkat lunak, analisis, dan evaluasi.</p>",
      },
      {
        criteria_name: 'Requirements',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk melakukan <b class='text-secondary'>proses analisis</b> baik fungsional maupun non-fungsional, <b class='text-secondary'>mengumpulkan data</b>, hingga <b class='text-secondary'>merumuskan kebutuhan</b> suatu pengembangan aplikasi.",
        description:
          "<p class='mb-3'>Rekayasa kebutuhan perangkat lunak terdiri dari aktivitas yang dilakukan untuk menemukan atribut dan antarmuka fungsional dan nonfungsional yang harus dimiliki sistem perangkat lunak untuk memenuhi kebutuhan pelanggan.</p><p class='mb-3'>Domain ini juga mencakup analisis dan kegiatan manajemen yang dilakukan untuk menemukan kekurangan dalam artefak persyaratan dan untuk mengelola proses rekayasa persyaratan.</p>",
      },
      {
        criteria_name: 'Construction',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengubah spesifikasi desain menjadi solusi perangkat lunak</b> fungsional yang memenuhi kebutuhan pelanggan. Kompetensi ini termasuk proses <b class='text-secondary'>perencanaan</b>, <b class='text-secondary'>perancangan</b>, <b class='text-secondary'>pemrograman</b>, <b class='text-secondary'>debugging</b>, <b class='text-secondary'>pengujian</b>, dan <b class='text-secondary'>pengintegrasian</b> komponen perangkat lunak.",
        description:
          "<p class='mb-3'>Konstruksi perangkat lunak adalah kumpulan aktivitas dan proses untuk mengubah spesifikasi desain menjadi solusi perangkat lunak fungsional yang memenuhi kebutuhan pelanggan. Domain ini termasuk perencanaan, perancangan, pemrograman, debugging, pengujian, dan pengintegrasian komponen perangkat lunak.</p><p class='mb-3'>Sebagian besar konstruksi perangkat lunak dilakukan oleh tim profesional menggunakan alat (editor, kompiler, perangkat lunak kontrol versi, debugger, dan sebagainya) dan proses untuk menyelesaikan dan mengoordinasikan pekerjaan mereka.</p>",
      },
      {
        criteria_name: 'Testing',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengevaluasi kualitas produk</b> secara keseluruhan, yang <b class='text-secondary'>memerlukan eksekusi kode</b>. Termasuk juga kemampuan melakukan verifikasi dinamis dan kemampuan dalam memilih serangkaian kasus uji yang sesuai.",
        description:
          "<p class='mb-3'>Pengujian perangkat lunak merupakan komponen kualitas perangkat lunak secara keseluruhan; namun, bidang keahlian kualitas perangkat lunak di SWEBOK adalah lintas sektor bidang keterampilan, sedangkan bidang keterampilan pengujian perangkat lunak adalah siklus hidup bidang keterampilan.</p><p class='mb-3'>Pengujian perangkat lunak mencakup semua aktivitas yang dilakukan untuk mengevaluasi kualitas produk secara keseluruhan, yang memerlukan eksekusi kode.</p><p class='mb-3'>Bidang keterampilan pengujian perangkat lunak ini mencakup verifikasi dinamis dan berkaitan dengan pemilihan satu set kasus uji yang sesuai mendemonstrasikan perilaku produk yang diharapkan dengan menjalankan perangkat lunak menggunakan kasus uji yang disiapkan dan hasilnya untuk menganalisis dan meningkatkan kualitas produk. Diketahui perangkat lunak itu tidak dapat diuji secara mendalam untuk semua kemungkinan situasi; karena itu, Memilih serangkaian kasus uji yang sesuai memiliki pengaruh besar keberhasilan atau kegagalan kegiatan pengujian.</p>",
      },
      {
        criteria_name: 'Sustainment',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>menangani masalah pemeliharaan</b> termasuk di dalamnya berupa dokumentasi, penerapan, operasi, keamanan, manajemen konfigurasi, pelatihan (pengguna dan personel pemeliharaan), meja bantuan, manajemen produk COTS, pembaruan teknologi, dan penghentian perangkat lunak. ",
        description: '',
      },
      {
        criteria_name: 'Process',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengidentifikasi aktivitas proses</b> dan kombinasi yang perlu dimodifikasi untuk mencapai tujuan proyek dengan lebih baik.",
        description: '',
      },
      {
        criteria_name: 'Systems Engineering',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengidentifikasi kebutuhan proses development</b>, membuat <b class='text-secondary'>Life Cycle Model</b>, memahami <b class='text-secondary'>konsep operasional</b> seperti limitasi, environment, depedency, serta kemampuan untuk <b class='text-secondary'>memberikan solusi-solusi alternatif</b> dengan baik.",
        description: '',
      },
      {
        criteria_name: 'Quality',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>menghasilkan produk berkualitas tinggi</b>, yang didefinisikan sebagai produk yang sesuai dengan persyaratannya dan memenuhi kebutuhan pengguna. ",
        description: '',
      },
      {
        criteria_name: 'Security',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengidentifikasi potensi kerentanan keamanan</b>, mereplika proses penyerang, mereview dan <b class='text-secondary'>mengetahui attack patterns</b>. Termasuk juga proses <b class='text-secondary'>collecting</b> dan <b class='text-secondary'>monitoring metrics</b> untuk memastikan bahwa proses pengembangan software sudah mengikuti prosedur yang benar.",
        description: '',
      },
      {
        criteria_name: 'Config Management',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk melakukan <b class='text-secondary'>manajemen konfigurasi</b>, mulai dari identifikasi software configuration identification, software configuration control, software configuration status accounting, software configuration auditing, dan software release management and delivery",
        description: '',
      },
      {
        criteria_name: 'Measurement',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk <b class='text-secondary'>mengukur atribut manajemen</b>, seperti penjadwalan dan anggaran terhadap pengembangan suatu produk. Penekanan pada kompetensi ini adalah bagaimana <b class='text-secondary'>mengukur proses</b> dan <b class='text-secondary'>produk</b> itu sendiri",
        description: '',
      },
      {
        criteria_name: 'HCI',
        shortdec:
          "Alterrans yang akan kamu pilih setelah ini mempunyai kompetensi untuk memberikan Human-Computer Interaction yang baik sehingga produk dapat digunakan dengan sesuai oleh penggunanya. Proses ini terdiri mulai dari proses <b class='text-secondary'>requirements gathering</b>, <b class='text-secondary'>interaction</b> pada aplikasi, hingga melakukan <b class='text-secondary'>evaluasi</b> setelah produk diluncurkan",
        description: '',
      },
    ];
    if (this.local) {
      const domain = JSON.parse(this.local);
      const domailFiltered = dataCriteria.filter(
        (arr) => arr.criteria_name === domain.criteria_name,
      )[0];
      // return crit ? crit.description : 'no data';
      return domailFiltered || 'no data';
      // return domailFiltered ? domailFiltered : 'no data';
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
