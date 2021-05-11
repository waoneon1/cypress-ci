<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div class="relative bg-white mx-auto max-w-md px-5 font-secondary">
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
        <h1 class="text-primary text-sm capitalize">{{ domain.criteria_name }}</h1>
        <div
          class="flex items-center justify-center rounded-full border-2 border-gray-400 h-5 w-5 cursor-pointer"
          @click="help = !help"
        >
          <span v-if="help" class="text-xs text-gray-400">x</span>
          <span v-else class="text-xs text-gray-400">?</span>
        </div>
      </div>
      <Thankyou
        subtitle="Deskripsi"
        image="domain.svg"
        :buttons="[
          {
            label: 'Mulai',
            url: '/qna/' + domain.slug,
            theme: 'border-secondary bg-secondary text-white'
          }
        ]"
      >
        <h1
          slot="title"
          class="text-sm text-white mb-10 px-5"
          v-html="domain.shortdec"
        ></h1>
      </Thankyou>

      <Help :title="domain.criteria_name" :show="help">
        <div
          slot="help-detail"
          class="text-white text-sm"
          v-html="domain.description"
        ></div>
      </Help>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { criteriaModule } from '@/store/criteria';
import Thankyou from '~/components/utilities/Thankyou.vue';
import Help from '~/components/utilities/Help.vue';

const _ = require('lodash');

export interface CriteriaResponseData {
  /* eslint-disable camelcase */
  id: string;
  criteria_name: string;
  percent_progress: number;
  slug: string;
  description: string;
  shortdec: string;
  /* eslint-enable camelcase */
}

@Component({
  components: { Thankyou, Help },
})
export default class Criteria extends Vue {
  domain: CriteriaResponseData = {
    id: '',
    criteria_name: 'Loading ...',
    shortdec: 'Loading ...',
    description: 'Loading ...',
    percent_progress: 0,
    slug: '',
  }

  help: boolean = false;

  goToQnaPage(): void {
    this.$router.push(`/qna/${this.domain.criteria_name.toLowerCase()}`);
  }

  async setSelectedCriteria() {
    // get query param
    const criteria = this.$route.params.domain;
    // get criteria endpoint
    await criteriaModule.getCriteria();
    const allCriteria = criteriaModule.dataCriteria.data;
    // set domain variable
    this.domain = _.find(allCriteria, { slug: criteria });
  }

  async init() {
    await this.setSelectedCriteria();
  }

  mounted() {
    this.init();
  }
}
</script>
