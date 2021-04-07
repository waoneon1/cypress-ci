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
          <nuxt-link
            v-for="(item, i) in criteria"
            :key="i"
            class="mb-4"
            :to="`qna/${item.criteria_name.toLowerCase()}?c=${item.id}`"
          >
            <div class="rounded-xl overflow-hidden cursor-pointer relative shadow-lg text-sm ">
              <div class="bg-white text-primary justify-center px-3 py-3 hover:bg-primary hover:text-white">
                <div class="bg-gray-100 rounded-lg inline-block p-1">
                  <img src="~/static/img/svg/requirement.svg" alt="criteria"/>
                </div>
                <small class="h-10 block flex items-center">{{ item.criteria_name }}</small>
              </div>
            </div>
          </nuxt-link>
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
  criteria_name?: string;
  id?: string;
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
    // this.criteria = [
    //   {
    //     criteria_name: 'Design',
    //     id: '6062d4c9dd3acd0959261f51',
    //   },
    //   {
    //     criteria_name: 'Requirements',
    //     id: '606d1d5cf50eab8cb59f434c',
    //   },
    //   {
    //     criteria_name: 'Construction',
    //     id: '606d1d68f50eab8cb59f434d',
    //   },
    //   {
    //     criteria_name: 'Testing',
    //     id: '606d1d6df50eab8cb59f434e',
    //   },
    //   {
    //     criteria_name: 'Sustainment',
    //     id: '606d1d73f50eab8cb59f434f',
    //   },
    //   {
    //     criteria_name: 'Process',
    //     id: '606d1d78f50eab8cb59f4350',
    //   },
    //   {
    //     criteria_name: 'Systems Engineering',
    //     id: '606d1d7ff50eab8cb59f4351',
    //   },
    //   {
    //     criteria_name: 'Quality',
    //     id: '606d1d89f50eab8cb59f4352',
    //   },
    //   {
    //     criteria_name: 'Security',
    //     id: '606d1d8ef50eab8cb59f4353',
    //   },
    //   {
    //     criteria_name: 'Config Management',
    //     id: '606d1d95f50eab8cb59f4354',
    //   },
    //   {
    //     criteria_name: 'Measurement',
    //     id: '606d1d9ff50eab8cb59f4355',
    //   },
    //   {
    //     criteria_name: 'HCI',
    //     id: '606d1da5f50eab8cb59f4356',
    //   },
    // ];
    // if (typeof this.employees === 'object')
    // this.employees.splice(1)
  }

  mounted() {
    this.init();
    // load criteria data
    this.loadCriteriaData();
  }
}
</script>
