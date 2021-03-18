<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <Alert v-show="alert" :title="alertTitle" :description="alertDescription" :theme="alertTheme" />
    <div class="relative my-0 mx-auto h-full max-w-lg bg-white p-8">
      <div class="flex items-center mb-10">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.6732 13.6405C28.2018 14.1 27.9868 14.7619 28.098 15.4107L28.6328 18.5285C28.913 20.1623 27.1982 21.4082 25.7309 20.6368L22.9307 19.1647C22.348 18.8584 21.652 18.8584 21.0693 19.1647L18.2691 20.6369C16.8018 21.4082 15.087 20.1623 15.3672 18.5285L15.9019 15.4107C16.0132 14.7619 15.7982 14.1 15.3268 13.6405L13.0609 11.4315C11.874 10.2744 12.5291 8.25855 14.1695 8.02021L17.3005 7.56528C17.9519 7.47063 18.5151 7.06148 18.8064 6.47117L20.2065 3.6341C20.9401 2.14758 23.0599 2.14758 23.7935 3.6341L25.1936 6.47117C25.4849 7.06148 26.0481 7.47063 26.6995 7.56528L29.8305 8.02021C31.4709 8.25855 32.126 10.2744 30.9391 11.4315L28.6732 13.6405Z" fill="#FFA91E"/>
          <path d="M32.4849 22.8828C33.7989 22.3557 35.2296 23.3232 35.2296 24.739V27.9698C35.2296 28.7837 34.7363 29.5165 33.9823 29.8228L22.1545 34.6275C22.105 34.6476 22.0496 34.6478 22 34.6279L10.0258 29.824C9.26745 29.5198 8.77045 28.7849 8.77045 27.9678V24.739C8.77045 23.3232 10.2011 22.3557 11.5151 22.8828L21.2553 26.7904C21.7333 26.9821 22.2667 26.9821 22.7447 26.7904L32.4849 22.8828Z" fill="#FFA91E"/>
          <path d="M32.4849 32.224C33.7989 31.6968 35.2296 32.6644 35.2296 34.0802V37.311C35.2296 38.1249 34.7363 38.8576 33.9823 39.1639L22.1545 43.9686C22.105 43.9888 22.0496 43.9889 22 43.9691L10.0258 39.1652C9.26745 38.8609 8.77045 38.126 8.77045 37.309V34.0802C8.77045 32.6644 10.2011 31.6968 11.5151 32.224L21.2553 36.1315C21.7333 36.3233 22.2667 36.3233 22.7447 36.1315L32.4849 32.224Z" fill="#FFA91E"/>
          <path d="M28.6328 18.5285C28.913 20.1623 27.1982 21.4082 25.7309 20.6368L23.0693 19.2376C22.4118 18.8919 22 18.2102 22 17.4673V7.36442C22 5.54639 24.4546 4.97367 25.2592 6.60398C25.5095 7.11114 25.9933 7.46266 26.553 7.54398L29.8305 8.02021C31.4709 8.25855 32.126 10.2744 30.9391 11.4315L28.6732 13.6405C28.2018 14.1 27.9868 14.7619 28.098 15.4107L28.6328 18.5285Z" fill="#FF8900"/>
          <path d="M32.4849 22.8828C33.7989 22.3557 35.2296 23.3232 35.2296 24.739V27.9698C35.2296 28.7837 34.7363 29.5165 33.9823 29.8228L22.1061 34.6471C22.0877 34.6547 22.067 34.6547 22.0485 34.6473C22.0192 34.6356 22 34.6072 22 34.5757V28.4417C22 27.6246 22.497 26.8897 23.2553 26.5855L32.4849 22.8828Z" fill="#FF8900"/>
          <path d="M22 37.7829C22 36.9658 22.497 36.2309 23.2553 35.9267L32.4849 32.224C33.7989 31.6968 35.2296 32.6644 35.2296 34.0802V37.311C35.2296 38.1249 34.7363 38.8576 33.9823 39.1639L22.1061 43.9883C22.0877 43.9958 22.067 43.9959 22.0485 43.9884C22.0192 43.9767 22 43.9484 22 43.9168V37.7829Z" fill="#FF8900"/>
        </svg>
        <div class="relative text-primary text-left font-mulish px-3">
          <h1 class="text-3xl font-black">RRS</h1>
          <p class="text-xs">Relative Ranking System</p>
        </div>
      </div>
      <div class="font-roboto md:pb-20 pb-5">
        <h1 class="text-4xl font-black leading-tight text-primary mb-4">Know Your Best<br> Be The Best</h1>
        <p class="text-sm font-light text-primary">Learn from The Best</p>
      </div>
      <div class="flex justify-center md:my-10">
        <div class="relative">
          <img class="absolute top-0 mt-8" src="~/static/img/login_achive.png" style="left: -60px;"/>
          <div class="rounded-3xl shadow-lg md:p-12 p-6 inline-block">
            <img src="~/static/img/login_image.png"/>
            <p class="font-medium text-sm text-primary w-full text-center">Relative Ranking System</p>
          </div>
          <img class="absolute top-0 mt-16" src="~/static/img/login_grap.png" style="right: -60px;"/>
        </div>
      </div>
      <div class="bottom-0 absolute w-full">
        <div class="relative mr-16 ">
          <div class="rounded-full py-5 px-5 border border-solid border-secondary bg-secondary text-white focus:outline-none cursor-pointer"
            @click="handleClickLogin"
          >
            <div class="flex items-center mx-auto justify-center">
              <svg class="mr-3" width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.8969C22 18.5297 17.6316 23.25 11.1803 23.25C4.99508 23.25 0 18.0562 0 11.625C0 5.19375 4.99508 0 11.1803 0C14.1918 0 16.7254 1.14844 18.6775 3.04219L15.6344 6.08438C11.6537 2.09063 4.25123 5.09063 4.25123 11.625C4.25123 15.6797 7.36639 18.9656 11.1803 18.9656C15.6074 18.9656 17.2664 15.6656 17.5279 13.9547H11.1803V9.95625H21.8242C21.9279 10.5516 22 11.1234 22 11.8969Z" fill="white"/>
              </svg>
              <span class="font-bold">Sign in with Gmail</span>
            </div>
          </div>
          <p class="flex items-center mx-auto justify-center mt-3 mb-3">
            <span class="text-sm font-light text-primary pt-2 mr-2">Product by</span>
            <img src="~/static/img/logo_alterra.png" alt="alterra rrs" style="width:57px; height:20px;"/>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import CredentialModule from '~/store/credential';
