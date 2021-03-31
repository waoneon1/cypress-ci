<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div
      class="relative bg-white mx-auto max-w-md min-h-screen px-7 font-secondary pb-28"
    >
      <!-- Heading -->
      <div class="flex justify-center relative py-5">
        <svg
          class="fill-current text-red-500 absolute left-0 w-5 h-5"
          viewBox="0 0 8 12"
          fill="none"
        >
          <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" />
        </svg>
        <h1 class="text-primary text-sm">
          {{ domain }}
        </h1>
      </div>

      <!-- Content: Question -->
      <div class="relative">
        <div class="flex justify-between text-xs text-gray-300 mb-3">
          <span>Question</span>
          <span>{{ currentPages }} of {{ pages }}</span>
        </div>
        <div class="bg-primary text-white font-bold rounded-xl p-6 mb-10">
          {{ questions() }}
        </div>
      </div>

      <!-- Content: Answer -->
      <div class="relative">
        <p class="text-xs text-gray-300 mb-5">Select 3 recommended Alterrans</p>
        <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6">
          <div
            v-for="(item, i) in answersObject"
            :key="i"
            @click="answerAdd(item.email)"
          >
            <div
              :class="
                `${selectedAnswerClass(
                  item.email
                )} rounded-xl overflow-hidden cursor-pointer hover:opacity-50`
              "
            >
              <div class="bg-gray-50 flex justify-center pt-4">
                <img class="" src="~/static/img/img-01.png" alt="" />
              </div>
              <div class="flex justify-center bg-white text-sm px-2 py-2">
                <small class="text-primary">{{ item.name }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Footer -->
      <div class="fixed bottom-0 left-0 right-0">
        <div
          class="mx-auto max-w-md bg-white pb-2 px-7 py-4 bg-white rounded-t-xl shadow-lg"
        >
          <div class="flex justify-between items-center">
            <div class="relative">
              <p class="text-xs text-gray-300 mb-2">
                Select {{ selectedAnswer.length }} of {{ maxSelectedAnswer }}
              </p>
              <div class="flex h-10">
                <div
                  v-for="(item, i) in selectedAnswer"
                  :key="i"
                  @click="answerAdd(item)"
                >
                  <img
                    :class="
                      `w-9 h-9 border border-gray-300 border-dashed rounded-full relative ${indenClass[i]}`
                    "
                    src="~/static/img/img-01.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="inline-block">
              <div
                class="rounded-full py-3 px-10 border border-solid border-secondary bg-secondary text-white focus:outline-none cursor-pointer flex items-center mx-auto justify-center inline-block"
              >
                <span @click="nextPage()" class="font-bold text-sm">
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
  data: QnaResponseData[];
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

  employees: QnaResponseData[] = [];

  // data answer
  selectedAnswer: string[] = [];

  allSelectedAnswer: string[][] = [];

  answers: string[] = [];

  answersObject: { name?: string; email?: string }[] = [];

  maxSelectedAnswer = 3;

  indenClass: string[] = ['', '-left-2', '-left-3.5'];

  // pagination
  pages: number = 10;

  currentPages: number = 1;

  getUniqueEmployees() {
    // buat array unique employee
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
          });
        }
      }
    });
    // cek jika belum mendapatkan 9 unique employee
    if (this.answers.length < 9) {
      // TODO: get 3 data lagi sampai dapat 9 unique employee
    } else {
      this.answers = this.answers.slice(0, 9);
      this.answersObject = this.answersObject.slice(0, 9);
    }
  }

  prepareSubmit(): QnaSubmit[] {
    const data: QnaSubmit[] = [];

    /* eslint-disable-next-line camelcase */
    this.selectedAnswer.forEach((email_x) => {
      /* eslint-disable-next-line camelcase */
      this.answers.forEach((email_y) => {
        if (!this.selectedAnswer.includes(email_y)) {
          data.push({
            criteria_id: this.domainId,
            selected_employee_email: email_x,
            employee_email_x: email_x,
            employee_email_y: email_y,
          });
        }
      });
    });
    return data;
  }

  nextPage(): void {
    // console.log(this.prepareSubmit());
    this.allSelectedAnswer.push(this.selectedAnswer);
    this.selectedAnswer = [];
    if (this.currentPages !== this.pages) {
      this.currentPages += 1;
    }
  }

  buttonLabel(): string {
    if (this.selectedAnswer.length > 0) {
      return this.currentPages === this.pages ? 'Finish' : 'Next';
    }
    return this.currentPages === this.pages ? 'Finish' : 'Skip';
  }

  questions(): string {
    const q = [
      'If you need help with Design, would you rather ask?',
      'If you need help with Design, 1',
      'If you need help with Design, 2',
      'If you need help with Design, 3',
      'If you need help with Design, 4',
    ];
    return q[this.currentPages - 1]
      ? q[this.currentPages - 1]
      : '- no content -';
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
    this.domain = this.$route.params.domain
      ? this.$route.params.domain
      : 'No Title';
    // TODO: Masih static dari doni { criteria_id : "6062d4c9dd3acd0959261f51", limit : 10 }
    this.domainId = '6062d4c9dd3acd0959261f51';
    await qnaModule.getQna({
      criteria_id: this.domainId,
      limit: 10,
    });
    this.employees = qnaModule.dataQna.data;
    this.getUniqueEmployees();
  }

  mounted() {
    this.init();
  }
}
</script>
