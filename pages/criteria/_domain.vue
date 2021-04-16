<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div
      class="relative bg-white mx-auto max-w-md px-5 font-secondary"
    >
      <!-- Heading -->
      <div class="flex justify-center relative py-5">
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

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Thankyou from '~/components/utilities/Thankyou.vue';

@Component({
  components: { Thankyou },
})
export default class Criteria extends Vue {
  domain: string = '';

  domainId: string | (string | null)[] = 'nodata';

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
