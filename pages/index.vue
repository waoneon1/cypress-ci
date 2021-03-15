<template>
  <div class="my-0 mx-auto min-h-screen flex justify-center items-center text-center">
    <div>
      <div class="mb-10">
        <h1 class="text-primary text-5xl font-bold">
          {{ title }}
        </h1>
        <p class="text-lg">{{ message }}</p>
      </div>
      <div class="mr-4 md:mr-0 rounded-full py-1 px-4 sm:py-2 sm:px-8 border border-solid border-secondary bg-secondary text-white focus:outline-none cursor-pointer"
        @click="handleClickLogin"
      >
        Login
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import CredentialModule from '~/store/credential'
  import { getModule } from 'vuex-module-decorators';

  @Component
  export default class ClassLogin extends Vue {
    
    email: string = ''
    title: string = 'RSS'
    message: string = 'Present by alterra'
    $gAuth: any

    async handleClickLogin() {
      try {
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null;
        }
        console.log('googleUser', googleUser);
        console.log('getId', googleUser.getId());
        console.log('getBasicProfile', googleUser.getBasicProfile().dx);
        console.log('getAuthResponse', googleUser.getAuthResponse());
        console.log(
          'getAuthResponse',
          this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse(),
        );

        const profile = googleUser.getBasicProfile()
        this.email = profile.nt
        if (this.validateEmail()) {
          console.log('email is alterra')
          
          if (this.$gAuth.isAuthorized) {
            console.log('send token to backend')
            const CredentialInstance = getModule(CredentialModule, this.$store);
            // Do stuff with module
            await CredentialInstance.getToken(googleUser.getAuthResponse().id_token)
            console.log('jwt token from backend : ', JSON.parse(CredentialInstance.token))

            // If success redirect to dashboard
            if (getModule(CredentialModule,this.$store).token) {
              console.log('redirecting...')
              this.$router.push('/dashboard');
            }
          }
        } else {
          console.log('not email alterra')
          return null;
        }
      } catch (error) {
        // on fail do something
        // console.error(error);
        // return null;
      }
      return null;
    }

    validateEmail() {
      const domain = this.email.split("@")
      return typeof this.email !== 'undefined' && domain[1] == 'alterra.id' ? true : false
    }
  }
</script>

<style>
</style>
