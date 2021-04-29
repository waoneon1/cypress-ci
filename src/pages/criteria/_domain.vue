<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div
      class="relative bg-white mx-auto max-w-md px-5 font-secondary"
    >
      <!-- Heading -->
      <div class="flex justify-between relative py-5">
        <nuxt-link to="/dashboard">
          <svg
            class="fill-current text-gray-400 absolute left-0 w-4 h-4 hover:text-secondary"
            viewBox="0 0 8 12"
            fill="none"
          >
            <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" />
          </svg>
        </nuxt-link>
        <h1 class="text-primary text-sm capitalize">{{ domain }}</h1>
        <div 
          class="flex items-center justify-center rounded-full border-2 border-gray-400 h-5 w-5 cursor-pointer"
          @click="help = !help"
        >
          <span v-if="help" class="text-xs text-gray-400">x</span>
          <span v-else class="text-xs text-gray-400">?</span>
        </div>
      </div>

      <Thankyou
        subtitle="Pertanyaan"
        image="domain.svg"
        :buttons="[{
          label: 'Mulai',
          url: '/qna/' + this.domain.toLowerCase(),
          theme: 'border-secondary bg-secondary text-white'
        }]"
      >
        <h1 slot="title" class="text-lg text-white  mb-10">
          Untuk kriteria <span class="text-secondary">{{ domain }},</span> Siapa yang kamu rekomendasikan?
        </h1>
      </Thankyou>

      <Help 
        title="Domain Requirements 2"
        :show="help"
      >
        <p slot="content" class="mb-4">
          1. Domain <span class="text-secondary">Requirement</span> adalah Lorem Ipsum is simply 
          dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
        <p slot="content" class="mb-4">
          2. Beberapa contoh lingkup Domain <span class="text-secondary">Requirement</span>
          adalah Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's
        </p>
        <p slot="content" class="mb-4">
          3. Untuk memulai silahkan pencet tombol
          <span class="rounded-full py-2 px-8 border border-solid focus:outline-none items-center mx-auto justify-center border-secondary bg-secondary text-white inline-block ml-4">Mulai</span>
        </p>
         <p slot="content" class="mb-4">
          4. Selanjutnya user akan diberikan pilihan alterrans yg akan dibandingkan.
        </p>
      </Help>

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Thankyou from '~/components/utilities/Thankyou.vue';
import Help from '~/components/utilities/Help.vue';

@Component({
  components: { Thankyou, Help },
})
export default class Criteria extends Vue {
  domain: string = '';

  domainId: string | (string | null)[] = 'nodata';

  help: boolean = false

  local: string | null = localStorage.getItem('rss_criteria');

  goToQnaPage(): void {
    this.$router.push(`/qna/${this.domain.toLowerCase()}`);
  }

  init() {
    if (this.local) {
      const domain = JSON.parse(this.local);
      const url = this.$route.params.domain;
      if (domain.criteria_name.toLowerCase() === url) {
        this.domain = domain.criteria_name;
        this.domainId = domain.id;
      }
    }
  }

  mounted() {
    this.init();
  }
}
</script>
