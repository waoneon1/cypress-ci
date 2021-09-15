<template>
  <div>
    <MoreEmployee v-if="moreWhitelist" :swipeableData="selected" @closeMoreEmployee="closeMoreEmployee"/>
    <div v-else class="relative bg-white mx-auto max-w-md min-h-screen px-5 font-secondary pb-28">
      <!-- Heading -->

      <div class="flex justify-between relative py-5">
        <div>
          <!-- Added back button in here -->
        </div>
        <h1 id="swipeTitle" class="text-primary text-sm capitalize">Mempersiapkan Data Employee</h1>
        <div
          class="flex items-center justify-center rounded-full border-2 border-gray-400 h-5 w-5 cursor-pointer"
          @click="help = !help"
        >
          <span v-if="help" class="text-xs text-gray-400">x</span>
          <span v-else class="text-xs text-gray-400">?</span>
        </div>
      </div>

      <!-- Content: Criteria List -->
      <div v-if="debug === 'true'" class="text-xs bg-gray-100 text-gray-500 p-2 rounded-lg mb-2">
        <p> index : {{ index }} | iswipeable : {{ iteration }} | selected : {{ selected.employee.length }} | iteration : {{ currentPages }}</p>
        <p> counterSelected : {{ counterSelected }} | total swipe : {{ totalSwipe }} | remaining em : {{ this.allEmployee.length - (this.selected.blacklist.length + this.selected.whitelist.length) - 1 }}</p>
        <p> blacklist : {{ selected.blacklist.length }} | whitelist : {{ selected.whitelist.length }} | selected : {{ selected.employee.length }}</p>
      </div>
      <div class="relative" v-if="loading">
        <svg v-show="loading" class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div class="relative" v-else>
        <!-- Alert -->
        <div class="font-mulish fixed max-w-md left-0 right-0 m-auto z-50" v-show="alert">
          <div class="flex justify-between px-6 py-4 items-center bg-blue-300">
            <div :class="`flex items-center justify-center flex-none rounded-full w-5 h-5 font-bold cursor-pointer`">
              <img src="~/static/img/svg/exclamation.svg" alt="toast icon error"/>
            </div>
            <div class="flex-grow relative ml-5">
              <h4 class="text-sm font-bold text-white">Sudah mencapai minimum Alterran</h4>
              <p class="text-xs font-light text-white">Kamu sudah memilih Alterrans, kamu bisa masuk dimenu memilih alterrans.</p>
            </div>
            <div @click="alert = false" :class="`flex items-center justify-center flex-none rounded-full w-5 h-5 font-bold cursor-pointer`">
              <img src="~/static/img/svg/cross.svg" alt="toast icon close" />
            </div>
          </div>
        </div>
        <div
          class="flex flex-col"
          :class="loadingDelay ? 'overflow-hidden' : ''"
          style="height:75vh;"
        >
          <div class="ml-6 w-10/12 flex-grow">
            <div  class="h-full w-full relative">
              <!-- one -->
              <div
                v-if="current"
                style="z-index: 3"
                :class="{ 'transition': isVisible }">
                <Vue2InteractDraggable
                  v-if="isVisible"
                  :interact-out-of-sight-x-coordinate="500"
                  :interact-max-rotation="15"
                  :interact-x-threshold="200"
                  :interact-y-threshold="200"
                  :interact-event-bus-events="interactEventBus"
                  interact-block-drag-down
                  @draggedRight="emitAndNext('match')"
                  @draggedLeft="emitAndNext('reject')"
                  class="absolute mt-4 ml-4 w-full h-full rounded-lg border cursor-pointer shadow-lg  bg-white" style="z-index: 3">
                  <div class="h-full">
                    <img class="w-full" :src="current.employee_image_url" :alt="current.employee_name">
                    <div class="p-3">
                      <h2 class="text-sm text-primary font-bold">{{current.employee_name}}</h2>
                      <span class="text-xs block pt-1">Bussines Unit: {{current.employee_business_unit}}</span>
                      <span class="text-xs block pt-1">Organisasi: {{current.employee_organization}}</span>
                    </div>
                  </div>
                </Vue2InteractDraggable>
              </div>
              <!-- two -->
              <div
                v-if="next"
                style="z-index: 2"
                class="absolute mt-2 ml-2 w-full h-full rounded-lg border cursor-pointer shadow-lg bg-white">
                  <div class="h-full">
                    <img :src="next.employee_image_url" :alt="next.employee_name">
                    <div class="p-3">
                      <h2 class="text-sm text-primary font-bold">{{next.employee_name}}</h2>
                      <span class="text-xs block pt-1">Bussines Unit: {{next.employee_business_unit}}</span>
                      <span class="text-xs block pt-1">Organisasi: {{next.employee_organization}}</span>
                    </div>
                  </div>
              </div>
              <!-- three -->
              <div
                v-if="index + 2 < answersObject.length"
                style="z-index: 1;background-color: #f0f0f2;"
                class="absolute w-full h-full rounded-lg border cursor-pointer shadow-lg bg-white">
                  <img :src="next2.employee_image_url" :alt="next2.employee_name">
                  <div class="p-3">
                    <h2 class="text-sm text-primary font-bold">{{next2.employee_name}}</h2>
                    <span class="text-xs block pt-1">Bussines Unit: {{next2.employee_business_unit}}</span>
                    <span class="text-xs block pt-1">Organisasi: {{next2.employee_organization}}</span>
                  </div>
              </div>
            </div>
          </div>
          <div class="flex-none">
            <div class="flex justify-around mt-10">
              <button id="swipeReject" class="flex items-center justify-center flex-none rounded-full w-10 h-10 font-bold cursor-pointer"
                :class="btnDisabled ? 'bg-gray-400' : 'bg-danger'"
                :disabled="btnDisabled"
                @click="reject()">
                <img class="w-9 h-9" src="~/static/img/svg/cross.svg" alt="toast icon close" />
              </button>
              <button id="swipeMatch" class="flex items-center justify-center flex-none rounded-full w-10 h-10 font-bold cursor-pointer"
                :class="btnDisabled ? 'bg-gray-400' : 'bg-success'"
                :disabled="btnDisabled"
                @click="match()">
                <img class="w-9 h-9" src="~/static/img/svg/check.svg" alt="toast icon success "/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="fixed bottom-0 left-0 right-0 z-10" style="margin-bottom: -1px">
        <!-- navigation circle -->
        <div
          class="mx-auto max-w-md bg-white rounded-b-xl shadow-lg w-full h-4 transform rotate-180"
        ></div>
        <div class="mx-auto max-w-md bg-white px-5 pb-5 rounded-t-xl shadow-lg">
          <ul class="flex justify-between px-10">
            <li class="cursor-pointer hover:text-secondary">
              <nuxt-link to="/dashboard">
                <svg
                  class="fill-current"
                  width="24"
                  height="21"
                  viewBox="0 0 24 21"
                >
                  <path
                    d="M9.6 20.4V13.2H14.4V20.4H20.4V10.8H24L12 0L0 10.8H3.6V20.4H9.6Z"
                  />
                </svg>
              </nuxt-link>
            </li>
            <li class="cursor-pointer hover:text-secondary text-gray-400">
              <nuxt-link to="/faq">
                <svg
                  class="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 17H9V15H11V17ZM13.07 9.25L12.17 10.17C11.45 10.9 11 11.5 11 13H9V12.5C9 11.4 9.45 10.4 10.17 9.67L11.41 8.41C11.78 8.05 12 7.55 12 7C12 5.9 11.1 5 10 5C8.9 5 8 5.9 8 7H6C6 4.79 7.79 3 10 3C12.21 3 14 4.79 14 7C14 7.88 13.64 8.68 13.07 9.25Z"
                  />
                </svg>
              </nuxt-link>
            </li>
            <li class="cursor-pointer hover:text-secondary text-gray-400">
              <nuxt-link to="/setting">
                <svg
                  class="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM13.61 6.34C14.68 6.34 15.54 7.2 15.54 8.27C15.54 9.34 14.68 10.2 13.61 10.2C12.54 10.2 11.68 9.34 11.68 8.27C11.67 7.2 12.54 6.34 13.61 6.34ZM7.61 4.76C8.91 4.76 9.97 5.82 9.97 7.12C9.97 8.42 8.91 9.48 7.61 9.48C6.31 9.48 5.25 8.42 5.25 7.12C5.25 5.81 6.3 4.76 7.61 4.76ZM7.61 13.89V17.64C5.21 16.89 3.31 15.04 2.47 12.68C3.52 11.56 6.14 10.99 7.61 10.99C8.14 10.99 8.81 11.07 9.51 11.21C7.87 12.08 7.61 13.23 7.61 13.89ZM10 18C9.73 18 9.47 17.99 9.21 17.96V13.89C9.21 12.47 12.15 11.76 13.61 11.76C14.68 11.76 16.53 12.15 17.45 12.91C16.28 15.88 13.39 18 10 18Z"
                  />
                </svg>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Help -->
      <Help :show="help" class="z-40"></Help>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Watch, Prop, Emit,
} from 'vue-property-decorator';
import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact';
import { qnaModule, QnaResponseData } from '@/store/qna';

