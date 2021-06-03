<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div class="relative bg-white mx-auto max-w-md font-secondary">
      <!-- Heading -->
      <div class="px-5">
        <div class="flex justify-center relative py-5">
          <h1 class="text-primary text-sm capitalize">
            Mempersiapkan Data Alterran
          </h1>
        </div>
      </div>
      <div class="h-1 w-full border-b"></div>

      <div class="px-5">
        <div
          class="flex items-center relative -mx-5"
          style="height: calc(100vh - 122px)"
        >
          <div class="flex flex-col justify-center items-center px-5 w-full">
            <img class="mb-8" :src="'/img/svg/hello.svg'" alt="onboarding" />
            <span v-if="loading" class="text-xs text-primary mb-6 max-w-xs text-center">
              <svg class="animate-spin -ml-1 mr-3 h-14 w-14 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            <span v-else class="text-xs text-primary mb-6 max-w-xs text-left">
              <p class="mb-4">
                Kamu tergabung di business unit <strong>{{ this.decodeDataEmployee().user_business_unit }}</strong> dan orginasisi <strong>{{ this.decodeDataEmployee().user_organization }}</strong>.
              </p>
              <p class="mb-4">Kamu akan diminta melakukan penilaian terhadap <strong>{{ employeeFiltered.length }} {{ this.decodeDataEmployee().user_organization }}</strong> lainnya.</p>
              <p class="mb-4">Selain dengan <strong>{{ this.decodeDataEmployee().user_business_unit }}</strong>, kamu sering berhubungan dengan alterrans mana lagi? (pilih jika ada)</p>
            </span>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="fixed bottom-0 left-0 right-0">
        <!-- navigation circle -->
        <div class="mx-auto flex justify-center max-w-md bg-white px-5 pb-5 bg-white rounded-t-xl shadow-lg">
          <button
            class="ml-2 rounded-full py-2 px-6 border border-solid border-secondary bg-secondary hover:bg-yellow-700 text-white focus:outline-none inline-block"
            :disabled="loading"
            @click="save()"
          >
            <span class="font-bold text-sm">Cukup, lanjutkan untuk menilai</span>
          </button>
        </div>
        <div class="mx-auto flex justify-center max-w-md bg-white px-5 pb-5 bg-white rounded-t-xl shadow-lg">
          <nuxt-link
            class="ml-2 rounded-full py-2 px-6 border border-solid border-secondary bg-white hover:bg-secondary text-secondary hover:text-white focus:outline-none inline-block"
            :event="loading ? '' : 'click'"
            to = '/prepare/employee'
          >
            <span class="font-bold text-sm">Ok, saya mau pilih alterran lainnya</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { employeeModule } from '@/store/employee';

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

export interface EmployeeResponse {
  /* eslint-disable-next-line camelcase */
  response_code: string;
  message: string;
  data: EmployeeResponseData[];
}

const _ = require('lodash');

@Component
export default class PrepareOrganization extends Vue {
  token = localStorage.getItem('token');

  loading: boolean = true;

  employeeFiltered: EmployeeResponseData[] = [{
    id: '',
    employee_name: '',
    employee_email: '',
    employee_image_url: '',
    employee_alt_id: '',
    employee_organization: '',
    employee_organization_full_text: '',
    employee_business_unit: '',
    created_at: '',
    updated_at: '',
  }]

  async init() {
    // Get Employee filter by ORG and BU
    await employeeModule.getEmployee().then(() => {
      this.loading = false;
      const allEmployee = employeeModule.dataEmployee.data;
      this.employeeFiltered = _.filter(allEmployee, {
        // employee_organization : TEC - ENG
        employee_organization: this.decodeDataEmployee().user_organization,
      });

      // set localstorage count employee
      localStorage.setItem('rss_emcounter', JSON.stringify({
        all: allEmployee.length,
        org: this.employeeFiltered.length,
      }));
    });
  }

  save(): void {
    const payload = {
      selected: '',
    };
    localStorage.setItem('rrs_selected', JSON.stringify(payload));
    this.$router.push('/dashboard');
  }

  decodeDataEmployee(): LoginData {
    let jsonPayload:LoginData = {
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

  mounted() {
    this.init();
  }
}
</script>
