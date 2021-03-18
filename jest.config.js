module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  // transform: {
  //   // ...
  //   // process `*.ts` files with `ts-jest`
  //   // "^.+\\.tsx?$": "ts-jest",
  //   //   '.*\\.(vue)$': 'vue-jest'
  // },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
};
