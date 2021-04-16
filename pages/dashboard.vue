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
            @click="criteriaProgress( item.id ).progress !== 100 ? goToQnaPage(item) : null"
          >
            <div class="rounded-xl overflow-hidden cursor-pointer relative shadow-lg text-sm ">
              <div v-show="criteriaProgress(item.id).rebbon" class="absolute text-xs bg-yellow-300 text-white px-5 transform rotate-45" style="right: -25px; top: 25px;">
                Rekomendasi
              </div>
              <div class="bg-white text-primary justify-center px-3 py-3 hover:bg-blue-100">
                <div class="bg-gray-100 rounded-lg inline-block p-1">
                  <img src="~/static/img/svg/requirement.svg" alt="criteria"/>
                </div>
                <small class="h-10 block flex items-center">{{ item.criteria_name }}</small>
                <div class="flex items-center justify-center mb-2">
                  <div class="relative pr-2 w-full">
                    <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                        :style="`width:${ criteriaProgress( item.id ).progress }%`"
                      ></div>
                    </div>
                  </div>
                  <span v-if="criteriaProgress(item.id).progress !== 100" class="text-xs inline-block text-primary">{{ criteriaProgress(item.id).progress }}%</span>
                  <div v-else class="bg-white rounded-full text-white flex items-center justify-center z-10">
                    <svg class="fill-current text-success" width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"/>
                    </svg>
                  </div>

                </div>
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
    localStorage.setItem('rss_criteria', JSON.stringify(payload));
    this.$router.push(`/criteria/${payload.criteria_name.toLowerCase()}`);
  }

  init() {
    if (
      typeof this.$route !== 'undefined'
      && this.$route.query.success === '1'
    ) {
      this.alert = true;
    }
  }

  criteriaProgress = (id: string) => {
    const criteria = criteriaModule.dataCriteriaProgress;
    return criteria.filter(
      (arr) => arr.id === id,
    )[0];
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
