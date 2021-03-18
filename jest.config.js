module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  transform: {
    // ...
    // process `*.ts` files with `ts-jest`
    '^.+\\.tsx?$': 'ts-jest',
  },
};
