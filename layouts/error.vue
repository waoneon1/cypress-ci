<template>
  <div class="nuxt-error">
    <!-- <component :is="errorPage" :error="error" /> -->
    <error404 v-if="error.statusCode === 404" />
    <error500 v-else />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import error404 from '~/components/error/404.vue';
import error500 from '~/components/error/500.vue';

interface errorType {
  statusCode: number,
  massage: string,
}

@Component({
  name: 'nuxtError',
  layout: 'error',
  components: { error404, error500 },
})

export default class LayoutError extends Vue {
  @Prop({ type: Object }) readonly error!: errorType

  // statusCode: string = '';

  // computed
  // get errorPage() {
  //   if (this.error.statusCode === 404) {
  //     return error404;
  //   }
  //   // catch everything else
  //   return error500;
  // }
}
</script>

<style scoped></style>
