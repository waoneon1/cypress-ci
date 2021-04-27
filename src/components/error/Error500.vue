<template>
  <div class="error-500 bg-gray-100 h-screen overflow-x-hidden ">
    <div
      class="relative my-0 mx-auto h-full max-w-md bg-white p-5 sm:p-10 flex items-center justify-center"
    >
      <div class="grid justify-items-center">
        <img
          src="~/static/img/svg/500.svg"
          width="225px"
          alt="server error 500"
        />
        <div class="relative font-mulish">
          <p
            class="mt-5 font-bold text-sm md:text-base text-primary w-full text-center"
          >
            Opps, something went wrong
          </p>
          <p
            class="mt-2 font-light text-xs md:text-sm text-gray-400 w-full text-center"
          >
            Server Error 500. We apologise and are fixing the problem. Please
            try again at a later stage.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'error-500',
})
export default class Error500 extends Vue {}
</script>
