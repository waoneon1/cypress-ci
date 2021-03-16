<template>
  <div class="my-0 mx-auto min-h-screen flex justify-center items-center text-center">
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component
  export default class ClassLogout extends Vue {
    
    mounted() {
      this.init()
    }

    init() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }

  }
</script>

<style>
</style>
