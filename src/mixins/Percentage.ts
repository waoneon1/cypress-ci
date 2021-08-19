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
    const countEmployee = (employeeLength - 1);

    // count whitelist from check & from organization
    const countWhitelist = countEmployee - blacklist;

    const totalWhitelistPair = countWhitelist * countWhitelist - countWhitelist;
    const totalEmployeePair = (countEmployee * countEmployee - countEmployee) - (countEmployee * 2 - 2);
    const percentageForUser = ((totalEmployeePercentage * totalEmployeePair) / totalWhitelistPair);

    // console.log(employeeLength, categories.criteria_name, 'category');
    // console.log('countWhitelist : ', countWhitelist);
    // console.log('totalEmployeePercentage : ', totalEmployeePercentage);
    // console.log('totalEmployeePair : ', totalEmployeePair);
    // console.log('totalWhitelistPair : ', totalWhitelistPair);
    // console.log('(totalEmployeePercentage * totalEmployeePair) / totalWhitelistPair) : ', percentageForUser);

    return percentageForUser;
  }
}
export default Percentage;
