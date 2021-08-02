const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
      styles: path.resolve(__dirname, './resources/sass'),
    },
  },
};
