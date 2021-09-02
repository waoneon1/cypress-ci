<template>
  <div class="bg-gray-100 h-screen">
    <div class="relative bg-white mx-auto max-w-md font-secondary h-screen">
      <!-- Heading -->
      <div class="px-5">
        <div class="flex justify-center relative py-5">
          <h1 class="text-primary text-sm capitalize">Power Rank</h1>
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
              <!-- this.criteria -->
              <li v-for="(item, i) in criteria" :key="i" class="border mb-2 rounded px-4">
                <div v-if="loadingCrit[item.slug]" class="py-2">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div v-else class="flex w-full h-10 items-center">
                  <div class="w-3/6">{{ item.criteria_name }} </div>
                  <div class="w-3/6 flex">
                    <span class="mr-3"> : </span>
                    <span v-for="i in 6" :key="i">
                      <svg v-if="userPowerRanking[item.slug] >= i" class="w-5 h-5 fill-current text-secondary" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m50.007812 329.191406-48.421874 96.828125c-2.328126 4.652344-2.078126 10.179688.652343 14.601563 2.738281 4.417968 7.558594 7.109375 12.757813 7.109375h72.839844l43.703124 58.269531c2.839844 3.800781 7.296876 6 11.988282 6 6.230468 0 11.140625-3.71875 13.421875-8.289062l45.628906-91.261719c-61.691406-5.898438-116.082031-37.179688-152.570313-83.257813zm0 0"/><path d="m446.148438 426.019531-48.421876-96.828125c-36.488281 46.078125-90.878906 77.359375-152.570312 83.257813l45.632812 91.261719c2.277344 4.570312 7.1875 8.289062 13.417969 8.289062 4.691407 0 9.152344-2.199219 11.992188-6l43.699219-58.269531h72.839843c5.199219 0 10.019531-2.691407 12.757813-7.109375 2.730468-4.421875 2.980468-9.949219.652344-14.601563zm0 0"/><path d="m248.972656 147.644531-25.105468-40.105469-25.097657 40.105469c-2.058593 3.289063-5.3125 5.652344-9.074219 6.59375l-45.894531 11.480469 30.382813 36.265625c2.492187 2.972656 3.734375 6.796875 3.464844 10.667969l-3.269532 47.195312 43.878906-17.6875c2.085938-.839844 6.351563-1.960937 11.214844 0l43.882813 17.6875-3.265625-47.195312c-.265625-3.871094.976562-7.695313 3.46875-10.667969l30.382812-36.265625-45.894531-11.480469c-3.761719-.941406-7.015625-3.304687-9.074219-6.59375zm0 0"/><path d="m415.601562 191.734375c0-105.722656-86.011718-191.734375-191.734374-191.734375-105.722657 0-191.734376 86.011719-191.734376 191.734375 0 105.71875 86.011719 191.734375 191.734376 191.734375 105.722656 0 191.734374-86.011719 191.734374-191.734375zm-73.273437-25.121094-41.890625 50 4.5 65.070313c.355469 5.15625-1.964844 10.132812-6.144531 13.171875-4.183594 3.035156-9.632813 3.707031-14.425781 1.777343l-60.5-24.386718-60.5 24.386718c-1.621094.652344-8.078126 2.832032-14.425782-1.777343-4.179687-3.039063-6.5-8.015625-6.144531-13.171875l4.507813-65.070313-41.890626-49.996093c-3.320312-3.964844-4.367187-9.355469-2.769531-14.269532 1.597657-4.914062 5.613281-8.664062 10.628907-9.917968l63.273437-15.828126 34.605469-55.292968c2.742187-4.378906 7.546875-7.039063 12.714844-7.039063 5.167968 0 9.972656 2.660157 12.714843 7.039063l34.613281 55.292968 63.273438 15.828126c5.015625 1.253906 9.03125 5.003906 10.628906 9.917968 1.597656 4.914063.550782 10.304688-2.769531 14.265625zm0 0"/></svg>
                      <svg v-else class="w-5 h-5 fill-current text-gray-100" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m50.007812 329.191406-48.421874 96.828125c-2.328126 4.652344-2.078126 10.179688.652343 14.601563 2.738281 4.417968 7.558594 7.109375 12.757813 7.109375h72.839844l43.703124 58.269531c2.839844 3.800781 7.296876 6 11.988282 6 6.230468 0 11.140625-3.71875 13.421875-8.289062l45.628906-91.261719c-61.691406-5.898438-116.082031-37.179688-152.570313-83.257813zm0 0"/><path d="m446.148438 426.019531-48.421876-96.828125c-36.488281 46.078125-90.878906 77.359375-152.570312 83.257813l45.632812 91.261719c2.277344 4.570312 7.1875 8.289062 13.417969 8.289062 4.691407 0 9.152344-2.199219 11.992188-6l43.699219-58.269531h72.839843c5.199219 0 10.019531-2.691407 12.757813-7.109375 2.730468-4.421875 2.980468-9.949219.652344-14.601563zm0 0"/><path d="m248.972656 147.644531-25.105468-40.105469-25.097657 40.105469c-2.058593 3.289063-5.3125 5.652344-9.074219 6.59375l-45.894531 11.480469 30.382813 36.265625c2.492187 2.972656 3.734375 6.796875 3.464844 10.667969l-3.269532 47.195312 43.878906-17.6875c2.085938-.839844 6.351563-1.960937 11.214844 0l43.882813 17.6875-3.265625-47.195312c-.265625-3.871094.976562-7.695313 3.46875-10.667969l30.382812-36.265625-45.894531-11.480469c-3.761719-.941406-7.015625-3.304687-9.074219-6.59375zm0 0"/><path d="m415.601562 191.734375c0-105.722656-86.011718-191.734375-191.734374-191.734375-105.722657 0-191.734376 86.011719-191.734376 191.734375 0 105.71875 86.011719 191.734375 191.734376 191.734375 105.722656 0 191.734374-86.011719 191.734374-191.734375zm-73.273437-25.121094-41.890625 50 4.5 65.070313c.355469 5.15625-1.964844 10.132812-6.144531 13.171875-4.183594 3.035156-9.632813 3.707031-14.425781 1.777343l-60.5-24.386718-60.5 24.386718c-1.621094.652344-8.078126 2.832032-14.425782-1.777343-4.179687-3.039063-6.5-8.015625-6.144531-13.171875l4.507813-65.070313-41.890626-49.996093c-3.320312-3.964844-4.367187-9.355469-2.769531-14.269532 1.597657-4.914062 5.613281-8.664062 10.628907-9.917968l63.273437-15.828126 34.605469-55.292968c2.742187-4.378906 7.546875-7.039063 12.714844-7.039063 5.167968 0 9.972656 2.660157 12.714843 7.039063l34.613281 55.292968 63.273438 15.828126c5.015625 1.253906 9.03125 5.003906 10.628906 9.917968 1.597656 4.914063.550782 10.304688-2.769531 14.265625zm0 0"/></svg>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import jwtDecode from 'jwt-decode';
import { criteriaModule, CriteriaResponseData } from '@/store/criteria';
import { comparisonModule } from '@/store/comparison';
import { LoginData } from '~/types/LoginData';
import { ComparisonResponseData } from '~/types/ComparisonData';

const _ = require('lodash');

@Component
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