import { CriteriaResponseData } from '@/store/criteria';
import Help from '~/components/utilities/HelpSwipe.vue';
import MoreEmployee from '~/components/MoreEmployee.vue';

import { EmployeeResponseData } from '~/types/EmployeeResponseData';
import { SelectedSwipeable, AnswersObject } from '~/types/SelectedSwipeable';

// Data
const _ = require('lodash');

const EVENTS = {
  MATCH: 'match',
  REJECT: 'reject',
};

@Component({
  components: {
    Vue2InteractDraggable,
    Help,
    MoreEmployee,
  },
})
export default class SwipeableCard extends Vue {
  // Data: {}
  debug: string = process.env.NUXT_ENV_RRS_DEBUG ? process.env.NUXT_ENV_RRS_DEBUG : 'false'

  isVisible:boolean = true

  btnDisabled:boolean = false

  index:number = 0

  totalSwipe:number = 0

  localStorageBlacklist = localStorage.getItem('rrs_blacklist')

  localStorageWhitelist = localStorage.getItem('rrs_whitelist')

  selected: SelectedSwipeable = {
    employee: [],
    blacklist: [],
    whitelist: [],
    employeeObject: [],
  }

  interactEventBus = {
    draggedRight: EVENTS.MATCH,
    draggedLeft: EVENTS.REJECT,
  }

