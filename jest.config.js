
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-swiper|react-redux|react-native-linear-gradient|@react-navigation|@react-native|@react-native/assets|react-native-vector-icons|react-native-video)/)',
  ],
  moduleNameMapper: {
    '^react-native-video$': '<rootDir>/__mocks__/react-native-video.js',
    '\\.(mp4)$': '<rootDir>/__mocks__/fileMock.js'
  },


}