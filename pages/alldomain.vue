<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div
      class="relative bg-white mx-auto max-w-md min-h-screen px-5 font-secondary pb-28"
    >
      <!-- Heading -->
      <div class="flex justify-center relative py-5">
        <svg
          class="fill-current text-gray-400 absolute left-0 w-4 h-4"
          viewBox="0 0 8 12"
          fill="none"
        >
          <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" />
        </svg>
        <h1 class="text-primary text-sm">
          <!-- domain -->
          {{ questions[currentPages - 1].name }}
        </h1>
      </div>

      <!-- Content: Question -->
      <div class="relative">
        <div class="flex justify-between text-xs text-gray-300 mb-2">
          <span>Pertanyaan</span>
          <span>{{ currentPages }} dari {{ pages }}</span>
        </div>
        <div class="text-sm text-primary font-bold rounded-xl mb-5">
          Siapa yang kamu rekomendasikan untuk criteria
          {{
            questions.length
              ? questions[currentPages - 1].name
              : "-"
          }}
        </div>
      </div>

      <!-- Content: Answer -->
      <div class="relative flex justify-center items-center h-96 text-white text-xl rounded-xl bg-primary" v-if="thankyouPage">
        <p>That's All.. Thank you</p>
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
              class="rounded-xl overflow-hidden cursor-pointer relative"
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
              <!-- <div class="flex justify-center bg-white text-sm px-2 py-0 absolute w-full bottom-0 bg-opacity-70">
                <small class="text-primary">{{ item.name }}</small>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Footer -->
      <div class="fixed bottom-0 left-0 right-0" v-if="!thankyouPage">
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
            <div class="inline-block" >
              <button
                @click="nextPage()"
                class="rounded-full py-2 px-4 border border-solid text-white focus:outline-none flex items-center mx-auto justify-center inline-block bg-secondary border-secondary"
              >
                <span class="font-bold text-sm">
                  {{ buttonLabel() }}
                </span>
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
  criteria_id?: string | undefined;
  selected_employee_email?: string | undefined;
  employee_email_x?: string | undefined;
  employee_email_y?: string | undefined;
  /* eslint-enable camelcase */
}

@Component({})
export default class Qna extends Vue {
  domain: string = '';

  domainId: string = '';

  employees: QnaResponseData[] | string | number = [];

  questions: { domain: string, name: string}[] = [{ domain: '', name: '' }];

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
    if (this.selectedAnswer.length > 0) {
      // reload data
      this.answers.splice(0);
      this.answersObject.splice(0);
      await this.loadEmployeeData();
    } else if (this.pages > this.currentPages) {
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
    return this.currentPages === this.pages ? 'Selesai' : 'Muat Ulang';
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
    this.domain = this.$route.params.domain
      ? this.$route.params.domain
      : 'No Title';
    // TODO: Masih static dari doni { criteria_id : "6062d4c9dd3acd0959261f51", limit : 10 }
    this.domainId = '6062d4c9dd3acd0959261f51';
  }

  async loadEmployeeData(): Promise<void> {
    await qnaModule.getQna({
      criteria_id: this.questions[this.currentPages - 1].domain,
      limit: 10,
    });
    this.employees = qnaModule.dataQna.data;
    // if (typeof this.employees === 'object')
    // this.employees.splice(1)
    this.getUniqueEmployees();
  }

  async loadQuestionData(): Promise<void> {
    // TODO: Masih Static sebelum page doman/criteria di buat
    const dataQuestion = [
      { domain: '6062d4c9dd3acd0959261f51', name: 'Design' },
      { domain: '606d1d5cf50eab8cb59f434c', name: 'Requirements' },
      { domain: '606d1d68f50eab8cb59f434d', name: 'Construction' },
      { domain: '606d1d6df50eab8cb59f434e', name: 'Testing' },
      { domain: '606d1d73f50eab8cb59f434f', name: 'Sustainment' },
      { domain: '606d1d78f50eab8cb59f4350', name: 'Process' },
      { domain: '606d1d7ff50eab8cb59f4351', name: 'Systems Engineering' },
      { domain: '606d1d89f50eab8cb59f4352', name: 'Quality' },
      { domain: '606d1d8ef50eab8cb59f4353', name: 'Security' },
      { domain: '606d1d95f50eab8cb59f4354', name: 'Config Management' },
      { domain: '606d1d9ff50eab8cb59f4355', name: 'Measurement' },
      { domain: '606d1da5f50eab8cb59f4356', name: 'HCI' },
    ];

    this.pages = dataQuestion.length;
    this.questions = dataQuestion;
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
    // load question data
    this.loadQuestionData();
    // load employee data
    this.loadEmployeeData();
  }
}
</script>
