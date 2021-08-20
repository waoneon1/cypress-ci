import { Component, Vue } from 'vue-property-decorator';
import { CriteriaResponseData } from '~/store/criteria';

export interface SubmitResponseData {
  /* eslint-disable camelcase */
  count_submitted: number;
  percent_progress: number;
  /* eslint-enable camelcase */
}

@Component
class Percentage extends Vue {
  blacklist = 0

  public calc(categories: CriteriaResponseData, employeeLength: number) {
    this.blacklist = 0;
    const blacklistJson = localStorage.getItem('rrs_blacklist');
    if (blacklistJson !== null && typeof blacklistJson === 'string') {
      this.blacklist = blacklistJson ? JSON.parse(blacklistJson).length : 0;
    }
    // count progress with filter
    const totalEmployeePercentage = categories.percent_progress;
    const countEmployee = (employeeLength - 1); // 49

    // count whitelist from check & from organization
    const countWhitelist = countEmployee - (this.blacklist + 1);

    const totalWhitelistPair = countWhitelist * countWhitelist - countWhitelist;
    const totalEmployeePair = (countEmployee * countEmployee - countEmployee) - (countEmployee * 2 - 2);
    const percentageForUser = ((totalEmployeePercentage * totalEmployeePair) / totalWhitelistPair);

    return percentageForUser;
  }
}
export default Percentage;
