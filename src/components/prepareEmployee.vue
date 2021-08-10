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
            Apakah ada alterran lain yang bisa anda nilai ?
          </h1>
        </div>
      </div>
      <div class="h-1 w-full border-b"></div>

      <!-- Content: Answer -->
      <div class="px-5 pt-5">
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
              <div class="rounded-xl overflow-hidden cursor-pointer">
                <div
                  class="bg-gray-50 w-full overflow-hidden relative pulse"
                  style="padding-bottom: 100%;"
                >
                  <v-lazy-image
                    :name="item.employee_name"
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
      <div class="fixed bottom-0 left-0 right-0 z-10">
        <div
          class="mx-auto max-w-md bg-white bg-white rounded-b-2xl shadow-lg w-full h-5 transform rotate-180"
        ></div>
        <div
          class="mx-auto max-w-md bg-white px-5 pb-5 bg-white"
        >
          <div class="flex justify-between items-center">
            <div class="text-gray-400">
              <div v-if="selected.length">Terpilih {{ (this.localStorageWhitelist ? JSON.parse(this.localStorageWhitelist).length : 0) + selected.length }} orang</div>
              <div v-else></div>
            </div>
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
                <span v-if="selected.length" class="font-bold text-sm">
                  Lanjutkan Penilaian
                </span>
                <span v-else class="font-bold text-sm">
                  Saya Belum Bisa Menilai Alterran Lain
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
import {
  Vue, Component, Watch, Emit,
} from 'vue-property-decorator';
import { employeeModule } from '@/store/employee';
import jwtDecode from 'jwt-decode';

import { LoginData } from '~/types/LoginData';
import { EmployeeResponseData } from '~/types/EmployeeResponseData';

const _ = require('lodash');

@Component
export default class PrepareEmployee extends Vue {
  loading: boolean = true;

  token = localStorage.getItem('token');

  empSearch: string = '';

  selected: string[] = [];

  employee: EmployeeResponseData[] = [];

  employeeSearch: EmployeeResponseData[] = [];

  localStorageBlacklist = localStorage.getItem('rrs_blacklist')

  localStorageWhitelist = localStorage.getItem('rrs_whitelist')

  toggleSelect(email: string): void {
    const index = this.selected.indexOf(email);
    if (index === -1) {
      this.selected.push(email);
    } else {
      this.selected.splice(index, 1);
    }
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

  @Emit('closePrepareEmployee')
  save(): void {
    const whitelist = _.clone(this.localStorageWhitelist ? JSON.parse(this.localStorageWhitelist) : []);
    const selected = _.clone(this.selected);

    const newWhitelist: string[] = [...whitelist, ...selected];
    localStorage.setItem('rrs_whitelist', JSON.stringify(newWhitelist));
  }

  @Watch('empSearch')
  onPropertyChanged(value: string) {
    this.employeeSearch = _.filter(this.employee, (o: EmployeeResponseData) => o.employee_name.toLowerCase().includes(value));
  }

  async init() {
    // Get Employee filter by ORG and BU
    await employeeModule.getEmployee().then(() => {
      this.loading = false;
      // const org = this.decodeDataEmployee().user_organization;
      let blacklist: string[] = [];
      let whitelist: string[] = [];
      blacklist = _.clone(this.localStorageBlacklist ? JSON.parse(this.localStorageBlacklist) : []);
      whitelist = _.clone(this.localStorageWhitelist ? JSON.parse(this.localStorageWhitelist) : []);
      const selectedTotal = [...blacklist, ...whitelist];

      const allEmployee:EmployeeResponseData[] = _.filter(
        employeeModule.dataEmployee.data,
        (o: EmployeeResponseData) => !selectedTotal.includes(o.employee_email) && this.decodeDataEmployee().user_email !== o.employee_email,
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
