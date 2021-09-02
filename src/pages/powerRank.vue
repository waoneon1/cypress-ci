<template>
  <div class="bg-gray-100 h-screen">
    <div class="relative bg-white mx-auto max-w-md font-secondary h-screen">
      <!-- Heading -->
      <div class="px-5">
        <div class="flex justify-between relative py-5">
          <div><!-- Added back button in here --></div>
          <h1 class="text-primary text-sm capitalize">Power Rank</h1>
          <div
            class="flex items-center justify-center rounded-full border-2 border-gray-400 h-5 w-5 cursor-pointer"
            @click="help = !help"
          >
            <span v-if="help" class="text-xs text-gray-400">x</span>
            <span v-else class="text-xs text-gray-400">?</span>
          </div>
        </div>
      </div>
      <div class="h-1 w-full border-b"></div>

      <!-- Content: Criteria List -->
      <div class="relative">
        <div>
          <div class="px-3 md:px-6 pt-5 pb-20">
            <div class="" v-if="loading === true">
              loading . . .
            </div>
            <ul class="" v-else>
              <li v-for="(item, i) in criteria" :key="i">
                <div v-if="loadingCrit[item.slug]" class="py-2 border border-gray-100 mb-2 rounded px-4 py-2">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div v-else-if="rankFormula[userPowerRanking[item.slug]] === 0"></div>
                <div v-else class="flex w-full items-center justify-between border border-gray-100 mb-2 rounded px-4 py-3">
                  <div class="text-gray-800 text-sm flex flex-col">
                    <div>{{ item.criteria_name }}</div>
                    <div v-if="rankFormula[userPowerRanking[item.slug]] !== -1" class="text-xs text-gray-300">
                      Top {{ rankFormula[userPowerRanking[item.slug]] }}%
                    </div>
                  </div>
                  <div class="flex">
                    <span v-for="i in 6" :key="i" class="mx-1">
                      <img v-if="userPowerRanking[item.slug] >= i" src="~static/img/svg/medal1.svg" alt="medal active">
                      <img v-else src="~static/img/svg/medal2.svg" alt="medal disabled">
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="fixed bottom-0 left-0 right-0 z-10">
        <!-- navigation circle -->
        <div
          class="mx-auto max-w-md bg-white bg-white shadow-lg w-full h-4 transform rotate-180"
        ></div>
        <div class="mx-auto max-w-md bg-white px-5 pb-5 bg-white">
          <ul class="flex justify-between px-10">
            <li class="cursor-pointer hover:text-secondary text-gray-400">
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
            <li class="cursor-pointer hover:text-secondary text-secondary">
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
            </li>
          </ul>
        </div>
      </div>

      <div
        class="absolute top-0 left-0 w-full flex bg-primary py-4 bg-opacity-90"
        style="margin-top:60px; height: calc(100vh - 60px);"
        v-show="help"
      >
        <div class="flex flex-col text-left px-5 w-full overflow-auto">
          <div class="text-white font-base text-sm">
              <h2 class="text-white mb-5 font-bold">Keterangan</h2>
              <ol>
                <li class="mb-4">
                  Kamu ada pada posisi top <span class="text-secondary">10%</span> di domain tersebut
                  <div class="flex mb-2 bg-white rounded-lg p-2">
                    <img v-for="i in 6" :key="i" class="mx-1" src="~static/img/svg/medal1.svg" alt="medal active">
                  </div>
                </li>
                <li class="mb-4">
                  Kamu ada pada posisi top <span class="text-secondary">15%</span> di domain tersebut
                  <div class="flex mb-2 bg-white rounded-lg p-2">
                    <img v-for="i in 5" :key="i" class="mx-1" src="~static/img/svg/medal1.svg" alt="medal active">
                  </div>
                </li>
                <li class="mb-4">
                  Kamu ada pada posisi top <span class="text-secondary">30%</span> di domain tersebut
                  <div class="flex mb-2 bg-white rounded-lg p-2">
                    <img v-for="i in 4" :key="i" class="mx-1" src="~static/img/svg/medal1.svg" alt="medal active">
                  </div>
                </li>
                <li class="mb-4">
                  Kamu ada pada posisi top <span class="text-secondary">50%</span> di domain tersebut
                  <div class="flex mb-2 bg-white rounded-lg p-2">
                    <img v-for="i in 3" :key="i" class="mx-1" src="~static/img/svg/medal1.svg" alt="medal active">
                  </div>
                </li>
                <li class="mb-4">
                  Kamu ada pada posisi top <span class="text-secondary">70%</span> di domain tersebut
                  <div class="flex mb-2 bg-white rounded-lg p-2">
                    <img v-for="i in 2" :key="i" class="mx-1" src="~static/img/svg/medal1.svg" alt="medal active">
                  </div>
                </li>
                <li>Untuk list domains yg belum muncul, artinya belum ada alterran yg menilai kamu di domain tersebut</li>
              </ol>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import jwtDecode from 'jwt-decode';
