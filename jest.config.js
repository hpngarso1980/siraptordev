module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/resources/js/$1',
  },
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(lodash-es)).+\\.js$',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
