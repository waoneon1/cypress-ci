<template>
  <div class="nuxt-error">
    <error404 v-if="error.statusCode === 404" />
    <error500 v-else />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import error404 from '~/components/error/Error404.vue';
import error500 from '~/components/error/Error500.vue';

interface ErrorType {
  statusCode: number;
  massage: string;
}

@Component({
  name: 'nuxtError',
  layout: 'error',
  components: { error404, error500 },
})
export default class Error extends Vue {
  @Prop({ type: Object }) readonly error!: ErrorType;
}
</script>
