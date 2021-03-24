<template>
  <div>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  middleware: 'authenticated',
})

export default class Default extends Vue {}
</script>

<style scoped></style>
