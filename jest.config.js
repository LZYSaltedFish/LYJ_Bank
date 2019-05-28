module.exports = {
  'bail': true,
  'moduleFileExtensions': [
    'js'
  ],
  testEnvironment: 'node',
  'testRegex': '(/*\\.(test|spec))\\.jsx?$',
  'coverageDirectory': 'coverage',
  'testPathIgnorePatterns': [
    '<rootDir>/node_modules/'
  ],
  'cacheDirectory': '.jest/cache'
}
