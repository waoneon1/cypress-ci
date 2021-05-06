<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div
      class="relative bg-white mx-auto max-w-md min-h-screen px-5 font-secondary"
      :class="thankyouPage
      || domainId === 'nodata'
      || help
      || criteriaProgressCount() == 25
      || criteriaProgressCount() == 50
      || criteriaProgressCount() == 75
      || criteriaProgressCount() >= 100
      ? '' : 'pb-36'"
    >
      <!-- Heading -->
      <div class="flex justify-between relative py-5">
        <nuxt-link :to="`/criteria/${domain.toLowerCase()}`">
          <svg
            class="fill-current text-gray-400 absolute left-0 w-4 h-4 hover:text-secondary"
            viewBox="0 0 8 12"
            fill="none"
          >
            <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" />
          </svg>
        </nuxt-link>
        <h1 v-if="domainId === 'nodata'" class="text-primary text-sm"> ??? </h1>
        <h1 v-else class="text-primary text-sm capitalize">{{ domain }}</h1>
        <div
          class="flex items-center justify-center rounded-full border-2 border-gray-400 h-5 w-5 cursor-pointer"
          @click="help = !help"
        >
          <span v-if="help" class="text-xs text-gray-400">x</span>
          <span v-else class="text-xs text-gray-400">?</span>
        </div>
      </div>
      <!-- Content: Question -->
      <div v-if="thankyouPage || criteriaProgressCount() >= 100"></div>
      <div v-else-if="domainId === 'nodata'"></div>
      <div v-else-if="criteriaProgressCount() == 25 || criteriaProgressCount() == 50 || criteriaProgressCount() == 75"></div>
      <div v-else class="relative">
        <div class="flex justify-between text-sm text-gray-300 mb-2">
          <span>Pertanyaan</span>
        </div>
        <div class="text-sm text-primary font-bold rounded-xl mb-5">
          Siapa yang kamu rekomendasikan untuk kriteria {{ domain }}
        </div>
      </div>

      <!-- Content: Answer -->
      <Thankyou
        v-if="thankyouPage || criteriaProgressCount() >= 100"
        image="appreciation.svg"
        :buttons="[{
          label: 'Kembali',
          url: '/dashboard',
          theme: 'border-secondary bg-secondary text-white'
        }]"
      >
        <h1 slot="title" class="text-lg text-white  mb-10">
          Terimakasih
        </h1>
      </Thankyou>
      <Thankyou
        v-else-if="domainId === 'nodata'"
        subtitle="Pertanyaan"
        image="appreciation.svg"
        :buttons="[{
          label: 'kembali',
          url: '/dashboard/',
          theme: 'border-secondary bg-secondary text-white'
        }]"
      >
        <h1 slot="title" class="text-lg text-white  mb-10">
          Data dari criteria <span class="text-secondary">{{ domain }},</span> tidak ditemukan
        </h1>
      </Thankyou>
      <div
        v-else-if="criteriaProgressCount() == 25 || criteriaProgressCount() == 50 || criteriaProgressCount() == 75"
        class="flex items-center relative bg-primary -mx-5" style="height: calc(100vh - 60px);"
      >
        <div class="flex flex-col justify-center items-center text-white text-center px-5 w-full">
          <img class="mb-10 w-60" src="~/static/img/svg/checkpoint.svg" alt="description domain" />
          <h1 class="text-base mb-8 max-w-xs font-mulish font-bold">
            Kamu sudah mencapai <span class="text-secondary">{{ criteriaProgressCount() }}%</span>
          </h1>
          <p class="text-sm max-w-sm mb-4">Jika ingin menunda untuk melanjutkan proses pemilihan di domain ini, kamu bisa memilih “Lanjutkan Nanti”</p>
          <p class="text-sm max-w-sm mb-4">Kamu juga bisa melanjutkan pemilihan alterrans lainnya untuk domain ini dengan cara memilih “Lanjutkan” untuk dapat memilih hingga ke milestone berikutnya</p>
          <div class="flex space-x-4 mt-10">
            <nuxt-link to="/dashboard" class="rounded-full py-2 px-4 border border-solid border-secondary bg-white hover:bg-secondary  hover:text-white text-secondary focus:outline-none flex items-center mx-auto justify-center inline-block">
              Lanjutkan Nanti
            </nuxt-link>
            <button
              @click="progressCounter+=5"
              class="rounded-full py-3 px-8 border border-solid border-secondary bg-secondary hover:bg-yellow-700 text-white focus:outline-none flex items-center mx-auto justify-center inline-block"
            >
              Lanjutkan
            </button>
          </div>
        </div>
      </div>
      <div class="relative" v-else>
        <p class="text-xs text-gray-300 mb-3">Pilih 3 Alterrans rekomendasi kamu</p>
        <div class="grid grid-cols-2 xs:grid-cols-3 gap-5">
          <div
            v-for="(item, i) in answersObject"
            :key="i"
            @click="answerAdd(item.email)"
            class="relative"
          >
            <div
              class="absolute top-2 right-2 bg-white rounded-full text-white flex items-center justify-center z-10"
              v-show="selectedAnswer.includes(item.email)"
            >
              <svg class="fill-current text-success" width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"/>
              </svg>
            </div>
            <div
              class="rounded-xl overflow-hidden cursor-pointer"
              :class="
                selectedAnswer.length < 3
                  ? `${selectedAnswerClass(item.email)} hover:opacity-50`
                  : `${selectedAnswerClass(item.email)}`
              "
            >
              <div class="bg-gray-50">
                <v-lazy-image v-if="item.image" :src="item.image" src-placeholder="/img/blank.jpeg" :alt="item.name" />
                <img v-else class="" src="~/static/img/blank.jpeg" :alt="item.name" />
              </div>
              <div class="flex justify-center bg-white text-sm px-2 py-1 autotrim">
                <small class="text-primary">{{ item.name }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Footer -->
      <div v-if="thankyouPage || domainId === 'nodata'" class="fixed bottom-0 left-0 right-0"></div>
      <div v-else-if="criteriaProgressCount() == 25 || criteriaProgressCount() == 50 || criteriaProgressCount() == 75 || criteriaProgressCount() >= 100"></div>
      <div v-else class="fixed bottom-0 left-0 right-0">
        <div
          class="mx-auto max-w-md bg-white bg-white rounded-b-xl shadow-lg w-full h-2 transform rotate-180"
        ></div>
        <div
          class="mx-auto max-w-md bg-white px-5 pb-2 bg-white rounded-t-xl shadow-lg"
        >
          <p class="text-xs text-gray-300">Progress</p>
          <div class="flex items-center justify-center mb-2">
            <div class="relative pr-2 w-full">
              <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div :style="`width:${criteriaProgress(domainId).progress + progressCounter}%`" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
              </div>
            </div>
            <span class="text-xs inline-block text-primary">{{ criteriaProgress(domainId).progress + progressCounter }}%</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="relative">
              <p class="text-xs text-gray-300 mb-2">
                Terpilih {{ selectedAnswer.length }} dari {{ maxSelectedAnswer }}
              </p>
              <div class="flex h-10">
                <div
                  v-for="(item, i) in selectedAnswer"
                  :key="i"
                  @click="answerAdd(item)"
                >
                  <img
                    v-if="selectedAnswerImage(item)"
                    :class="
                      `w-9 h-9 border border-gray-300 border-dashed rounded-full relative ${indenClass[i]}`
                    "
                    :src="selectedAnswerImage(item)"
                    :alt="item"
                  />
                  <img
                    v-else
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
              <button
                :disabled="loading"
                @click="nextPage(); progressCounter+=5"
                class="ml-2 rounded-full py-2 px-4 border border-solid border-secondary bg-secondary hover:bg-yellow-700 text-white focus:outline-none flex items-center mx-auto justify-center inline-block"
              >
                <svg v-show="loading" class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="font-bold text-sm">
                  <!-- {{ buttonLabel() }} -->
                  Lanjut
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Help -->
      <Help :title="domain" :show="help">
        <p slot="desc" class="mb-4">
          {{ dataCriteria() }}
        </p>
        <p slot="link" class="mb-4">Detail lingkup : <a href="http://dahlan.unimal.ac.id/files/ebooks/SWECOM.pdf" target="_blank" class="text-secondary font-bold">SWECOM</a></p>
      </Help>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { qnaModule } from '@/store/qna';
import { criteriaModule } from '@/store/criteria';
import Thankyou from '~/components/utilities/Thankyou.vue';
import Help from '~/components/utilities/Help.vue';

export interface QnaResponseData {
  /* eslint-disable camelcase */
  criteria_id: string;
  criteria_name: string;
  employee_name_x: string;
  employee_name_y: string;
  employee_email_x: string;
  employee_email_y: string;
  employee_image_url_x: string;
  employee_image_url_y: string;
  /* eslint-enable camelcase */
}
export interface QnaResponse {
  /* eslint-disable-next-line camelcase */
  response_code: string;
  message: string;
  data: QnaResponseData[] | string | number;
}
export interface QnaSubmit {
  /* eslint-disable camelcase */
  criteria_id?: string | (string | null)[];
  selected_employee_email?: string;
  employee_email_x?: string;
  employee_email_y?: string;
  /* eslint-enable camelcase */
}
@Component({
  components: { Thankyou, Help },
})
export default class Qna extends Vue {
  domain: string = '';

  domainId: string = 'nodata';

  employees: QnaResponseData[] = [];

  questions: string = '';

  local: string | null = localStorage.getItem('rss_criteria');

  loading: boolean = true;

  help: boolean = false;

  progressCounter: number = 0;

  progressCheckpoint: number[] = [25, 50, 75, 100];

  // data answer
  selectedAnswer: string[] = [];

  allSelectedAnswer: string[][] = [];

  answers: string[] = [];

  answersObject: { name?: string; email?: string; image?: string; }[] = [];

  maxSelectedAnswer = 3;

  indenClass: string[] = ['', '-left-2', '-left-3.5'];

  // pagination
  pages: number = 999;

  currentPages: number = 1;

  thankyouPage: boolean = false;

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

  async getUniqueEmployees() {
    // buat array unique employee
    try {
      this.employees.forEach((e) => {
        // check employee x
        if (!this.answers.includes(e.employee_email_x)) {
          // add data
          this.answers.push(e.employee_email_x);
          // add detail data
          this.answersObject.push({
            name: e.employee_name_x,
            email: e.employee_email_x,
            image: e.employee_image_url_x,
          });
        }
        // check employee y
        if (!this.answers.includes(e.employee_email_y)) {
          // add data
          this.answers.push(e.employee_email_y);
          // add detail data
          this.answersObject.push({
            name: e.employee_name_y,
            email: e.employee_email_y,
            image: e.employee_image_url_y,
          });
        }
      });
      await this.checkDataAnswer();
    } catch (e) {
      // error code
    }
  }

  async checkDataAnswer() {
    // cek jika belum mendapatkan 9 unique employee
    if (this.employees.length === 0) { this.thankyouPage = true; }
    if (this.answers.length < 9 && this.employees.length >= 10) {
      // get 3 data lagi sampai dapat 9 unique employee
      await this.loadEmployeeData();
    } else {
      this.answers.splice(9);
      this.answersObject.splice(9);
    }
  }

  selectedAnswerImage(email: string) {
    const i = this.answersObject.filter(
      (ao) => ao.email === email,
    );
    return i[0]?.image;
  }

  prepareSubmit(): QnaSubmit[] {
    const data: QnaSubmit[] = [];
    this.selectedAnswer.forEach((emailX) => {
      this.answers.forEach((emailY) => {
        if (!this.selectedAnswer.includes(emailY)) {
          data.push({
            criteria_id: this.domainId,
            selected_employee_email: emailX,
            employee_email_x: emailX,
            employee_email_y: emailY,
          });
        }
      });
    });
    return data;
  }

  async nextPage(): Promise<void> {
    this.loading = true;
    if (this.pages > this.currentPages) {
      // Submit this.prepareSubmit() via this.submitEmployeeData() and recall this.loadEmployeeData()
      await this.submitEmployeeData();
      // success : console.log(response.response_code === '0000')
      // reload data
      this.answers.splice(0);
      this.answersObject.splice(0);
      await this.loadEmployeeData().then(() => { this.loading = false; });
      // go to the next page
      this.allSelectedAnswer.push(this.selectedAnswer);
      this.selectedAnswer = [];
      this.currentPages += 1;
    } else {
      this.thankyouPage = true;
    }
  }

  buttonLabel(): string {
    if (this.selectedAnswer.length > 0) {
      return this.currentPages === this.pages ? 'Selesai' : 'Selanjutnya';
    }
    return this.currentPages === this.pages ? 'Selesai' : 'Lewati';
  }

  selectedAnswerClass(email: string): string {
    return this.selectedAnswer.includes(email)
      ? 'opacity-30 shadow-md'
      : 'shadow-lg';
  }

  answerAdd(email: string): void {
    const index = this.selectedAnswer.indexOf(email);
    if (index === -1) {
      if (this.selectedAnswer.length < this.maxSelectedAnswer) {
        this.selectedAnswer.push(email);
      }
    } else {
      this.selectedAnswer.splice(index, 1);
    }
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

  async loadEmployeeData(): Promise<void> {
    await qnaModule.getQna({
      criteria_id: this.domainId,
      limit: 10,
    });
    this.employees = qnaModule.dataQna.data;
    this.getUniqueEmployees();
  }

  async submitEmployeeData(): Promise<QnaResponse | object> {
    if (this.prepareSubmit().length) {
      await qnaModule.submitQna(this.prepareSubmit());
      return qnaModule.dataQna;
    }
    return {};
  }

  mounted() {
    // initial domain
    this.init();
    if (this.domainId !== 'nodata' && typeof this.domainId !== 'undefined') {
      // load employee data
      this.loadEmployeeData().then(() => { this.loading = false; });
    }
  }

  criteriaProgress = (id: string) => {
    const criteria = criteriaModule.dataCriteriaProgress;
    return criteria.filter(
      (arr) => arr.id === id,
    )[0];
  }

  criteriaProgressCount() {
    if (this.criteriaProgress(this.domainId)?.progress) {
      return this.criteriaProgress(this.domainId).progress + this.progressCounter;
    }
    return this.criteriaProgress(this.domainId)?.progress;
  }
}
</script>

<style>
.autotrim {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  position: relative;
  height: 28px;
  min-height: 28px;
}
</style>
