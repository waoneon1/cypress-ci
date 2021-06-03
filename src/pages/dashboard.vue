<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden font-mulish">
    <Alert
      :show="alert"
      title="Your Login Success"
      description="Welcome"
      theme="success"
      @close="alert = false"
    />
    <div
      class="relative bg-white mx-auto max-w-md min-h-screen px-5 font-secondary pb-28"
    >
      <!-- Heading -->
      <div class="flex justify-between items-center relative py-5 mb-5  ">
        <div class="relative">
          <p class="text-xs text-primary">Welcome,</p>
          <h1 class="text-primary font-medium text-xl">
            {{ username }}
          </h1>
        </div>
        <div class="rounded-full overflow-hidden h-7 w-7">
          <img class="" src="~/static/img/blank.jpeg" alt="profile" />
        </div>
      </div>

      <!-- Content: Criteria List -->
      <div class="relative">
        <p class="text-xs text-primary mb-3">Kompetensi</p>
        <div v-if="loading" class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2">
          <div v-for="(item, i) in 12" :key="i">
            <div class="animate-pulse rounded-xl bg-gray-200 w-full h-32 cursor-pointer relative">
            </div>
          </div>
        </div>
        <div v-else class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2">
          <div
            v-for="(item, i) in criteria"
            :key="i"
            class="mb-1 cursor-pointer"
            @click="item.percent_progress_filter <= 100 ? goToQnaPage(item) : null"
          >
            <div
              class="rounded-xl overflow-hidden cursor-pointer relative shadow-lg text-sm "
            >
              <div
                v-show="checkRecommandation(item)"
                class="absolute text-xs bg-yellow-300 text-white px-5 transform rotate-45"
                style="right: -25px; top: 25px;"
              >
                Rekomendasi
              </div>
              <div
                :class="
                  `bg-white text-primary justify-center px-3 py-3 ${
                    item.percent_progress_filter >= 100 ? '' : 'hover:bg-blue-100'
                  }`
                "
              >
                <div class="bg-gray-100 rounded-lg inline-block p-1">
                  <img src="~/static/img/svg/requirement.svg" alt="criteria" />
                </div>
                <small class="h-10 block flex items-center">{{
                  item.criteria_name
                }}</small>
                <div class="flex items-center justify-center mb-2">
                  <div class="relative pr-2 w-full">
                    <div
                      class="overflow-hidden h-2 text-xs flex rounded bg-gray-200"
                    >
                      <div
                        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                        :style="
                          `width:${roundedNumber(item.percent_progress_filter)}%`
                        "
                      ></div>
                    </div>
                  </div>
                  <span
                    v-if="item.percent_progress_filter <= 100"
                    class="text-xs inline-block text-primary"
                    >{{
                      item.percent_progress_filter === 0
                        ? 0
                        : roundedNumber(item.percent_progress_filter)
                    }}%</span
                  >
                  <div
                    v-else
                    class="bg-white rounded-full text-white flex items-center justify-center z-10"
                  >
                    <svg
                      class="fill-current text-success"
                      width="15"
                      height="15"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="fixed bottom-0 left-0 right-0">
        <!-- navigation circle -->
        <div
          class="mx-auto max-w-md bg-white rounded-b-xl shadow-lg w-full h-4 transform rotate-180"
        ></div>
        <div class="mx-auto max-w-md bg-white px-5 pb-5 rounded-t-xl shadow-lg">
          <ul class="flex justify-between px-10">
            <li class="cursor-pointer hover:text-secondary text-secondary">
              <nuxt-link to="/dashboard">
                <svg
                  class="fill-current"
                  width="24"
                  height="21"
                  viewBox="0 0 24 21"
                >
                  <path
                    d="M9.6 20.4V13.2H14.4V20.4H20.4V10.8H24L12 0L0 10.8H3.6V20.4H9.6Z"
                  />
                </svg>
              </nuxt-link>
            </li>
            <li class="cursor-pointer hover:text-secondary text-gray-400">
              <nuxt-link to="/faq">
                <svg
                  class="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 17H9V15H11V17ZM13.07 9.25L12.17 10.17C11.45 10.9 11 11.5 11 13H9V12.5C9 11.4 9.45 10.4 10.17 9.67L11.41 8.41C11.78 8.05 12 7.55 12 7C12 5.9 11.1 5 10 5C8.9 5 8 5.9 8 7H6C6 4.79 7.79 3 10 3C12.21 3 14 4.79 14 7C14 7.88 13.64 8.68 13.07 9.25Z"
                  />
                </svg>
              </nuxt-link>
            </li>
            <li class="cursor-pointer hover:text-secondary text-gray-400">
              <nuxt-link to="/profile">
                <svg
                  class="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM13.61 6.34C14.68 6.34 15.54 7.2 15.54 8.27C15.54 9.34 14.68 10.2 13.61 10.2C12.54 10.2 11.68 9.34 11.68 8.27C11.67 7.2 12.54 6.34 13.61 6.34ZM7.61 4.76C8.91 4.76 9.97 5.82 9.97 7.12C9.97 8.42 8.91 9.48 7.61 9.48C6.31 9.48 5.25 8.42 5.25 7.12C5.25 5.81 6.3 4.76 7.61 4.76ZM7.61 13.89V17.64C5.21 16.89 3.31 15.04 2.47 12.68C3.52 11.56 6.14 10.99 7.61 10.99C8.14 10.99 8.81 11.07 9.51 11.21C7.87 12.08 7.61 13.23 7.61 13.89ZM10 18C9.73 18 9.47 17.99 9.21 17.96V13.89C9.21 12.47 12.15 11.76 13.61 11.76C14.68 11.76 16.53 12.15 17.45 12.91C16.28 15.88 13.39 18 10 18Z"
                  />
                </svg>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { criteriaModule } from '@/store/criteria';