import { criteriaModule, CriteriaResponseData } from '@/store/criteria';
import { comparisonModule } from '@/store/comparison';
import Help from '~/components/utilities/Help.vue';
import { LoginData } from '~/types/LoginData';
import { ComparisonResponseData } from '~/types/ComparisonData';

const _ = require('lodash');

@Component({
  components: { Help },
})
export default class PowerRank extends Vue {
  token: string | null = localStorage.getItem('token');

  criteria: CriteriaResponseData[] = [];

  comparison: ComparisonResponseData[] = [];

  loading: boolean = true;

  user: string = ''

  loadingCrit = {
    requirements: true,
    design: true,
    construction: true,
    sustainment: true,
    process: true,
    quality: true,
    measurement: true,
    'systems engineering': true,
    security: true,
  }

  userPowerRanking = {
    requirements: 0,
    design: 0,
    construction: 0,
    sustainment: 0,
    process: 0,
    quality: 0,
    measurement: 0,
    'systems engineering': 0,
    security: 0,
  }

  rankFormula:number[] = [0, -1, 70, 50, 30, 15, 10];

  help: boolean = false;

  /* LOAD store */
  /* Result: currentEmployee, criteria comparison */
  loadCurrentEmployee() {
    const jsonPayload: LoginData = {
      exp: 1,
      user_business_unit: 'nodata',
      user_email: 'nodata',
      user_id: 'nodata',
      user_name: 'nodata',
      user_oauth_id: 'nodata',
      user_organization: 'nodata',
      user_organization_full_text: 'nodata',
    };
    const currentEmployee: LoginData = this.token ? jwtDecode(this.token) : jsonPayload;
    this.user = currentEmployee.user_email;
  }

  async loadCriteriaData(): Promise<void> {
    await criteriaModule.getCriteria().then(() => {
      const allCriteria = criteriaModule.dataCriteria.data;
      this.criteria = _.filter(allCriteria, (o: any) => _.includes(
        [
          'Requirements',
          'Design',
          'Construction',
          'Sustainment',
          'Process',
          'Quality',
          'Measurement',
          'Systems Engineering',
          'Security',
        ],
        o.criteria_name,
      ));
    });
  }

  async loadComparionData(payload: CriteriaResponseData) {
    await comparisonModule.getComparison(payload.id).then(() => {
      if (payload.slug) {
        this.comparison = comparisonModule.dataComparison.data;
        this.loadingCrit[payload.slug] = false;
        this.userPowerRanking[payload.slug] = this.comparisonProcess();
      }
    });
  }
  /* END LOAD store */

  /* Comparasion Function */
  /* Result: rank point */
  getRanker(neutralRanker) {
    const rankerEmail = this.user;

    // Remove neutral ranker
    const rankOnly = _.reject(this.comparison, (o) => o.score === parseFloat(neutralRanker.score));

    // Rank Formula
    const total = rankOnly.length;
    const point = {
      6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0,
    };
    point[6] = _.round(total * (10 / 100)) - 1;
    point[5] = _.round(total * (15 / 100)) - 1;
    point[4] = _.round(total * (30 / 100)) - 1;
    point[3] = _.round(total * (50 / 100)) - 1;
    point[2] = _.round(total * (70 / 100)) - 1;

    // Index of user
    const emailOnly = _.map(rankOnly, 'employee_email');
    const indexOfUser = _.indexOf(emailOnly, rankerEmail);

    // user Point
    let userPoint = 0;
    if (indexOfUser !== -1) {
      if (indexOfUser <= point[6]) {
        userPoint = 6;
      } else if (indexOfUser <= point[5]) {
        userPoint = 5;
      } else if (indexOfUser <= point[4]) {
        userPoint = 4;
      } else if (indexOfUser <= point[3]) {
        userPoint = 3;
      } else if (indexOfUser <= point[2]) {
        userPoint = 2;
      } else {
        userPoint = 1;
      }
    }

    return userPoint;
  }

  comparisonProcess(): number {
    const score = _.uniq(_.map(this.comparison, 'score'));
    if (score.length <= 1) return 0;

    // neutral Ranker
    const unique = _.reduce(this.comparison, (acc, o) => {
      acc[o.score] = (acc[o.score] || 0) + 1;
      return acc;
    }, {});

    const mapArray = _.map(unique, (val) => val);
    const max = _.max(mapArray);
    let maxScore = {};
    _.map(unique, (val, key) => {
      if (val === max) {
        maxScore = {
          score: key,
          count: val,
        };
      }
    });
    const neutralRanker = maxScore;

    return this.getRanker(neutralRanker);
  }
  /* End Comparasion Function */

  /* Initial */
  /* Result: load employe, criteria comparison */
  async init() {
    await Promise.all(
      _.forEach(this.criteria, (criteriaObject: CriteriaResponseData) => {
        this.loadComparionData(criteriaObject);
      }),
    );
  }

  mounted() {
    Promise.all([
      this.loadCurrentEmployee(),
      this.loadCriteriaData(),
    ]).then(() => {
      this.loading = false;
      this.init();
    });
  }
  /* End Initial */
}
</script>
