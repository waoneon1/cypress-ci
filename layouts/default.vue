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

export default class LayoutDefault extends Vue {}
</script>
