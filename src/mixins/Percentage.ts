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
  whitelistJson = localStorage.getItem('rrs_whitelist');

  blacklistJson = localStorage.getItem('rrs_blacklist');

  public calc(categories: CriteriaResponseData, employeeLength: number) {
    // count progress with filter
    const totalEmployeePercentage = categories.percent_progress;
    const blacklist = this.blacklistJson ? JSON.parse(this.blacklistJson).length : 0;
    const countEmployee = (employeeLength - 1); // 49

    // count whitelist from check & from organization
    const countWhitelist = countEmployee - (blacklist + 1);

    const totalWhitelistPair = countWhitelist * countWhitelist - countWhitelist;
    const totalEmployeePair = (countEmployee * countEmployee - countEmployee) - (countEmployee * 2 - 2);
    const percentageForUser = ((totalEmployeePercentage * totalEmployeePair) / totalWhitelistPair);

    return percentageForUser;
  }
}
export default Percentage;
