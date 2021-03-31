<template>
  <div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LayoutLogin extends Vue {
  pageStatus: boolean = true;

  checkMaintenance() {
    if (this.pageStatus) {
      this.$router.push('/maintenance');
    }
  }

  // mounted, before created
  mounted() {
    this.checkMaintenance();
  }
}
</script>

<style scoped></style>
