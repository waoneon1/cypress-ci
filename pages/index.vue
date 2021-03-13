<template>
  <div class="container">
    <div>
      <div class="title mb-10">
        <h1 class="text-primary font-bold">
          {{ title }}
        </h1>
        <p class="text-lg">{{ message }}</p>
      </div>
      <div class="mr-4 md:mr-0 rounded-full py-1 px-4 sm:py-2 sm:px-8 border border-solid border-secondary bg-secondary text-white focus:outline-none cursor-pointer">
        Login
      </div>
       <button @click="someMethod">Click me !</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'

  @Component
  export default class ClassLogin extends Vue {

    title: string = 'AFFRO'
    message: string = 'Present by alterra'

    someMethod() {
      console.log('testing');
    }
  }
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px; 
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
