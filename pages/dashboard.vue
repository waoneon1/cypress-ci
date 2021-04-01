<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <Alert
      v-show="alert"
      title="Your Login Success"
      description="Welcome"
      theme="success"
    />
    <div
      class="relative bg-white mx-auto max-w-md md:min-h-screen flex justify-center items-center text-center"
    >
      <div>
        <h1 class="text-primary text-5xl font-bold">
          {{ title }}
        </h1>
        <p class="text-lg">{{ message }}</p>
      </div>
    </div>
    <div class="fixed bottom-0 left-0 right-0">
      <div class="mx-auto max-w-md bg-white pb-2 px-5 md:px-10">
        <nuxt-link
          to="qna/design"
          class="rounded-full py-3 mb-1 border border-solid border-secondary bg-secondary text-white focus:outline-none cursor-pointer flex items-center mx-auto justify-center"
        >
          Begin
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Alert from '~/components/utilities/Alert.vue';

@Component({
  components: { Alert },
})
export default class Dashboard extends Vue {
  title: string = 'RRS Dashboard';

  message: string = 'Content here';

  alert: boolean = false;

  init() {
    if (
      typeof this.$route !== 'undefined'
      && this.$route.query.success === '1'
    ) {
      this.alert = true;
    }
  }

  mounted() {
    this.init();
  }
}
</script>
