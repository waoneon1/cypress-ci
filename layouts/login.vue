<template>
  <div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LayoutLogin extends Vue {
  pageStatus: boolean = false;

  checkMaintenance() {
    if (this.pageStatus) {
      this.$router.push('/maintenance');
    } else {
      this.$router.push('/logout');
    }
  }

  mounted() {
    this.checkMaintenance();
  }
}
</script>

<style scoped></style>