import { alertModule } from '@/store/alert';
import Alert from '~/components/utilities/Alert.vue';

const _ = require('lodash');

export interface CriteriaResponseData {
  /* eslint-disable camelcase */
  id?: string;
  criteria_name: string;
  percent_progress: number;
  percent_progress_filter?: number;
  /* eslint-enable camelcase */
}
export interface CriteriaResponse {
  /* eslint-disable-next-line camelcase */
  response_code: string;
  message: string;
  data: CriteriaResponseData[];
}
export interface SubmitResponseData {
  /* eslint-disable camelcase */
  count_submitted: number;
  percent_progress: number;
  /* eslint-enable camelcase */
}

export interface LoginData {
  /* eslint-disable camelcase */
  exp: number;
  user_business_unit: string;
  user_email: string;
  user_id: string;
  user_name: string;
  user_oauth_id: string;
  user_organization: string;
  user_organization_full_text: string;
  /* eslint-enable camelcase */
}

@Component({
  components: { Alert },
})
export default class Dashboard extends Vue {
  title: string = 'RRS Dashboard';

  alert: boolean = false;

  loading: boolean = true

  username: string = 'loading...'

  recommendation = {
    criteria_name: 'No Data',
    percent_progress: 0,
    id: '1',
    slug: 'nodata',
    shortdec: '',
  };

  // Criteria
  criteria: CriteriaResponseData[] = [];

  goToQnaPage(payload: CriteriaResponseData): void {
    this.$router.push(`/criteria/${payload.criteria_name.toLowerCase()}`);
  }

  setRecommendation() {
    const criteria = _.clone(this.criteria);
    return _.minBy(
      criteria,
      (object: SubmitResponseData) => object.percent_progress,
    );
  }

  roundedNumber = (val: number): number => _.round(val, 2);

  async loadCriteriaData(): Promise<void> {
    await criteriaModule.getCriteria().then(() => {
      this.loading = false;
      this.criteria = criteriaModule.dataCriteria.data;
      this.recommendation = this.setRecommendation();
    });
  }

  checkRecommandation(item: {id:''}) {
    if (this.recommendation?.id === item.id) {
      return true;
    }
    return false;
  }

  decodeDataEmployee() {
    const token: string | null = localStorage.getItem('token');
    let jsonPayload:LoginData = {
      exp: 1,
      user_business_unit: 'nodata',
      user_email: 'nodata',
      user_id: 'nodata',
      user_name: 'nodata',
      user_oauth_id: 'nodata',
      user_organization: 'nodata',
      user_organization_full_text: 'nodata',
    };

    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decode = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
      jsonPayload = JSON.parse(decode);
    }
    
    const usernameArray = _.split(jsonPayload.user_name, ' ', 2);
    const username = _.join(usernameArray, ' ');
    this.username = username;
  }

  mounted() {
    // call onboarding
    this.alert = alertModule.showAlert;
    this.loadCriteriaData();
    this.decodeDataEmployee();
  }
}
</script>