import Alert from '~/components/utilities/Alert.vue';

  @Component({
    layout: 'login',
    components: { Alert },
  })
export default class ClassLogin extends Vue {
    email: string = '';

    title: string = 'RRS';

    message: string = 'Present by alterra';

    $gAuth: any;

    // alert
    alert: boolean = false;

    alertTitle: string = 'title';

    alertDescription: string = 'description';

    alertTheme: string = 'success';

    async handleClickLogin() {
      try {
        const googleUser = await this.$gAuth.signIn();
        // console.log('googleUser', googleUser);
        // console.log('getId', googleUser.getId());
        // console.log('getBasicProfile', googleUser.getBasicProfile());
        // console.log('getAuthResponse', googleUser.getAuthResponse());
        // console.log(
        //   'getAuthResponse',
        //   this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse(),
        // );

        const profile = googleUser.getBasicProfile();
        this.email = profile.nt;
        if (this.validateEmail()) {
          if (this.$gAuth.isAuthorized) {
            const CredentialInstance = getModule(CredentialModule, this.$store);

            // Do stuff with module
            await CredentialInstance.getToken(googleUser.getAuthResponse().id_token);

            // If success redirect to dashboard
            if (CredentialInstance.token) {
              // success
              this.loginStatus(true);
              // set localstorage
              localStorage.setItem(
                'token',
                CredentialInstance.token,
              );
              // redirect . . .
              setTimeout(() => {
                this.$router.push('/dashboard');
              }, 1000);
            }
          }
        } else {
          // fail
          this.loginStatus(false);
        }
      } catch (error) {
        // on fail do something
        // console.error(error);
        // return null;
      }
      return null;
    }

    validateEmail() {
      const validEmail = 'alterra.id';
      const domain = this.email.split('@');
      return !!(typeof this.email !== 'undefined' && domain[1] === validEmail);
    }

    loginStatus(value: boolean): void {
      this.alert = true;
      if (value) {
        this.alertTitle = 'Your Login Success';
        this.alertDescription = 'Welcome';
        this.alertTheme = 'success';
      } else {
        this.alertTitle = 'Your Login Failed';
        this.alertDescription = 'Try again using alterra email';
        this.alertTheme = 'danger';
      }
    }
}
</script>

<style>
</style>
