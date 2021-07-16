<template>
  <div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  head() {
    return {
      bodyAttrs: {
        /* eslint-disable-next-line no-use-before-define */
        class: (this as Login).$exp.$classes.join(' '),
      },
    };
  },
})
export default class Login extends Vue {
  $exp: any;

  pageStatus: boolean = false;

  checkMaintenance() {
    if (this.pageStatus) {
      this.$router.push('/maintenance');
    }
  }

  beforeMount() {
    this.checkMaintenance();
  }
}
</script>
