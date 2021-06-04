<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div
      class="relative bg-white mx-auto max-w-md min-h-screen font-secondary"
      :class="'pb-36'"
    >
      <!-- Heading -->
      <div class="px-5">
        <div class="flex justify-center relative py-5">
          <h1 class="text-primary text-sm capitalize">
            Mempersiapkan Data Alterran
          </h1>
        </div>
      </div>
      <div class="h-1 w-full border-b"></div>

      <!-- Content: Answer -->
      <div class="px-5 pt-5">
        <!-- Title -->
        <div class="relative">
          <p class="mb-5 text-sm">
            Pilih alterran yang ingin kamu nilai di luar organisasi
            <strong>{{ this.decodeDataEmployee().user_business_unit }}</strong>
          </p>
        </div>
        <!-- Search -->
        <div class="relative">
          <input
            v-model="empSearch"
            :disabled="loading"
            type="text"
            class="shadow-lg mb-5 text-sm rounded-lg w-full py-3 px-4 border"
            placeholder="Cari Nama Alterrans"
          />
        </div>
        <!-- Grid Employee -->
        <div v-if="loading" class="animate-pulse">
          <div class="w-full grid grid-cols-2 xs:grid-cols-3 gap-5">
            <div
              v-for="(item, i) in 9"
              :key="i"
              class="rounded-xl overflow-hidden cursor-pointer"
            >
              <div
                class="bg-gray-100 w-full h-28 w-full overflow-hidden relative pulse"
              ></div>
              <div
                class="flex w-full h-10 bg-gray-200 justify-center bg-white text-sm px-2 py-1 overflow-hidden"
              ></div>
            </div>
          </div>
        </div>
        <div v-else class="relative">
          <div class="grid grid-cols-2 xs:grid-cols-3 gap-5">
            <div
              v-for="(item, i) in employeeSearch"
              :key="i"
              @click="toggleSelect(item.employee_email)"
              class="relative"
            >
              <div
                class="absolute top-2 right-2 bg-white rounded-full text-white flex items-center justify-center z-10"
                v-show="selected.includes(item.employee_email)"
              >
                <svg
                  class="fill-current text-success"
                  width="30"
                  height="30"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                  />
                </svg>
              </div>
              <div class="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer">
                <div
                  class="bg-gray-50 w-full overflow-hidden relative pulse"
                  style="padding-bottom: 100%;"
                >
                  <v-lazy-image
                    v-if="item.employee_image_url"
                    :src="item.employee_image_url"
                    src-placeholder="/img/blank.jpeg"
                    :alt="item.employee_name"
                    style="position:absolute; min-width:100%; min-height :100%;"
                  />
                  <img
                    v-else
                    class=""
                    src="~/static/img/blank.jpeg"
                    :alt="item.employee_name"
                    style="position:absolute; min-width:100%; min-height :100%;"
                  />
                </div>
                <div
                  class="flex justify-center bg-white text-sm px-2 py-1 overflow-hidden"
                >
                  <small class="text-primary autotrim">{{
                    item.employee_name
                  }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Footer -->
      <div class="fixed bottom-0 left-0 right-0 z-10 bg-white">
        <div
          class="mx-auto max-w-md bg-white bg-white rounded-b-xl shadow-lg w-full h-5 transform rotate-180"
        ></div>
        <div
          class="mx-auto max-w-md bg-white px-5 pb-5 bg-white rounded-t-xl shadow-lg"
        >
          <div class="flex justify-end items-center">
            <div class="inline-block flex">
              <button
                class="ml-2 rounded-full py-2 px-4 border border-solid border-secondary bg-secondary hover:bg-yellow-700 text-white focus:outline-none flex items-center mx-auto justify-center inline-block"
                :disabled="loading"
                @click="save"
              >
                <svg
                  v-show="loading"
                  class="animate-spin -ml-1 mr-3 h-5 w-5"
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
                <span class="font-bold text-sm">
                  Simpan & Lanjutkan
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
import { Vue, Component, Watch } from 'vue-property-decorator';
import { employeeModule } from '@/store/employee';

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

const _ = require('lodash');

@Component
export default class PrepareEmployee extends Vue {
  loading: boolean = true;

  token = localStorage.getItem('token');

  empSearch: string = '';

  selected: string[] = [];

  employee: EmployeeResponseData[] = [
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

  employeeSearch: EmployeeResponseData[] = [
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

  toggleSelect(email: string): void {
    const index = this.selected.indexOf(email);
    if (index === -1) {
      this.selected.push(email);
    } else {
      this.selected.splice(index, 1);
    }
  }

  decodeDataEmployee(): LoginData {
    let jsonPayload: LoginData = {
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
      const decode = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(''),
      );
      jsonPayload = JSON.parse(decode);
    }
    return jsonPayload;
  }

  save(): void {
    const payload = {
      selected: this.selected,
    };
    localStorage.setItem('rrs_selected', JSON.stringify(payload));
    this.$router.push('/dashboard');
  }

  @Watch('empSearch')
  onPropertyChanged(value: string) {
    this.employeeSearch = _.filter(this.employee, (o: EmployeeResponseData) => o.employee_name.toLowerCase().includes(value));
  }

  async init() {
    // Get Employee filter by ORG and BU
    await employeeModule.getEmployee().then(() => {
      this.loading = false;
      // const allEmployee = employeeModule.dataEmployee.data;
      const org = this.decodeDataEmployee().user_organization;

      const allEmployee = _.filter(
        employeeModule.dataEmployee.data,
        (o: EmployeeResponseData) => o.employee_organization !== org,
      );
      this.employee = allEmployee;
      this.employeeSearch = allEmployee;
    });
  }

  mounted() {
    this.init();
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
