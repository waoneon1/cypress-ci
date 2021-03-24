<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden ">
    <div
      class="relative my-0 mx-auto h-full max-w-md bg-white p-5 sm:p-10 flex items-center justify-center"
    >
      <div v-if="error.statusCode === 404" class="grid justify-items-center">
        <img src="~/static/img/svg/not-found.svg" width="225px" />
        <div class="relative font-mulish">
          <p
            class="mt-5 font-bold text-sm md:text-base text-primary w-full text-center"
          >
            Page Not Found
          </p>
          <p
            class="mt-2 font-light text-xs md:text-sm text-gray-300 w-full text-center"
          >
            The page is missing or you assembled<br />
            the link incorrectly.
          </p>

          <a href="dashboard"
            class="mt-6 rounded-full py-3 px-8 mb-2 border border-solid border-secondary bg-secondary text-white focus:outline-none cursor-pointer flex items-center mx-auto justify-center"
          >
            <span class="font-bold text-sm">Go Back</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  layout: 'error',
})
export default class NotFound extends Vue {
  @Prop() readonly error!: string
}
</script>

<style scoped></style>
