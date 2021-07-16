<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div
      class="relative bg-white mx-auto max-w-md min-h-screen px-5 font-secondary"
      :class="thankyouPage
      || help
      || criteriaProgressCount() >= 100
      ? '' : 'pb-36'"
    >
      <!-- Heading -->
      <div class="flex justify-between relative py-5">
        <div>
          <!-- Added back button in here -->
        </div>
        <h1 class="text-primary text-sm capitalize">{{ domain.criteria_name }}</h1>
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
      <div v-else class="relative">
        <div class="text-sm text-primary font-bold rounded-xl mb-5">
          Siapa yang kamu rekomendasikan untuk kriteria {{ domain.criteria_name }}
        </div>
      </div>

      <!-- Content: Answer -->
      <div v-if="allPageLoading" class="animate-pulse">
        <div class="w-full h-10 bg-gray-200 rounded-md mb-5"></div>
        <div class="w-full grid grid-cols-2 xs:grid-cols-3 gap-5">
          <div  v-for="(item, i) in 9" :key="i" class="rounded-xl overflow-hidden cursor-pointer">
            <div class="bg-gray-100 w-full h-28 w-full overflow-hidden relative pulse"></div>
            <div class="flex w-full h-10 bg-gray-200 justify-center bg-white text-sm px-2 py-1 overflow-hidden">
            </div>
          </div>
        </div>
      </div>
      <!-- else allPageLoading -->
      <div v-else>
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
        <div v-else class="relative" >
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
                  selectedAnswer.includes(item.email)
                  ? `opacity-30 shadow-md hover:opacity-50`
                  : `shadow-lg`
                "
              >
                <div class="bg-gray-50 w-full overflow-hidden relative pulse" style="padding-bottom: 100%;">
                  <v-lazy-image v-if="item.image" :src="item.image" src-placeholder="/img/blank.jpeg" :alt="item.name" style="position:absolute; min-width:100%; min-height :100%;"/>
                  <img v-else class="" src="~/static/img/blank.jpeg" :alt="item.name" style="position:absolute; min-width:100%; min-height :100%;"/>
                </div>
                <div class="flex justify-center bg-white text-sm px-2 py-1 overflow-hidden">
                  <small class="text-primary autotrim">{{ item.name }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Footer -->
      <div v-if="thankyouPage" class="fixed bottom-0 left-0 right-0"></div>
      <div v-else-if="criteriaProgressCount() >= 100"></div>
      <div v-else class="fixed bottom-0 left-0 right-0">
        <div
          class="mx-auto max-w-md bg-white bg-white rounded-b-2xl shadow-lg w-full h-2 transform rotate-180"
        ></div>
        <div
          class="mx-auto max-w-md bg-white px-5 pb-2 bg-white shadow-lg"
        >
          <p class="text-xs text-gray-400">Progress</p>
          <div class="flex items-center justify-center mb-2">
            <div class="relative pr-2 w-full">
              <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div :style="`width:${ criteriaProgressCount() }%`" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
              </div>
            </div>
            <span class="text-xs inline-block text-primary">{{ criteriaProgressCount() }}%</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="relative">
              <p class="text-xs text-gray-400 mb-2">
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
                @click="nextPage();"
                class="ml-2 rounded-full py-2 px-4 border border-solid border-secondary bg-secondary text-white hover:bg-white hover:text-secondary focus:outline-none flex items-center mx-auto justify-center inline-block"
              >
                <svg v-show="loading" class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="font-bold text-sm">
                  Lanjut
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Help -->
      <Help :title="domain.criteria_name" :show="help" :qnaHelp="true"></Help>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { qnaModule } from '@/store/qna';
import { criteriaModule } from '@/store/criteria';
import { employeeModule } from '@/store/employee';

import Thankyou from '~/components/utilities/Thankyou.vue';
import Help from '~/components/utilities/Help.vue';

const _ = require('lodash');

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
export interface CriteriaResponseData {
  /* eslint-disable camelcase */
  id: string;
  criteria_name: string;
  percent_progress: number;
  percent_progress_filter: number;
  slug: string;
  description: string;
  shortdec: string;
  /* eslint-enable camelcase */
}
export interface EmployeeResponseData {
  /* eslint-disable camelcase */
  id: string;
  employee_name: string;
  employee_email: string;
  employee_image_url: string;
  employee_alt_id: string;
  employee_organization: string;
  employee_organization_full_text: string;
  employee_business_unit: string;
  created_at: string;
  updated_at: string;
  /* eslint-enable camelcase */
}

@Component({
  components: { Thankyou, Help },
})
export default class Qna extends Vue {
  domain: CriteriaResponseData = {
    id: '',
    criteria_name: 'Loading ...',
    shortdec: 'Loading ...',
    description: 'Loading ...',
    percent_progress: 0,
    percent_progress_filter: 0,
    slug: '',
  }

  token: string | null = localStorage.getItem('token');

  employees: QnaResponseData[] = [];

  employeeFilter: EmployeeResponseData[] = [];

  employeeCounterData = { all: 0, org: 0 }

  questions: string = '';

  local: string | null = localStorage.getItem('rss_criteria');

  loading: boolean = true;

  allPageLoading: boolean = true;

  help: boolean = false;

  progressCounter: number = 0;

  progressCheckpoint: number = 1;

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

  async setSelectedCriteria() {
    await this.getEmployeeStore();
    await this.getCriteriaStore();
  }

  async getEmployeeStore() {
    let allEmployee:EmployeeResponseData[] = [];
    let employeeFiltered = [];
    await employeeModule.getEmployee().then(() => {
      // const allEmployee = employeeModule.dataEmployee.data;
      const org = this.decodeDataEmployee().user_organization;
      allEmployee = employeeModule.dataEmployee.data;
      employeeFiltered = _.filter(
        employeeModule.dataEmployee.data,
        (o:EmployeeResponseData) => o.employee_organization === org,
      );
      this.employeeCounterData = { all: allEmployee.length, org: employeeFiltered.length };
      this.employeeFilter = allEmployee;
      return true;
    });
  }

  async getCriteriaStore() {
    const criteria = this.$route.params.domain;
    await criteriaModule.getCriteria(this.employeeCounterData).then(() => {
      const allCriteria = criteriaModule.dataCriteria.data;
      // set domain variable
      this.domain = _.find(allCriteria, { slug: criteria });
    });
  }

  decodeDataEmployee() {
    let jsonPayload = {
      exp: 1,
      user_business_unit: 'nodata',
      user_email: 'nodata',
      user_id: 'nodata',
      user_name: 'nodata',
      user_oauth_id: 'nodata',
      user_organization: 'nodata',
      user_organization_full_text: 'nodata',
    };

    if (this.token) {
      const base64Url = this.token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decode = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
      jsonPayload = JSON.parse(decode);
    }

    return jsonPayload;
  }

  async init() {
    await this.setSelectedCriteria().then(() => {
      this.allPageLoading = false;

      // load employee data
      this.loadEmployeeData().then(() => { this.loading = false; });

      // set initial progress
      qnaModule.setSubmit({
        response_code: '',
        message: '',
        data: {
          count_submitted: 0,
          percent_progress: this.domain.percent_progress,
          percent_progress_filter: this.domain.percent_progress_filter,
        },
      });

      // set initial checkpoint progress
      this.progressCheckpoint = _.floor(this.domain.percent_progress_filter + 10);
    });
  }

  async loadEmployeeData(): Promise<void> {
    const whitelistJson = localStorage.getItem('rrs_selected');
    const whitelist = whitelistJson ? JSON.parse(whitelistJson).selected : [];

    _.forEach(this.employeeFilter, (obj:EmployeeResponseData) => {
      whitelist.push(obj.employee_email);
    });

    await qnaModule.getQna({
      criteria_id: this.domain.id,
      limit: 10,
      filter: {
        emails: whitelist,
      },
    });
    this.employees = qnaModule.dataQna.data;
    this.getUniqueEmployees();
  }

  prepareSubmit(): QnaSubmit[] {
    const data: QnaSubmit[] = [];
    this.selectedAnswer.forEach((emailX) => {
      this.answers.forEach((emailY) => {
        if (!this.selectedAnswer.includes(emailY)) {
          data.push({
            criteria_id: this.domain.id,
            selected_employee_email: emailX,
            employee_email_x: emailX,
            employee_email_y: emailY,
          });
        }
      });
    });
    return data;
  }

  async submitEmployeeData(): Promise<QnaResponse | object> {
    if (this.prepareSubmit().length) {
      const data = {
        payload: this.prepareSubmit(),
        criteriaId: this.domain.id,
        counter: this.employeeCounterData,
      };
      await qnaModule.submitQna(data);
      return qnaModule.submitResponse;
    }
    return {};
  }

  mounted() {
    this.init();
  }

  criteriaProgressCount() {
    return qnaModule.submitResponse.data.percent_progress_filter === 0
      ? _.round(this.domain.percent_progress_filter, 2)
      : _.round(qnaModule.submitResponse.data.percent_progress_filter, 2);
  }

  progressCheckpointFloor() {
    this.progressCheckpoint = _.floor(this.progressCheckpoint + 10);
  }
}
</script>

<style>
.autotrim {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pulse .v-lazy-image {
  -webkit-animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.pulse .v-lazy-image-loaded {
  -webkit-animation: none;
  animation: none;
}
</style>
