<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div
      class="relative bg-white mx-auto max-w-md min-h-screen px-5 font-secondary"
      :class="thankyouPage || domainId === 'nodata' ? '' : 'pb-36'"
    >
      <!-- Heading -->
      <div class="flex justify-center relative py-5">
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
      </div>
      <!-- Content: Question -->
      <div v-if="thankyouPage"></div>
      <div v-else-if="domainId === 'nodata'"></div>
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
        v-if="thankyouPage"
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
              <div class="bg-gray-50" style="min-height:100px">
                <img v-if="item.image" class="" :src="item.image" :alt="item.name" />
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
                <div :style="`width:${criteriaProgress(domainId).progress}%`" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
              </div>
            </div>
            <span class="text-xs inline-block text-primary">{{ criteriaProgress(domainId).progress }}%</span>
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
                @click="nextPage()"
                class="rounded-full py-2 px-4 border border-solid border-secondary bg-white hover:bg-secondary text-secondary hover:text-white focus:outline-none flex items-center mx-auto justify-center inline-block"
              >
                <svg v-show="loading" class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="font-bold text-sm">
                  <!-- {{ buttonLabel() }} -->
                  Selanjutnya
                </span>
              </button>
              <button
                @click="thankyouPage = true"
                class="ml-2 rounded-full py-2 px-4 border border-solid border-secondary bg-secondary hover:bg-yellow-700 text-white focus:outline-none flex items-center mx-auto justify-center inline-block"
              >
                <span class="font-bold text-sm">Selesai</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { qnaModule } from '@/store/qna';
import { criteriaModule } from '@/store/criteria';
import Thankyou from '~/components/utilities/Thankyou.vue';

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
  selected_employee_email?: string | undefined;
  employee_email_x?: string | undefined;
  employee_email_y?: string | undefined;
  /* eslint-enable camelcase */
}
@Component({
  components: { Thankyou },
})
export default class Qna extends Vue {
  domain: string = '';

  domainId: string | (string | null)[] = 'nodata';

  employees: QnaResponseData[] = [];

  questions: string = '';

  local: string | null = localStorage.getItem('rss_criteria');

  loading: boolean = true

  // data answer
  selectedAnswer: string[] = [];

  allSelectedAnswer: string[][] = [];

  answers: string[] = [];

  answersObject: { name?: string; email?: string; image?: string; }[] = [];

  maxSelectedAnswer = 3;

  indenClass: string[] = ['', '-left-2', '-left-3.5'];

  // pagination
  pages: number = 10;

  currentPages: number = 1;

  thankyouPage: boolean = false;

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
