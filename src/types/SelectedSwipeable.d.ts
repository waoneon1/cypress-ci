export interface AnswersObject {
  /* eslint-disable camelcase */
  employee_name: string;
  employee_email: string;
  employee_image_url: string;
  employee_organization: string;
  employee_organization_full_text: string;
  employee_business_unit: string;
  /* eslint-enable camelcase */
}

export interface SelectedSwipeable {
  employee: string[],
  blacklist: string[],
  whitelist: string[],
  employeeObject: AnswersObject[],
}