  disableWhitelist:boolean = true

  alert: boolean = false;

  help: boolean = false;

  loading: boolean = true;

  loadingDelay: boolean = true;

  // Employee data
  iteration: number = 1

  limitPair: number = 30

  limitEmp: number = 9

  limitSwipe1: number = 20

  limitSwipe2: number = 20

  counterSelected: number = 0

  employees: QnaResponseData[] = [];

  answers: string[] = [];

  answersObject: AnswersObject[] = [];

  moreWhitelist: boolean = false;

  @Prop({ required: true, type: Object })
  domain!: CriteriaResponseData;

  @Prop({ required: true, type: Number })
  currentPages!: number;

  @Prop({ required: true, type: Array })
  allEmployee!: EmployeeResponseData[];

  // Computed: {}
  current: AnswersObject | {} = {}

  @Watch('index')
  currentComputed() { this.current = this.answersObject[this.index]; }

  next: AnswersObject | {} = {}

  @Watch('index')
  nextComputed() { this.next = this.answersObject[this.index + 1]; }

  next2: AnswersObject | {} = {}

  @Watch('index')
  next2Computed() { this.next2 = this.answersObject[this.index + 2]; }

  // Method: {}
  match = () => {
    InteractEventBus.$emit(EVENTS.MATCH);
  }

  reject = () => {
    InteractEventBus.$emit(EVENTS.REJECT);
  }

  async checkWhitelist() {
    this.counterSelected += 1;
    if (this.selected.employee.length === this.limitEmp) {
      this.proceedQnaPage();
    } else if (this.counterSelected === this.answers.length) {
      // reload data
      this.answers = [];
      this.answersObject = [];
      this.counterSelected = 0;
      this.loading = true;
      this.loadingDelay = true;
      this.iteration += 1;

      this.init();
    }
    // check for popup whitelist
    this.checkTotalSwipe();
  }

  emitAndNext(event: 'match' | 'reject') {
    this.$emit(event, this.index);

    if (event === 'match') {
      this.selected.employee.push(this.answersObject[this.index].employee_email);
      this.selected.whitelist.push(this.answersObject[this.index].employee_email);
      this.selected.employeeObject.push(this.answersObject[this.index]);
    } else {
      this.selected.blacklist.push(this.answersObject[this.index].employee_email);
    }
    this.checkWhitelist();
    this.btnDisabled = true;
    setTimeout(() => this.visibleFalse(), 500);
    setTimeout(() => {
      this.visibleTrue();
    }, 500);
  }

  visibleTrue() {
    this.index += 1;
    this.totalSwipe += 1;
    this.isVisible = true;
    this.btnDisabled = false;
  }

  visibleFalse() {
    this.isVisible = false;
  }

  mounted() {
    this.init();
  }

  async init() {
    await this.loadEmployeeData();
  }

  async loadEmployeeData(): Promise<void> {
    let blacklist: string[] = [];
    let whitelist: string[] = [];
    if (this.iteration === 1) {
      blacklist = _.clone(this.localStorageBlacklist ? JSON.parse(this.localStorageBlacklist) : []);
      whitelist = _.clone(this.localStorageWhitelist ? JSON.parse(this.localStorageWhitelist) : []);
      this.selected.blacklist = blacklist;
      this.selected.whitelist = whitelist;
    } else {
      blacklist = _.clone(this.selected.blacklist);
    }

    // POST : /pair_data/get_next
    await qnaModule.getQna({
      criteria_id: this.domain.id,
      limit: this.limitPair,
      filter: {
        emails: [],
        blacklist,
      },
    }).then(() => {
      this.employees = qnaModule.dataQna.data;
      this.getUniqueEmployees();
    });
  }

