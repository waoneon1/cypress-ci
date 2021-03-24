<template>
  <div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  // middleware: 'maintenance',
})

export default class LayoutLogin extends Vue {}
</script>

<style scoped></style>
