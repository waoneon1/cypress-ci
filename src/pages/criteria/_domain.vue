<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <SkeletonQna v-show="skeletonQna" :criteria="this.domain.criteria_name.toLowerCase()" />
    <div v-show="!skeletonQna" class="relative bg-white mx-auto max-w-md px-5 font-secondary">
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
        <h1 class="text-primary text-sm capitalize">{{ domain.criteria_name }}</h1>
        <div
          class="flex items-center justify-center rounded-full border-2 border-gray-400 h-5 w-5 cursor-pointer"
          @click="help = !help"
        >
          <span v-if="help" class="text-xs text-gray-400">x</span>
          <span v-else class="text-xs text-gray-400">?</span>
        </div>
      </div>

      <div class="flex items-center relative bg-primary -mx-5" style="height: calc(100vh - 60px);">
        <div class="flex flex-col justify-center items-center text-center px-5 w-full">
          <img class="mb-10 w-2/3" src="~/static/img/svg/domain.svg" alt="description domain" />
          <span class="text-xs text-gray-400 mb-5">Deskripsi</span>
          <!-- eslint-disable vue/no-v-html -->
          <h1 class="text-sm text-white mb-10 px-5" v-html="domain.shortdec"></h1>
          <!--eslint-enable-->
          <div class="flex space-x-4">
            <div class="rounded-full py-3 px-8 mb-1 border border-solid focus:outline-none cursor-pointer flex items-center mx-auto justify-center border-secondary bg-secondary text-white"
              @click="goToQnaPage()"
            >
              Mulai
            </div>
          </div>
        </div>
      </div>

      <Help :title="domain.criteria_name" :show="help">
        <!-- eslint-disable vue/no-v-html -->
        <div
          slot="help-detail"
          class="text-white text-sm"
          v-html="domain.description"
        ></div>
        <!--eslint-enable-->
      </Help>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { criteriaModule, CriteriaResponseData } from '@/store/criteria';
import { employeeModule } from '@/store/employee';
import jwtDecode from 'jwt-decode';
import Thankyou from '~/components/utilities/Thankyou.vue';
import Help from '~/components/utilities/Help.vue';
import SkeletonQna from '~/components/utilities/SkeletonQna.vue';

import { LoginData } from '~/types/LoginData';
import { EmployeeResponseData } from '~/types/EmployeeResponseData';

const _ = require('lodash');

const loginDataDefault = {
  exp: 1,
  user_business_unit: 'nodata',
  user_email: 'nodata',
  user_id: 'nodata',
  user_name: 'nodata',
  user_oauth_id: 'nodata',
  user_organization: 'nodata',
  user_organization_full_text: 'nodata',
};

@Component({
  components: { Thankyou, Help, SkeletonQna },
})
export default class Criteria extends Vue {
  token: string | null = localStorage.getItem('token');

  domain: CriteriaResponseData = {
    id: '',
    criteria_name: 'Loading ...',
    shortdec: 'Loading ...',
    description: 'Loading ...',
    percent_progress: 0,
    percent_progress_filter: 0,
    slug: '',
  }

  skeletonQna: boolean = false;

  whitelist: string | null = localStorage.getItem('rrs_whitelist');

  help: boolean = false;

  employeeCounterData = { all: 0, org: 0 }

  loginData: LoginData = loginDataDefault

  loading: boolean = true;

  goToQnaPage(): void {
    this.$router.push(`/qna/${this.domain.criteria_name.toLowerCase()}`);
  }

  async setSelectedCriteria() {
    // get query param
    const criteria = this.$route.params.domain;
    // get criteria endpoint
    await criteriaModule.getCriteria(this.employeeCounterData).then(() => {
      this.loading = false;
      const allCriteria = criteriaModule.dataCriteria.data;
      // set domain variable
      this.domain = _.find(allCriteria, { slug: criteria });
    });
  }

  decodeDataEmployee() {
    const jsonPayload: LoginData = loginDataDefault;
    this.loginData = this.token ? jwtDecode(this.token) : jsonPayload;
  }

  async init() {
    Promise.all([
      this.employeeCount(),
      this.decodeDataEmployee(),
    ]).then(() => {
      this.setSelectedCriteria();
    });
  }

  async employeeCount() {
    // Get Employee filter by ORG and BU
    let allEmployee:EmployeeResponseData[] = [];
    let employeeFiltered = [];
    await employeeModule.getEmployee().then(() => {
      this.loading = false;
      allEmployee = employeeModule.dataEmployee.data;
      employeeFiltered = _.filter(allEmployee, {
        // employee_organization : TEC - ENG
        employee_organization: this.loginData.user_organization,
      });
      this.employeeCounterData = { all: allEmployee.length, org: employeeFiltered.length };
    });
  }

  mounted() {
    this.skeletonQna = false;
    this.init();
  }
}
</script>
