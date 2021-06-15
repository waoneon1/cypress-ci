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
        <h1 class="text-primary text-sm capitalize">{{ domain.criteria_name }}</h1>
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
            label: loading ? 'Loading...' : 'Mulai',
            url: loading ? '' : '/qna/' + domain.slug,
            theme: 'border-secondary bg-secondary text-white'
          }
        ]"
      >
        <h1
          slot="title"
          class="text-sm text-white mb-10 px-5"
          v-html="domain.shortdec"
        ></h1>
      </Thankyou>

      <Help :title="domain.criteria_name" :show="help">
        <div
          slot="help-detail"
          class="text-white text-sm"
          v-html="domain.description"
        ></div>
      </Help>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { criteriaModule } from '@/store/criteria';
import { employeeModule } from '@/store/employee';
import Thankyou from '~/components/utilities/Thankyou.vue';
import Help from '~/components/utilities/Help.vue';

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
export interface CriteriaResponseData {
  /* eslint-disable camelcase */
  id: string;
  criteria_name: string;
  percent_progress: number;
  slug: string;
  description: string;
  shortdec: string;
  /* eslint-enable camelcase */
}
export interface LoginData {
  /* eslint-disable camelcase */
  exp: number;
  user_business_unit: string;
  user_email: string;
  user_id: string;
  user_name: string;
  user_oauth_id: string;
  user_organization: string;
  user_organization_full_text: string;
  /* eslint-enable camelcase */
}

@Component({
  components: { Thankyou, Help },
})
export default class Criteria extends Vue {
  token: string | null = localStorage.getItem('token');

  domain: CriteriaResponseData = {
    id: '',
    criteria_name: 'Loading ...',
    shortdec: 'Loading ...',
    description: 'Loading ...',
    percent_progress: 0,
    slug: '',
  }

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
    let jsonP: LoginData = loginDataDefault;

    if (this.token) {
      const base64Url = this.token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decode = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(''),
      );
      jsonP = JSON.parse(decode);
    }
    this.loginData = jsonP;
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
    let allEmployee = [];
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
    this.init();
  }
}
</script>
