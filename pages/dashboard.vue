<template>
  <div
    class="my-0 mx-auto min-h-screen flex justify-center items-center text-center"
  >
    <div>
      <div class="mb-10">
        <h1 class="text-primary text-5xl font-bold">
          {{ title }}
        </h1>
        <p class="text-lg">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ClassDashboard extends Vue {
  title: string = 'RRS Dashboard';

  message: string = 'Content here';
}
</script>

<style></style>
