<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div
      class="relative bg-white mx-auto max-w-md min-h-screen px-5 font-secondary pb-28"
    >
      <!-- Heading -->
      <div class="flex justify-center relative py-5">
        <nuxt-link to="/dashboard">
          <svg
            class="fill-current text-gray-400 absolute left-0 w-4 h-4 hover:text-secondary"
            viewBox="0 0 8 12"
            fill="none"
          >
            <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" />
          </svg>
        </nuxt-link>
        <h1 v-if="thankyouPage" class="text-primary text-sm">Selesai</h1>
        <h1 v-else-if="domainId === 'nodata'" class="text-primary text-sm"> ??? </h1>
        <h1 v-else class="text-primary text-sm capitalize">{{ domain }}</h1>
      </div>

      <!-- Content: Question -->
      <div v-if="thankyouPage"></div>
      <div v-else-if="domainId === 'nodata'"></div>
      <div v-else class="relative">
        <div class="flex justify-between text-xs text-gray-300 mb-2">
          <span>Pertanyaan</span>
          <span>{{ currentPages }} dari {{ pages }}</span>
        </div>
        <div class="text-sm text-primary font-bold rounded-xl mb-5">
          Siapa yang kamu rekomendasikan untuk criteria {{ domain }}
        </div>
      </div>

      <!-- Content: Answer -->
      <div class="relative flex justify-center items-center h-96 text-white text-xl rounded-xl bg-primary" v-if="thankyouPage">
        <p>Terimakasih atas partisipasinya</p>
      </div>
      <div class="relative flex justify-center items-center h-96 text-white text-xl rounded-xl bg-primary" v-else-if="domainId === 'nodata'">
        <p>Data tidak ditemukan</p>
      </div>
      <div class="relative" v-else>
        <p class="text-xs text-gray-300 mb-3">Pilih 3 Alterrans rekomendasi kamu</p>
        <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-5">
          <div
            v-for="(item, i) in answersObject"
            :key="i"
            @click="answerAdd(item.email)"
          >
            <div
              class="rounded-xl overflow-hidden cursor-pointer"
              :class="
                selectedAnswer.length < 3
                  ? `${selectedAnswerClass(item.email)} hover:opacity-50`
                  : `${selectedAnswerClass(item.email)}`
              "
            >
              <div class="bg-gray-50 flex justify-center">
                <img v-if="item.image" class="" :src="item.image" :alt="item.name" />
                <img v-else class="" src="~/static/img/blank.jpeg" :alt="item.name" />
              </div>
              <div class="flex justify-center bg-white text-sm px-2 py-1">
                <small class="text-primary">{{ item.name }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Footer -->
      <div v-if="thankyouPage || domainId === 'nodata'" class="fixed bottom-0 left-0 right-0">
        <div class="mx-auto max-w-md bg-white pb-2 px-5 md:px-10">
          <nuxt-link
            to="/dashboard"
            class="rounded-full py-3 mb-1 border border-solid border-secondary bg-secondary text-white focus:outline-none cursor-pointer flex items-center mx-auto justify-center"
          >
            Kembali
          </nuxt-link>
        </div>
      </div>
      <div v-else class="fixed bottom-0 left-0 right-0">
        <div
          class="mx-auto max-w-md bg-white bg-white rounded-b-xl shadow-lg w-full h-2 transform rotate-180"
        ></div>
        <div
          class="mx-auto max-w-md bg-white px-5 pb-2 bg-white rounded-t-xl shadow-lg"
        >
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
            <div class="inline-block">
              <div
                @click="nextPage()"
                class="rounded-full py-2 px-4 border border-solid border-secondary bg-secondary hover:bg-orange-500 text-white focus:outline-none cursor-pointer flex items-center mx-auto justify-center inline-block"
              >
                <span class="font-bold text-sm">
                  {{ buttonLabel() }}
                </span>
              </div>
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

export interface QnaResponseData {
  /* eslint-disable camelcase */
  criteria_id?: string;
  criteria_name?: string;
  employee_name_x?: string;
  employee_name_y?: string;
  employee_email_x?: string;
  employee_email_y?: string;
  employee_image_url_x?: string;
  employee_image_url_y?: string;
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
@Component({})
export default class Qna extends Vue {
  domain: string = '';

  domainId: string | (string | null)[] = '';

  employees: QnaResponseData[] | string | number = [];

  questions: string = '';

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
    if (typeof this.employees === 'object') {
      this.employees.forEach((e) => {
        // check employee x
        if (typeof e.employee_email_x !== 'undefined') {
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
        }
        // check employee y
        if (typeof e.employee_email_y !== 'undefined') {
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
        }
      });
      // cek jika belum mendapatkan 9 unique employee
      if (this.answers.length < 9) {
        // get 3 data lagi sampai dapat 9 unique employee
        await this.loadEmployeeData();
      } else {
        this.answers.splice(9);
        this.answersObject.splice(9);
      }
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
    if (this.pages > this.currentPages) {
      // Submit this.prepareSubmit() via this.submitEmployeeData() and recall this.loadEmployeeData()
      await this.submitEmployeeData();
      // success : console.log(response.response_code === '0000')
      // reload data
      this.answers.splice(0);
      this.answersObject.splice(0);
      await this.loadEmployeeData();
      // go to the next page
      this.allSelectedAnswer.push(this.selectedAnswer);
      this.selectedAnswer = [];
      if (this.currentPages !== this.pages) {
        this.currentPages += 1;
      }
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

  async init() {
    const domain = this.$route.params.domain
      ? this.$route.params.domain
      : 'No Title';
    this.domain = domain;
    this.domainId = this.$route.query.c ? this.$route.query.c : 'nodata';
  }

  async loadEmployeeData(): Promise<void> {
    await qnaModule.getQna({
      criteria_id: this.domainId,
      limit: 10,
    });
    this.employees = qnaModule.dataQna.data;
    // if (typeof this.employees === 'object')
    // this.employees.splice(1)
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
      // load question data
      // this.loadQuestionData();
      // load employee data
      this.loadEmployeeData();
    }
  }
}
</script>
