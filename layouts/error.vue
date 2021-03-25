<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import error404 from '~/components/error/404.vue';
import error500 from '~/components/error/500.vue';

interface errorType {
  statusCode: number;
}

@Component({
  name: 'nuxtError',
  layout: 'error',
})

export default class LayoutError extends Vue {
  @Prop({ type: Object, default: () => {} }) readonly error!: errorType

  // statusCode: string = '';

  // computed
  get errorPage() {
    if (this.error.statusCode === 404) {
      return error404;
    }
    // catch everything else
    return error500;
  }
}
</script>

<style scoped></style>
