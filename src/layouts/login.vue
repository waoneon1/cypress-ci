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
  middleware: 'loggedIn',
})
export default class Login extends Vue {
  $exp: any;

  pageStatus: boolean = false;

  token: string | null = localStorage.getItem('token');

  check() {
    if (this.pageStatus) {
      this.$router.push('/maintenance');
    } else if (this.token) {
      this.$router.push('/dashboard');
    }
  }

  beforeMount() {
    this.check();
  }
}
</script>
