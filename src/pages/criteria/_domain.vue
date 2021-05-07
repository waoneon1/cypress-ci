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
        <h1 slot="title" class="text-sm text-white mb-10 px-5">
          {{ dataCriteria() }}
        </h1>
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
        description: 'Software Design Digunakan untuk mengembangkan dan menggambarkan arsitektur perangkat lunak suatu sistem berdasarkan persyaratan perangkat lunaknya: ini terdiri dari deskripsi tentang bagaimana perangkat lunak didekomposisi menjadi komponen dan antarmuka antara komponen tersebut. Itu komponen ditentukan pada tingkat detail yang memungkinkan konstruksinya. Bidang keterampilan ini juga mencakup keterampilan yang berkaitan dengan proses dan teknik untuk kualitas desain perangkat lunak, analisis, dan evaluasi.',
      },
      {
        criteria_name: 'Requirements',
        description: 'Software requirements engineering terdiri dari aktivitas yang dilakukan untuk menemukan atribut dan antarmuka fungsional dan nonfungsional yang harus dimiliki sistem perangkat lunak untuk memenuhi kebutuhan pelanggan. Ini juga mencakup analisis dan kegiatan manajemen yang dilakukan untuk menemukan kekurangan dalam artefak persyaratan dan untuk mengelola proses rekayasa persyaratan.',
      },
      {
        criteria_name: 'Construction',
        description: 'Software Construction adalah kumpulan aktivitas dan proses untuk mengubah spesifikasi desain menjadi solusi perangkat lunak fungsional yang memenuhi kebutuhan pelanggan. Ini termasuk perencanaan, perancangan, pemrograman, debugging, pengujian, dan pengintegrasian komponen perangkat lunak. Sebagian besar konstruksi perangkat lunak dilakukan oleh tim profesional menggunakan alat (editor, kompiler, perangkat lunak kontrol versi, debugger, dan sebagainya) dan proses untuk menyelesaikan dan mengoordinasikan pekerjaan mereka.',
      },
      {
        criteria_name: 'Testing',
        description: 'Software testing mencakup semua aktivitas yang dilakukan untuk mengevaluasi kualitas produk secara keseluruhan, yang memerlukan eksekusi kode. Bidang keterampilan pengujian perangkat lunak ini mencakup "verifikasi dinamis" dan berkaitan dengan pemilihan serangkaian kasus uji yang sesuai yang menunjukkan perilaku produk yang diharapkan dengan menjalankan perangkat lunak menggunakan kasus uji yang disiapkan dan hasilnya untuk menganalisis dan meningkatkan kualitas produk. ',
      },
      {
        criteria_name: 'Sustainment',
        description: 'Software sustainment menangani masalah pemeliharaan plus dokumentasi, penerapan, operasi, keamanan, manajemen konfigurasi, pelatihan (pengguna dan personel pemeliharaan), meja bantuan, manajemen produk COTS, pembaruan teknologi, dan penghentian perangkat lunak. ',
      },
      {
        criteria_name: 'Process',
        description: 'Elemen kunci dari Process Software adalah pengukuran dan penilaian efektivitas aktivitas individu dan kombinasinya untuk proyek perangkat lunak. Tujuan utama dari penilaian proses adalah untuk mengidentifikasi aktivitas proses dan kombinasi yang perlu dimodifikasi untuk mencapai tujuan proyek dengan lebih baik. ',
      },
      {
        criteria_name: 'Systems Engineering',
        description: 'Systems Engineering adalah kumpulan komponen yang saling berhubungan yang berinteraksi dengan sistem lain dan lingkungan tempat mereka tertanam. Itu termasuk sistem alam, seperti tata surya kita, dan sistem buatan manusia, seperti komputer digital. ',
      },
      {
        criteria_name: 'Quality',
        description: 'Software quality skill area terdiri dari keterampilan dasar yang perlu dimiliki oleh seorang insinyur perangkat lunak untuk menghasilkan produk berkualitas tinggi, yang didefinisikan sebagai produk yang sesuai dengan persyaratannya dan memenuhi kebutuhan pengguna. ',
      },
      {
        criteria_name: 'Security',
        description: 'Software security adalah bidang keterampilan lintas sektor yang memengaruhi seluruh pengembangan perangkat lunak dan siklus hidup operasi ',
      },
      {
        criteria_name: 'Config Management',
        description: 'Config Management adalah disiplin penerapan arahan dan pengawasan teknis dan administratif untuk mengidentifikasi dan mendokumentasikan karakteristik fungsional dan fisik dari item konfigurasi, untuk mengontrol perubahan pada karakteristik tersebut, untuk mencatat dan melaporkan pemrosesan dan implementasi perubahan status, dan untuk memverifikasi kepatuhan dengan persyaratan yang ditentukan [IEEE 828-2012] ',
      },
      {
        criteria_name: 'Measurement',
        description: 'Measurement adalah dasar dari disiplin ilmu teknik, termasuk rekayasa perangkat lunak. Pengukuran digunakan untuk mengukur atribut proses dan produk untuk tujuan menilai kemajuan dan memberikan indikasi masalah nyata atau yang akan datang ',
      },
      {
        criteria_name: 'HCI',
        description: 'Design of human-computer interaction (HCI) dan antarmuka pengguna secara tradisional dianggap sebagai bagian dari ilmu komputer dan sebagian faktor manusia. ',
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
