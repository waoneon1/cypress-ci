<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div class="relative bg-white mx-auto max-w-md font-secondary h-screen">
      <!-- Heading -->
      <div class="px-5">
        <div class="flex justify-center relative py-5">
          <h1 class="text-primary text-sm capitalize">Pengaturan</h1>
        </div>
      </div>
      <div class="h-1 w-full border-b"></div>

      <!-- Content: Criteria List -->
      <div class="relative">
        <div>
          <form class="px-3 md:px-6 pt-5 pb-20">
            <div class="mb-5">
              <div
                class="flex content-center justify-center relative rounded-full w-24 h-24"
              >
                <span class="w-full self-center text-5xl font-bold">
                  <img
                    class="w-full max-w-none rounded-full"
                    alt="userData.name"
                    src="~/static/img/blank.jpeg"
                  />
                </span>
              </div>
            </div>
            <div class="w-full text-sm text-gray-500">
              <div class="flex flex-col">
                <div class="flex flex-col mb-3">
                  <label class="font-medium mb-2 pl-1">Nama Lengkap</label>
                  <input
                    type="text"
                    disabled
                    class="rounded-md border border-gray-300 bg-gray-300 font-roboto py-2 px-3"
                    :value="data.user_name"
                  />
                </div>
                <div class="flex flex-col mb-3">
                  <label class="font-medium mb-2 pl-1">Unit Bisnis</label>
                  <input
                    type="text"
                    disabled
                    class="rounded-md border border-gray-300 bg-gray-300 font-roboto py-2 px-3"
                    :value="data.user_business_unit"
                  />
                </div>
                <div class="flex flex-col mb-3">
                  <label class="font-medium mb-2 pl-1">Organisasi</label>
                  <input
                    type="text"
                    disabled
                    class="rounded-md border border-gray-300 bg-gray-300 font-roboto py-2 px-3"
                    :value="data.user_organization_full_text"
                  />
                </div>
                <div class="flex flex-col mb-3">
                  <label class="font-medium mb-2 pl-1">Email</label>
                  <input
                    type="text"
                    disabled
                    class="rounded-md border border-gray-300 bg-gray-300 font-roboto py-2 px-3"
                    :value="data.user_email"
                  />
                </div>
              </div>
              <div class="flex justify-end mt-4">
                <nuxt-link
                  to="/logout"
                  class="ml-2 rounded-full py-2 px-6 border border-solid border-secondary bg-secondary hover:bg-yellow-700 text-white focus:outline-none inline-block"
                >
                  <span class="font-bold text-sm">Logout</span>
                </nuxt-link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- footer -->
      <div class="fixed bottom-0 left-0 right-0 z-10">
        <!-- navigation circle -->
        <div
          class="mx-auto max-w-md bg-white bg-white shadow-lg w-full h-4 transform rotate-180"
        ></div>
        <div class="mx-auto max-w-md bg-white px-5 pb-5 bg-white">
          <ul class="flex justify-between px-10">
            <li class="cursor-pointer hover:text-secondary text-gray-400">
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
            <li class="cursor-pointer hover:text-secondary text-secondary">
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
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import jwtDecode from 'jwt-decode';
import { LoginData } from '~/types/LoginData';

@Component
export default class Profile extends Vue {
  token: string | null = localStorage.getItem('token');

  data: LoginData = {
    exp: 1,
    user_business_unit: 'nodata',
    user_email: 'nodata',
    user_id: 'nodata',
    user_name: 'nodata',
    user_oauth_id: 'nodata',
    user_organization: 'nodata',
    user_organization_full_text: 'nodata',
  };

  decodeDataEmployee() {
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
    this.data = this.token ? jwtDecode(this.token) : jsonPayload;
  }

  mounted() {
    this.decodeDataEmployee();
  }
}
</script>
