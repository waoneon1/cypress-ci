<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden font-mulish">
    <Alert
      v-show="alert"
      title="Your Login Success"
      description="Welcome"
      theme="success"
    />
    <div
      class="relative bg-white mx-auto max-w-md min-h-screen px-5 font-secondary pb-28"
    >
      <!-- Heading -->
      <div class="flex justify-between items-center relative py-5 mb-5  ">
        <div class="relative">
          <p class="text-xs text-primary">Welcome,</p>
          <h1 class="text-primary font-medium text-xl">
            John doe
          </h1>
        </div>
        <div class="rounded-full overflow-hidden h-7 w-7">
          <img class="" src="~/static/img/blank.jpeg" alt="profile" />
        </div>
      </div>

      <!-- Content: Criteria List -->
      <div class="relative">
        <p class="text-xs text-primary mb-3">Criteria</p>
        <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2">
          <div
            v-for="(item, i) in criteria"
            :key="i"
            class="mb-4 cursor-pointer"
            @click="goToQnaPage(item)"
          >
            <div class="rounded-xl overflow-hidden cursor-pointer relative shadow-lg text-sm ">
              <div class="bg-white text-primary justify-center px-3 py-3 hover:bg-primary hover:text-white">
                <div class="bg-gray-100 rounded-lg inline-block p-1">
                  <img src="~/static/img/svg/requirement.svg" alt="criteria"/>
                </div>
                <small class="h-10 block flex items-center">{{ item.criteria_name }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { criteriaModule } from '@/store/criteria';
import Alert from '~/components/utilities/Alert.vue';

export interface CriteriaResponseData {
  /* eslint-disable camelcase */
  criteria_name: string;
  id: string;
  /* eslint-enable camelcase */
}
export interface CriteriaResponse {
  /* eslint-disable-next-line camelcase */
  response_code: string;
  message: string;
  data: CriteriaResponseData[];
}

@Component({
  components: { Alert },
})
export default class Dashboard extends Vue {
  title: string = 'RRS Dashboard';

  message: string = 'Content here';

  alert: boolean = false;

  // Criteria
  criteria: CriteriaResponseData[] = []

  goToQnaPage(payload: CriteriaResponseData): void {
    // criteriaModule.setSelectedCriteria(payload);s
    localStorage.setItem('rss_criteria', JSON.stringify(payload));
    this.$router.push(`/qna/${payload.criteria_name.toLowerCase()}`);
  }

  init() {
    if (
      typeof this.$route !== 'undefined'
      && this.$route.query.success === '1'
    ) {
      this.alert = true;
    }
  }

  async loadCriteriaData(): Promise<void> {
    await criteriaModule.getCriteria();
    this.criteria = criteriaModule.dataCriteria.data;
  }

  mounted() {
    this.init();
    // load criteria data
    this.loadCriteriaData();
  }
}
</script>
