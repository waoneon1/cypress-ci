<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden ">
    <div
      class="relative my-0 mx-auto h-full max-w-md bg-white p-5 sm:p-10 flex items-center justify-center"
    >
      <div class="grid justify-items-center">
        <img
          src="~/static/img/svg/maintenance.svg"
          width="225px"
          alt="page maintenance"
        />
        <div class="relative font-mulish">
          <p
            class="mt-5 font-bold text-sm md:text-base text-primary w-full text-center"
          >
            Under Maintenance
          </p>
          <p
            class="mt-2 font-light text-xs md:text-sm text-gray-400 w-full text-center"
          >
            The page you’re looking for is currently<br />
            under maintenance and will be back soon
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  layout: 'login',
})
export default class Maintenance extends Vue {}
</script>
