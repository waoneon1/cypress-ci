<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div class="relative bg-white mx-auto max-w-md font-secondary h-full">
      <!-- Heading -->
      <div class="px-5">
        <div class="flex justify-center relative py-5">
          <h1 class="text-primary text-sm capitalize">
            Mempersiapkan Data Alterran
          </h1>
        </div>
      </div>
      <div class="h-1 w-full border-b"></div>

      <div class="container mx-auto px-5">
        <div class="flex relative -mx-5" style="height: calc(100vh - 122px)">
          <div class="flex flex-col px-5 w-full mt-5">
            <img
              :class="whitelist ? 'mb-5 mx-auto' : 'mb-5 mt-5 mx-auto'"
              :src="'/img/svg/hello.svg'"
              alt="onboarding"
              :style="whitelist ? 'max-width: 50%' : 'max-width: 100%'"
            />
            <span
              v-if="loading"
              class="text-xs text-primary mb-6 max-w-xs text-center m-auto"
            >
              <svg
                class="animate-spin -ml-1 mr-3 h-14 w-14 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            <span v-else class="text-xs text-primary mb-6 max-w-xs text-left">
              <p class="mb-4">
                Kamu tergabung di business unit
                <strong>{{
                  this.decodeDataEmployee().user_business_unit
                }}</strong>
                dan orginasisi
                <strong>{{
                  this.decodeDataEmployee().user_organization
                }}</strong
                >. Kamu akan diminta melakukan penilaian terhadap
                <strong
                  >{{ employeeFiltered.length }}
                  {{ this.decodeDataEmployee().user_organization }}</strong
                >
                lainnya.
              </p>
              <p class="mb-4" v-show="whitelist">
                Selain dengan engineer di
                <strong>{{
                  this.decodeDataEmployee().user_business_unit
                }}</strong
                >, kamu sering berhubungan dengan alterrans mana lagi?
                <br />(pilih jika ada)
              </p>
            </span>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="fixed bottom-0 z-10 max-w-md w-full">
        <div v-if="whitelist" class="mx-auto text-center mb-5">
          <button
            class="mb-3 rounded-full w-5/6 py-3 border border-solid border-secondary bg-secondary hover:bg-white hover:text-secondary text-white focus:outline-none inline-block"
            :disabled="loading"
            @click="save()"
          >
            <span class="font-bold text-sm"
              >Cukup, lanjutkan untuk menilai</span
            >
          </button>
          <nuxt-link
            class="rounded-full w-5/6 py-3 border border-solid border-secondary bg-white hover:bg-secondary text-secondary hover:text-white focus:outline-none inline-block"
            :event="loading ? '' : 'click'"
            to="/prepare/employee"
          >
            <span class="font-bold text-sm"
              >Ok, saya mau pilih alterran lainnya</span
            >
          </nuxt-link>
        </div>
        <div v-else class="mx-auto flex justify-center w-5/6 text-center mb-5">
          <button
            class="mb-3 rounded-full px-10 py-3 border border-solid border-secondary bg-secondary hover:bg-white hover:text-secondary text-white focus:outline-none inline-block"
            :disabled="loading"
            @click="save()"
          >
            <span class="font-bold text-sm"
              >Mulai</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { employeeModule } from '@/store/employee';
import jwtDecode from 'jwt-decode';

import { LoginData } from '~/types/LoginData'
import { EmployeeResponseData } from '~/types/EmployeeResponseData'

const _ = require('lodash');

@Component
export default class PrepareOrganization extends Vue {
  token = localStorage.getItem('token');

  whitelist = false

  loading: boolean = true;

  employeeFiltered: EmployeeResponseData[] = [
    {
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
    },
  ];

  async init() {
    // Get Employee filter by ORG and BU
    await employeeModule.getEmployee().then(() => {
      this.loading = false;
      const allEmployee:EmployeeResponseData[] = employeeModule.dataEmployee.data;
      this.employeeFiltered = _.filter(allEmployee, {
        // employee_organization : TEC - ENG
        employee_organization: this.decodeDataEmployee().user_organization,
      });
    });
  }

  save(): void {
    const payload = {
      selected: [],
    };
    localStorage.setItem('rrs_selected', JSON.stringify(payload));
    this.$router.push('/dashboard');
  }

  decodeDataEmployee(): LoginData {
    const jsonPayload: LoginData = {
      exp: 1,
      user_business_unit: 'nodata',
      user_email: 'nodata',
      user_id: 'nodata',
      user_name: 'nodata',
      user_oauth_id: 'nodata',
      user_organization: 'nodata',
      user_organization_full_text: 'nodata',
    };
    return this.token ? jwtDecode(this.token) : jsonPayload;
  }

  mounted() {
    this.init();
  }
}
</script>
