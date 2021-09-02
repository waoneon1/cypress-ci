export interface ComparisonResponseData {
  /* eslint-disable camelcase */
  score: number,
  employee_id: string,
  employee_name: string,
  employee_email: string,
  /* eslint-enable camelcase */
}
export interface ComparisonData {
  /* eslint-disable camelcase */
  criteria_id: string,
  criteria_name: string,
  criteria_slug: string,
  data: ComparisonResponseData[],
  /* eslint-enable camelcase */
}