  async getUniqueEmployees() {
    const pairToEmployee:AnswersObject[] = [];
    let uniqueEmployee:AnswersObject[] = [];

    // 1. get unique employee d
    _.map(this.employees, (object) => {
      const xObj = {
        employee_name: object.employee_name_x,
        employee_email: object.employee_email_x,
        employee_image_url: object.employee_image_url_x,
        employee_organization: object.employee_organization_x,
        employee_organization_full_text: object.employee_organization_full_text_x,
        employee_business_unit: object.employee_business_unit_x,
      };
      const yObj = {
        employee_name: object.employee_name_y,
        employee_email: object.employee_email_y,
        employee_image_url: object.employee_image_url_y,
        employee_organization: object.employee_organization_y,
        employee_organization_full_text: object.employee_organization_full_text_y,
        employee_business_unit: object.employee_business_unit_y,
      };

      pairToEmployee.push(xObj);
      pairToEmployee.push(yObj);
    });
    uniqueEmployee = _.uniqBy(pairToEmployee, 'employee_email');

    // 2. get whitelist object base on unique employee
    const whitelistObject: AnswersObject[] = _.filter(uniqueEmployee, (o:AnswersObject) => this.selected.whitelist.includes(o.employee_email));

    // 3. prioritize non whitelist employee
    const prioritize: AnswersObject[] = _.filter(uniqueEmployee, (o:AnswersObject) => !this.selected.whitelist.includes(o.employee_email));

    // 4. check if prioritize non whitelist !== 0
    let uniqueEmployeeReady: AnswersObject[] = whitelistObject;

    const shuffleWhitelist: AnswersObject[] = _.take(_.shuffle(whitelistObject), 9);
    if (prioritize.length !== 0) {
      uniqueEmployeeReady = [...prioritize, ...shuffleWhitelist];
    } else {
      uniqueEmployeeReady = shuffleWhitelist;
    }

    // 5. asign to variable to selected and swipeable
    if (prioritize.length < 9) {
      const takeSelected = 9 - prioritize.length;
      this.selected.employee = _.take(_.map(uniqueEmployeeReady, 'employee_email'), takeSelected);
      this.selected.employeeObject = _.take(uniqueEmployeeReady, takeSelected);
    }
    this.answers = _.map(prioritize, 'employee_email');
    this.answersObject = prioritize;

    await this.checkDataAnswer();
  }

  async checkDataAnswer() {
    this.checkEmployeeRemain();

    if (this.iteration > 1) {
      localStorage.setItem('rrs_blacklist', JSON.stringify(this.selected.blacklist));
    }
    this.index = this.iteration === 1 ? 0 : -1;
    this.current = _.clone(this.answersObject[0]);
    this.next = _.clone(this.answersObject[1]);
    this.next2 = _.clone(this.answersObject[2]);

    if (this.selected.employee.length >= 9) {
      this.proceedQnaPage();
    } else {
      this.loading = false;
      setTimeout(() => {
        this.loadingDelay = false;
      }, 500);
    }
  }

  @Emit('swipableData')
  proceedQnaPage() {
    this.replaceBlackWhitelist();
    return _.clone(this.selected);
  }

  replaceBlackWhitelist() {
    // replace blacklist and whitelist data
    localStorage.setItem('rrs_blacklist', JSON.stringify(this.selected.blacklist));
    localStorage.setItem('rrs_whitelist', JSON.stringify(this.selected.whitelist));
  }

  checkTotalSwipe(): boolean {
    if (this.currentPages === 1) {
      if (this.totalSwipe === (this.limitSwipe1 - 1)) {
        this.replaceBlackWhitelist();
        this.moreWhitelist = true;
      }
    } else if (this.totalSwipe === (this.limitSwipe2 - 1)) {
      this.replaceBlackWhitelist();
      this.moreWhitelist = true;
    }
    return true;
  }

  closeMoreEmployee(payload) {
    this.moreWhitelist = false;
    this.loading = true;
    this.localStorageBlacklist = localStorage.getItem('rrs_blacklist');
    this.localStorageWhitelist = localStorage.getItem('rrs_whitelist');

    this.selected.employeeObject = payload;
    this.selected.employee = _.map(payload, 'employee_email');
    this.selected.blacklist = _.clone(this.localStorageBlacklist ? JSON.parse(this.localStorageBlacklist) : []);
    this.selected.whitelist = _.clone(this.localStorageWhitelist ? JSON.parse(this.localStorageWhitelist) : []);

    this.proceedQnaPage();
  }

  checkEmployeeRemain() {
    const countRemain = this.allEmployee.length - (this.selected.blacklist.length + this.selected.whitelist.length) - 1;
    if (countRemain <= 0) {
      this.proceedQnaPage();
    }
  }
}
</script>

<style scoped>
.transition {
  animation: appear 200ms ease-in;
}
@keyframes appear {
  from {
    transform: translate(-48%, -48%);
  }
  to {
    transform: translate(-50%, -50%);
  }
}
</style>
