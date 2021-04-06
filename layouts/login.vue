<template>
  <div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  pageStatus: boolean = false;

  checkMaintenance() {
    if (this.pageStatus) {
      this.$router.push('/maintenance');
    } else {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }

  beforeMount() {
    this.checkMaintenance();
  }
}
</script>
